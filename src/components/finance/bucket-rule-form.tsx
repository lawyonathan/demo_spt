"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface BucketRuleFormProps {
  bucketId: string;
  onAdd: (keyword: string) => Promise<void>;
}

export function BucketRuleForm({ bucketId, onAdd }: BucketRuleFormProps) {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!keyword.trim()) return;
    setLoading(true);
    try {
      await onAdd(keyword.trim());
      setKeyword("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        placeholder="Add keyword rule (e.g., KROGER)"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="h-10 flex-1"
      />
      <Button
        type="submit"
        size="sm"
        className="h-10 px-3"
        disabled={loading || !keyword.trim()}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </form>
  );
}
