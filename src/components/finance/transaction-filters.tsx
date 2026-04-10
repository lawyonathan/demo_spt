"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MonthlySelector } from "@/components/finance/monthly-selector";
import { Search } from "lucide-react";

interface Bucket {
  id: string;
  name: string;
  color: string;
}

interface TransactionFiltersProps {
  month: string;
  onMonthChange: (month: string) => void;
  bucketId: string;
  onBucketChange: (bucketId: string) => void;
  search: string;
  onSearchChange: (search: string) => void;
  buckets: Bucket[];
}

export function TransactionFilters({
  month,
  onMonthChange,
  bucketId,
  onBucketChange,
  search,
  onSearchChange,
  buckets,
}: TransactionFiltersProps) {
  return (
    <div className="space-y-3">
      <div className="flex justify-center">
        <MonthlySelector month={month} onChange={onMonthChange} />
      </div>
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-10 pl-9"
          />
        </div>
        <Select value={bucketId} onValueChange={onBucketChange}>
          <SelectTrigger className="w-[180px] h-10">
            <SelectValue placeholder="All buckets" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Buckets</SelectItem>
            <SelectItem value="uncategorized">Uncategorized</SelectItem>
            {buckets.map((b) => (
              <SelectItem key={b.id} value={b.id}>
                <div className="flex items-center gap-2">
                  <div
                    className="h-2.5 w-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: b.color }}
                  />
                  {b.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
