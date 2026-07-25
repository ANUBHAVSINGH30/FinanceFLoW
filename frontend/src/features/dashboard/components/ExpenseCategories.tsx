import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card";
import type { CategoryBreakdown } from "../../../services/dashboard";
import { CATEGORY_COLORS } from "../utils/categoryColors";

type ExpenseCategoriesProps = {
  categories: CategoryBreakdown[]
}


export default function ExpenseCategories({categories,} : ExpenseCategoriesProps) {

  const totalExpense = categories.reduce(
  (total, category) => total + category.amount,
  0
  );

  const topCategories = categories.slice(0, 5);
  

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Expense Categories</CardTitle>
        <button className="text-sm font-semibold text-blue-500" type="button">
          View Analytics →
        </button>
      </CardHeader>
      <CardContent className="space-y-3 pt-3">
        {topCategories.map((category, index) => {
          const percentage = totalExpense === 0 ? 0 : (category.amount / totalExpense) * 100;

          const color = CATEGORY_COLORS[index % CATEGORY_COLORS.length];

          return (
          <div key={category.category}>
            <div className="mb-2 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
                <span className="text-sm font-semibold text-slate-800">
                  {category.category}
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-500">
                ₹{category.amount.toLocaleString("en-IN")} ({Math.round(percentage)}%)
              </p>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${color}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        )}
          )
          }
      </CardContent>
    </Card>
  );
}
