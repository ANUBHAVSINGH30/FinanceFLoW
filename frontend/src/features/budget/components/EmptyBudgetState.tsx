import { Wallet } from "lucide-react";
import { Button } from "../../../components/ui/Button";

type EmptyBudgetStateProps = {
  onCreateBudget: () => void;
};

export default function EmptyBudgetState({
  onCreateBudget,
}: EmptyBudgetStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600">
        <Wallet size={30} />
      </div>

      <h2 className="mt-5 text-xl font-bold text-slate-900">
        No Budgets Yet
      </h2>

      <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
        Create your first monthly budget and start tracking your spending
        across different categories.
      </p>

      <Button
        onClick={onCreateBudget}
        className="mt-6 rounded-xl px-6"
      >
        Create Budget
      </Button>
    </div>
  );
}