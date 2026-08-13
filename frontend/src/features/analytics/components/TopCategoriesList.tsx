import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card";
import { CATEGORY_COLORS } from "../../dashboard/utils/categoryColors";

interface TopCategoriesListProps {
  categories: Array<{ category: string; amount: number }>;
}

export default function TopCategoriesList({ categories }: TopCategoriesListProps) {
  const totalExpense = categories.reduce((sum, cat) => sum + cat.amount, 0);
  const topCategories = categories.slice(0, 10);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Spending Categories</CardTitle>
      </CardHeader>
      <CardContent className="pt-3 space-y-3">
        {topCategories.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-slate-500">No expense data for this period</p>
          </div>
        ) : (
          topCategories.map((category, index) => {
            const percentage = totalExpense === 0 ? 0 : (category.amount / totalExpense) * 100;
            const color = CATEGORY_COLORS[index % CATEGORY_COLORS.length];
            const rank = index + 1;

            return (
              <div key={category.category} className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                <span className="text-xl font-bold text-slate-300 w-8 text-center">{rank}</span>
                <div className={`h-3 w-3 rounded-full ${color} shrink-0`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{category.category}</p>
                  <p className="text-xs text-slate-500">{Math.round(percentage)}% of total expenses</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold text-slate-950 tabular-nums">
                    ₹{category.amount.toLocaleString("en-IN")}
                  </p>
                  <p className="text-xs text-slate-500">{Math.round(percentage)}%</p>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}