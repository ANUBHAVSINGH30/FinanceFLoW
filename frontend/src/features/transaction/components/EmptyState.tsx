import { ReceiptText } from "lucide-react";
import { Button } from "../../../components/ui/Button";

type EmptyStateProps = {
  onAddTransaction?: () => void;
};

export default function EmptyState({ onAddTransaction }: EmptyStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
        <ReceiptText size={36} className="text-slate-300" strokeWidth={1.5} />
      </div>

      <h3 className="mb-2 text-lg font-semibold text-slate-900">
        No Transactions Yet
      </h3>

      <p className="mb-8 max-w-[240px] text-sm leading-relaxed text-slate-400">
        Start by adding your first transaction.
      </p>

      <Button onClick={onAddTransaction}>Add Transaction</Button>
    </div>
  );
}
