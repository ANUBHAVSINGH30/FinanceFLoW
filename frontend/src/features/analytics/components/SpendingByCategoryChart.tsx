import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card";
import { CATEGORY_COLORS } from "../../dashboard/utils/categoryColors";

interface SpendingByCategoryChartProps {
  categories: Array<{ category: string; amount: number }>;
}

export default function SpendingByCategoryChart({ categories }: SpendingByCategoryChartProps) {
  const totalExpense = categories.reduce((sum, cat) => sum + cat.amount, 0);
  const topCategories = categories.slice(0, 8);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending by Category</CardTitle>
      </CardHeader>
      <CardContent className="pt-3 space-y-4">
        {topCategories.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-slate-500">No expense data for this period</p>
          </div>
        ) : (
          topCategories.map((category, index) => {
            const percentage = totalExpense === 0 ? 0 : (category.amount / totalExpense) * 100;
            const color = CATEGORY_COLORS[index % CATEGORY_COLORS.length];

            return (
              <div key={category.category} className="space-y-1.5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <span className={`h-2.5 w-2.5 rounded-full ${color} shrink-0`} />
                    <span className="text-sm font-medium text-slate-800 truncate">
                      {category.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-sm font-medium text-slate-600 tabular-nums w-20 text-right">
                      ₹{category.amount.toLocaleString("en-IN")}
                    </span>
                    <span className="text-sm font-medium text-slate-500 w-14 text-right">
                      {Math.round(percentage)}%
                    </span>
                  </div>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${color} transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}