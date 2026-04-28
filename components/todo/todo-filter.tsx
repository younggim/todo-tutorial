"use client";

import { Button } from "@/components/ui/button";
import type { Filter } from "@/lib/todo";

type Props = {
  value: Filter;
  onChange: (next: Filter) => void;
};

const OPTIONS: { value: Filter; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "active", label: "진행중" },
  { value: "completed", label: "완료" },
];

export function TodoFilter({ value: _value, onChange }: Props) {
  return (
    <div className="flex gap-2">
      {OPTIONS.map((opt) => (
        <Button
          key={opt.value}
          type="button"
          size="sm"
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </Button>
      ))}
    </div>
  );
}
