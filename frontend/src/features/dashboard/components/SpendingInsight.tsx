import { TrendingUp, X } from "lucide-react";
import { Card } from "../../../components/ui/Card";

export default function SpendingInsight() {
  return (
    <Card className="bg-white p-4">
      <div className="flex gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
          <TrendingUp size={18} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-slate-900">Spending spike detected</p>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            Your food spending increased by 18% compared to last month.
          </p>
        </div>
        <button className="text-slate-400" type="button" aria-label="Dismiss insight">
          <X size={17} />
        </button>
      </div>
    </Card>
  );
}
