import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination() {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-[#E5E5E5] bg-white p-4">
      <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">
        <ChevronLeft size={18} />
        Previous
      </button>

      <span className="text-sm font-medium text-slate-500">
        Page <span className="font-semibold text-slate-900">1</span> of 5
      </span>

      <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50">
        Next
        <ChevronRight size={18} />
      </button>
    </div>
  );
}