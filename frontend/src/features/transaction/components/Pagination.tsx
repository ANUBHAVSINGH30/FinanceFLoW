import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  currentPage?: number;
  totalPages?: number;
  onPrevious?: () => void;
  onNext?: () => void;
};

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPrevious,
  onNext,
}: PaginationProps) {
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-2 py-2 shadow-sm">
      <button
        onClick={onPrevious}
        disabled={isFirst}
        className="flex items-center gap-1.5 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-40"
        type="button"
      >
        <ChevronLeft size={16} strokeWidth={2.5} />
        <span className="hidden sm:inline">Previous</span>
      </button>

      <span className="text-xs font-medium text-slate-400">
        Page{" "}
        <span className="font-semibold text-slate-900">{currentPage}</span>
        {" of "}
        <span className="font-semibold text-slate-900">{totalPages}</span>
      </span>

      <button
        onClick={onNext}
        disabled={isLast}
        className="flex items-center gap-1.5 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-40"
        type="button"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={16} strokeWidth={2.5} />
      </button>
    </div>
  );
}
