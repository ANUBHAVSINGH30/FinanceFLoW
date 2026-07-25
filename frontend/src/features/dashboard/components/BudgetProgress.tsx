import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card";
import type { Budget } from "../../../services/budget";

type BudgetProgressProps = {
  budgets : Budget[];
}

export default function BudgetProgress({
  budgets,
  }: BudgetProgressProps) {
  
    return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Budgets</CardTitle>
          <p className="mt-1 text-sm text-slate-500">Your Monthly limits</p>
        </div>
        <button className="text-sm font-semibold text-blue-500" type="button">
          See all
        </button>
      </CardHeader>
      <CardContent className="space-y-3 pt-3">
        {budgets.map((budget) => {
          
          //color 
          const progressColor =
            budget.percentageUsed >= 90
              ? "bg-red-500"
              : budget.percentageUsed >= 70
              ? "bg-amber-500"
              : "bg-green-500";

          return (
            <div
              key={budget.id}
              className="rounded-2xl p-3"
            >
              <div className="mb-2.5 flex items-center justify-between">
                <span className="text-sm font-bold text-slate-800">
                  {budget.category}
                </span>

                <div className=" flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-500">
                    {budget.percentageUsed}%
                  </span>

                  <span className="text-xs font-semibold tracking-tighter text-slate-500">
                    ({budget.status})
                  </span>
                </div>

              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full ${progressColor}`}
                  style={{ width: `${budget.percentageUsed}%` }}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
