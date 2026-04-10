import { NextRequest } from "next/server";
import { v4 as uuid } from "uuid";
import { getPlaid } from "@/lib/plaid";
import { decrypt } from "@/lib/crypto";
import { db } from "@/lib/db";
import { requireAuthFromRequest } from "@/lib/auth";
import type { Transaction as PlaidTransaction } from "plaid";

interface AccountRow {
  id: string;
  plaid_item_id: string;
  plaid_access_token: string;
  plaid_cursor: string | null;
}

export async function POST(request: NextRequest) {
  const authError = requireAuthFromRequest(request);
  if (authError) return authError;

  const accounts = db
    .prepare("SELECT * FROM accounts")
    .all() as AccountRow[];

  if (accounts.length === 0) {
    return Response.json({ message: "No accounts to sync", synced: 0 });
  }

  const plaid = getPlaid();
  let totalAdded = 0;
  let totalModified = 0;
  let totalRemoved = 0;

  for (const account of accounts) {
    try {
      const accessToken = decrypt(account.plaid_access_token);
      let cursor = account.plaid_cursor || undefined;
      let hasMore = true;

      while (hasMore) {
        const response = await plaid.transactionsSync({
          access_token: accessToken,
          cursor,
        });

        const { added, modified, removed, next_cursor, has_more } =
          response.data;

        // Insert new transactions
        const insertStmt = db.prepare(
          `INSERT OR IGNORE INTO transactions
           (id, account_id, plaid_transaction_id, name, amount, date, category, pending)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
        );

        for (const txn of added) {
          insertStmt.run(
            uuid(),
            account.id,
            txn.transaction_id,
            txn.merchant_name || txn.name,
            txn.amount,
            txn.date,
            txn.personal_finance_category?.primary || txn.category?.[0] || null,
            txn.pending ? 1 : 0
          );
          totalAdded++;
        }

        // Update modified transactions
        const updateStmt = db.prepare(
          `UPDATE transactions SET
           name = ?, amount = ?, date = ?, category = ?, pending = ?
           WHERE plaid_transaction_id = ?`
        );

        for (const txn of modified) {
          updateStmt.run(
            txn.merchant_name || txn.name,
            txn.amount,
            txn.date,
            txn.personal_finance_category?.primary || txn.category?.[0] || null,
            txn.pending ? 1 : 0,
            txn.transaction_id
          );
          totalModified++;
        }

        // Remove deleted transactions
        const deleteStmt = db.prepare(
          "DELETE FROM transactions WHERE plaid_transaction_id = ?"
        );

        for (const txn of removed) {
          deleteStmt.run(txn.transaction_id);
          totalRemoved++;
        }

        // Update cursor
        cursor = next_cursor;
        hasMore = has_more;
      }

      // Persist cursor for next sync
      db.prepare("UPDATE accounts SET plaid_cursor = ? WHERE id = ?").run(
        cursor,
        account.id
      );
    } catch (error: unknown) {
      console.error(`Sync error for account ${account.id}:`, error);
    }
  }

  // Auto-categorize new uncategorized transactions
  autoCategorize();

  return Response.json({
    message: "Sync complete",
    added: totalAdded,
    modified: totalModified,
    removed: totalRemoved,
  });
}

function autoCategorize() {
  const rules = db
    .prepare("SELECT bucket_id, keyword FROM bucket_rules")
    .all() as Array<{ bucket_id: string; keyword: string }>;

  const updateStmt = db.prepare(
    `UPDATE transactions
     SET bucket_id = ?
     WHERE bucket_id IS NULL
     AND bucket_override = 0
     AND LOWER(name) LIKE ?`
  );

  for (const rule of rules) {
    updateStmt.run(rule.bucket_id, `%${rule.keyword.toLowerCase()}%`);
  }
}
