import { ChevronDown } from "lucide-react";

export type BudgetStatus =
  | "all"
  | "within"
  | "near-limit"
  | "over-budget";

export type BudgetSort =
  | "highest-usage"
  | "lowest-usage"
  | "highest-budget"
  | "lowest-budget"
  | "a-z";

type BudgetFilterBarProps = {
  status: BudgetStatus;
  sort: BudgetSort;

  onStatusChange: (status: BudgetStatus) => void;
  onSortChange: (sort: BudgetSort) => void;
};

export default function BudgetFilterBar({
  status,
  sort,
  onStatusChange,
  onSortChange,
}: BudgetFilterBarProps) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">

      {/* Status */}
      <div className="relative shrink-0">
        <select
          value={status}
          onChange={(e) =>
            onStatusChange(e.target.value as BudgetStatus)
          }
          className="appearance-none rounded-full border border-slate-200 bg-white py-2.5 pl-4 pr-10 text-sm font-medium text-slate-700 shadow-sm outline-none transition-colors hover:bg-slate-50"
        >
          <option value="all">All</option>
          <option value="within">Within Budget</option>
          <option value="near-limit">Near Limit</option>
          <option value="over-budget">Over Budget</option>
        </select>

        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
      </div>

      {/* Sort */}
      <div className="relative shrink-0">
        <select
          value={sort}
          onChange={(e) =>
            onSortChange(e.target.value as BudgetSort)
          }
          className="appearance-none rounded-full border border-slate-200 bg-white py-2.5 pl-4 pr-10 text-sm font-medium text-slate-700 shadow-sm outline-none transition-colors hover:bg-slate-50"
        >
          <option value="highest-usage">Highest Usage</option>
          <option value="lowest-usage">Lowest Usage</option>
          <option value="highest-budget">Highest Budget</option>
          <option value="lowest-budget">Lowest Budget</option>
          <option value="a-z">A - Z</option>
        </select>

        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
      </div>
    </div>
  );
}