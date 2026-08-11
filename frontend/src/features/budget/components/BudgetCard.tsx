import {
  Utensils,
  Car,
  ShoppingBag,
  HeartPulse,
  GraduationCap,
  Tv,
  Wallet,
  CircleHelp,
} from "lucide-react";

type BudgetCardProps = {
  category: string;
  amount: number;
  spent: number;
};

const categoryIcons: Record<string, React.ElementType> = {
  Food: Utensils,
  Transport: Car,
  Shopping: ShoppingBag,
  Entertainment: Tv,
  Health: HeartPulse,
  Education: GraduationCap,
  Salary: Wallet,
  Other: CircleHelp,
};

export default function BudgetCard({
  category,
  amount,
  spent,
}: BudgetCardProps) {
  const Icon = categoryIcons[category] ?? CircleHelp;

  const progress = amount === 0 ? 0 : (spent / amount) * 100;

  const remaining = amount - spent;

  const progressColor =
    progress < 70
      ? "bg-emerald-500"
      : progress < 100
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <Icon size={20} />
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">
              {category}
            </h3>

            <p className="text-sm text-slate-500">
              ₹{spent.toLocaleString("en-IN")} / ₹
              {amount.toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        <p className="text-lg font-bold text-slate-900">
          {progress.toFixed(0)}%
        </p>
      </div>

      <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">
        <div
          className={`h-full rounded-full transition-all duration-300 ${progressColor}`}
          style={{
            width: `${Math.min(progress, 100)}%`,
          }}
        />
      </div>

      <div className="mt-3 flex justify-between text-sm">
        <span className="text-slate-500">
          {remaining >= 0
            ? `₹${remaining.toLocaleString("en-IN")} Remaining`
            : `Over by ₹${Math.abs(remaining).toLocaleString("en-IN")}`}
        </span>

        <span
          className={`font-medium ${
            remaining >= 0
              ? "text-emerald-600"
              : "text-red-600"
          }`}
        >
          {remaining >= 0 ? "On Track" : "Exceeded"}
        </span>
      </div>
    </div>
  );
}