"use client";

import { Button } from "@/components/ui/button";
import type { Filter } from "@/lib/todo";

type Props = {
  value: Filter;
  onChange: (next: Filter) => void;
};

export function TodoFilter({ value: _value, onChange }: Props) {
  return (
    <div className="flex gap-2">
      <Button type="button" size="sm" onClick={() => onChange("all")}>
        전체
      </Button>
    </div>
  );
}
