import { ArrowLeft } from "lucide-react";

type TransactionHeaderProps = {
  count?: number;
  onBack?: () => void;
};

export default function TransactionHeader({
  onBack,
}: TransactionHeaderProps) {
  return (
    <div className="flex items-center gap-4 px-1">
      <button
        onClick={onBack}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-colors hover:bg-slate-50 active:bg-slate-100"
        type="button"
      >
        <ArrowLeft size={18} strokeWidth={2} />
      </button>

      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-950">
          Transactions
        </h1>
        <p className="text-sm text-slate-500">
          Manage all your transactions
        </p>
      </div>
    </div>
  );
}
