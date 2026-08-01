function SkeletonRow() {
  return (
    <div className="flex items-center justify-between px-1 py-3">
      <div className="flex items-center gap-3.5">
        <div className="h-11 w-11 shrink-0 animate-pulse rounded-full bg-slate-100" />
        <div className="space-y-2">
          <div className="h-3.5 w-28 animate-pulse rounded-full bg-slate-100" />
          <div className="h-3 w-20 animate-pulse rounded-full bg-slate-100" />
        </div>
      </div>
      <div className="h-3.5 w-16 animate-pulse rounded-full bg-slate-100" />
    </div>
  );
}

type TransactionSkeletonProps = {
  rows?: number;
};

export default function TransactionSkeleton({ rows = 5 }: TransactionSkeletonProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-2 shadow-sm">
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonRow key={i} />
      ))}
    </div>
  );
}
