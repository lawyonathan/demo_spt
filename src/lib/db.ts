import Database from "better-sqlite3";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "finance.db");

let _db: Database.Database | null = null;

function getDb(): Database.Database {
  if (!_db) {
    _db = new Database(DB_PATH);
    _db.pragma("journal_mode = WAL");
    _db.pragma("foreign_keys = ON");
    initTables(_db);
  }
  return _db;
}

function initTables(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS accounts (
      id TEXT PRIMARY KEY,
      plaid_item_id TEXT UNIQUE NOT NULL,
      plaid_access_token TEXT NOT NULL,
      plaid_institution_id TEXT,
      institution_name TEXT,
      plaid_cursor TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS buckets (
      id TEXT PRIMARY KEY,
      name TEXT UNIQUE NOT NULL,
      color TEXT NOT NULL DEFAULT '#3b82f6',
      icon TEXT DEFAULT 'tag',
      sort_order INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS transactions (
      id TEXT PRIMARY KEY,
      account_id TEXT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
      plaid_transaction_id TEXT UNIQUE,
      name TEXT NOT NULL,
      amount REAL NOT NULL,
      date TEXT NOT NULL,
      category TEXT,
      bucket_id TEXT REFERENCES buckets(id) ON DELETE SET NULL,
      bucket_override INTEGER DEFAULT 0,
      pending INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS bucket_rules (
      id TEXT PRIMARY KEY,
      bucket_id TEXT NOT NULL REFERENCES buckets(id) ON DELETE CASCADE,
      keyword TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      UNIQUE(bucket_id, keyword)
    );

    CREATE TABLE IF NOT EXISTS monthly_budgets (
      id TEXT PRIMARY KEY,
      bucket_id TEXT NOT NULL REFERENCES buckets(id) ON DELETE CASCADE,
      month TEXT NOT NULL,
      budget_amount REAL NOT NULL,
      UNIQUE(bucket_id, month)
    );

    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      expires_at TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(date);
    CREATE INDEX IF NOT EXISTS idx_transactions_bucket ON transactions(bucket_id);
    CREATE INDEX IF NOT EXISTS idx_transactions_account ON transactions(account_id);
    CREATE INDEX IF NOT EXISTS idx_monthly_budgets_month ON monthly_budgets(month);
  `);
}

export const db = getDb();
