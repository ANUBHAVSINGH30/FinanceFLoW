import { Card, CardContent } from "../../../components/ui/Card";
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle } from "lucide-react";

interface DailyAverageInsightProps {
  dailyAverage: number;
  totalExpense: number;
  daysInMonth: number;
  topCategory?: { category: string; amount: number } | null;
}

export default function DailyAverageInsight({ dailyAverage, totalExpense, daysInMonth, topCategory }: DailyAverageInsightProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const projectedMonthly = dailyAverage * daysInMonth;
  const savingsRate = totalExpense > 0 ? ((projectedMonthly - totalExpense) / projectedMonthly) * 100 : 0;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Daily Average</p>
                <p className="mt-1 text-2xl font-bold text-slate-950">{formatCurrency(dailyAverage)}</p>
              </div>
              <div className="rounded-full bg-blue-50 p-3">
                <TrendingUp className="h-6 w-6 text-blue-500" size={24} />
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-500">Based on {daysInMonth} days this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Projected Monthly</p>
                <p className="mt-1 text-2xl font-bold text-slate-950">{formatCurrency(projectedMonthly)}</p>
              </div>
              <div className="rounded-full bg-purple-50 p-3">
                <TrendingUp className="h-6 w-6 text-purple-500" size={24} />
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-500">If spending continues at current rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Top Category</p>
                <p className="mt-1 text-xl font-bold text-slate-950 truncate max-w-[150px]">
                  {topCategory ? topCategory.category : "—"}
                </p>
              </div>
              <div className="rounded-full bg-orange-50 p-3">
                <AlertCircle className="h-6 w-6 text-orange-500" size={24} />
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              {topCategory
                ? `₹${topCategory.amount.toLocaleString("en-IN")} spent`
                : "No expenses yet"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Savings Rate</p>
                <p className="mt-1 text-2xl font-bold text-slate-950">
                  {totalExpense > 0 ? `${Math.max(0, Math.round(savingsRate))}%` : "—"}
                </p>
              </div>
              <div className={`rounded-full p-3 ${savingsRate >= 20 ? "bg-green-50" : savingsRate >= 0 ? "bg-yellow-50" : "bg-red-50"}`}>
                {savingsRate >= 20 ? (
                  <CheckCircle className="h-6 w-6 text-green-500" size={24} />
                ) : savingsRate >= 0 ? (
                  <AlertCircle className="h-6 w-6 text-yellow-500" size={24} />
                ) : (
                  <TrendingDown className="h-6 w-6 text-red-500" size={24} />
                )}
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              {savingsRate >= 20 ? "Great! Above 20% target" : savingsRate >= 0 ? "Try to save more" : "Spending exceeds income"}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}