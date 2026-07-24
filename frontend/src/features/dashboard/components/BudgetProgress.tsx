import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card";

const budgets = [
  { name: "Food", value: 70, color: "bg-green-500" },
  { name: "Travel", value: 45, color: "bg-blue-500" },
  { name: "Shopping", value: 90, color: "bg-amber-500" },
];

export default function BudgetProgress() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Savings & Budgets</CardTitle>
          <p className="mt-1 text-sm text-slate-500">Monthly limits</p>
        </div>
        <button className="text-sm font-semibold text-blue-500" type="button">
          See all
        </button>
      </CardHeader>
      <CardContent className="space-y-3 pt-3">
        {budgets.map((budget) => (
          <div key={budget.name} className="rounded-2xl border border-[#E5E5E5] p-3">
            <div className="mb-2.5 flex items-center justify-between">
              <span className="text-sm font-bold text-slate-800">{budget.name}</span>
              <span className="text-sm font-semibold text-slate-500">
                {budget.value}% used
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${budget.color}`}
                style={{ width: `${budget.value}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
