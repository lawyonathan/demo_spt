"use client";

import { useState, useCallback } from "react";
import { usePlaidLink } from "react-plaid-link";
import { Button } from "@/components/ui/button";
import { Landmark, Loader2 } from "lucide-react";

interface PlaidLinkButtonProps {
  onSuccess: () => void;
}

export function PlaidLinkButton({ onSuccess }: PlaidLinkButtonProps) {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onPlaidSuccess = useCallback(
    async (publicToken: string, metadata: { institution?: { institution_id?: string; name?: string } | null }) => {
      setLoading(true);
      try {
        const res = await fetch("/api/plaid/exchange-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            public_token: publicToken,
            institution_id: metadata.institution?.institution_id,
            institution_name: metadata.institution?.name,
          }),
        });
        if (res.ok) {
          // Trigger initial sync
          await fetch("/api/plaid/sync", { method: "POST" });
          onSuccess();
        }
      } finally {
        setLoading(false);
      }
    },
    [onSuccess]
  );

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: onPlaidSuccess,
  });

  async function handleClick() {
    if (linkToken) {
      open();
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/plaid/create-link-token", {
        method: "POST",
      });
      if (res.ok) {
        const data = await res.json();
        setLinkToken(data.link_token);
        // PlaidLink will auto-open when ready after token is set
      }
    } finally {
      setLoading(false);
    }
  }

  // When we have a token and Plaid is ready, auto-open
  if (linkToken && ready && !loading) {
    open();
  }

  return (
    <Button
      onClick={handleClick}
      disabled={loading}
      className="h-11"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      ) : (
        <Landmark className="h-4 w-4 mr-2" />
      )}
      {loading ? "Connecting..." : "Link Bank Account"}
    </Button>
  );
}
