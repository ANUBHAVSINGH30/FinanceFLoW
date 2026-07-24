import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card";

const categories = [
  { name: "Food", amount: "₹5,200", percent: 35, color: "bg-blue-500" },
  { name: "Travel", amount: "₹2,400", percent: 18, color: "bg-green-500" },
  { name: "Bills", amount: "₹1,900", percent: 14, color: "bg-amber-500" },
  { name: "Shopping", amount: "₹1,600", percent: 11, color: "bg-red-500" },
];

export default function ExpenseCategories() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Expense Categories</CardTitle>
        <button className="text-sm font-semibold text-blue-500" type="button">
          View Analytics →
        </button>
      </CardHeader>
      <CardContent className="space-y-3 pt-3">
        {categories.map((category) => (
          <div key={category.name}>
            <div className="mb-2 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${category.color}`} />
                <span className="text-sm font-semibold text-slate-800">
                  {category.name}
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-500">
                {category.amount} ({category.percent}%)
              </p>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${category.color}`}
                style={{ width: `${category.percent}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
