import { ChevronDown } from "lucide-react";

export default function FilterBar() {
  return (
    <div className="space-y-3 rounded-2xl bg-white p-4">
      <div className="flex gap-2">
        <button className="rounded-full bg-blue-500 px-4 py-2 text-white">
          All
        </button>

        <button className="rounded-full bg-slate-100 px-4 py-2">
          Income
        </button>

        <button className="rounded-full bg-slate-100 px-4 py-2">
          Expense
        </button>
      </div>

      <div className="flex gap-3">
        <button className="flex flex-1 items-center justify-between rounded-xl border border-[#E5E5E5] px-4 py-3">
          Category
          <ChevronDown size={18} />
        </button>

        <button className="flex flex-1 items-center justify-between rounded-xl border border-[#E5E5E5] px-4 py-3">
          Sort
          <ChevronDown size={18} />
        </button>
      </div>
    </div>
  );
}