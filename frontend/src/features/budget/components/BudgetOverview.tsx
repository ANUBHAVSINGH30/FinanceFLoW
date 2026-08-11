import { Card } from "../../../components/ui/Card";
import { Wallet } from "lucide-react";

type BudgetOverviewProps = {
  totalBudget: number;
  totalSpent: number;
};

export default function BudgetOverview({
  totalBudget,
  totalSpent,
}: BudgetOverviewProps) {
  const remaining = totalBudget - totalSpent;

  const percentage =
    totalBudget === 0
      ? 0
      : Math.min((totalSpent / totalBudget) * 100, 100);

  return (
    <Card className="overflow-hidden">
      <div className="p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <Wallet size={22} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Monthly Budget
            </h2>

            <p className="text-sm text-slate-500">
              Track your monthly spending
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-slate-500">Budget</p>

            <p className="mt-1 text-xl font-bold text-slate-900">
              ₹{totalBudget.toLocaleString("en-IN")}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500">Spent</p>

            <p className="mt-1 text-xl font-bold text-red-500">
              ₹{totalSpent.toLocaleString("en-IN")}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500">Remaining</p>

            <p
              className={`mt-1 text-xl font-bold ${
                remaining >= 0
                  ? "text-emerald-600"
                  : "text-red-600"
              }`}
            >
              ₹{Math.abs(remaining).toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-slate-500">Budget Usage</span>

            <span className="font-semibold text-slate-900">
              {percentage.toFixed(0)}%
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-200">
            <div
              className={`h-full rounded-full transition-all ${
                percentage < 70
                  ? "bg-emerald-500"
                  : percentage < 100
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{
                width: `${percentage}%`,
              }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}