import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card";
import type { MonthlyTrend } from "../../../services/dashboard";

interface IncomeExpenseTrendChartProps {
  monthlyTrend: MonthlyTrend[];
  selectedYear: number;
}

export default function IncomeExpenseTrendChart({ monthlyTrend, selectedYear }: IncomeExpenseTrendChartProps) {
  const currentMonthIndex = new Date().getMonth();
  const displayYear = selectedYear;
  const chartData = monthlyTrend.slice(0, displayYear === new Date().getFullYear() ? currentMonthIndex + 1 : 12);
  const maxValue = Math.max(...chartData.map((month) => Math.max(month.income, month.expense)), 1);

  const formatShort = (num: number) => {
    if (num >= 100000) return `₹${(num / 100000).toFixed(1)}L`;
    if (num >= 1000) return `₹${(num / 1000).toFixed(1)}K`;
    return `₹${num.toLocaleString("en-IN")}`;
  };

  const linePath = (data: number[]) => {
    return data
      .map((val, i) => {
        const x = (i / Math.max(data.length - 1, 1)) * 600;
        const y = 200 * (1 - val / maxValue);
        return `${i === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");
  };

  const incomeData = chartData.map((m) => m.income);
  const expenseData = chartData.map((m) => m.expense);

  const gridRatios = [0.75, 0.5, 0.25];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Income vs Expense Trend</CardTitle>
      </CardHeader>
      <CardContent className="pt-3">
        <div className="relative h-64">
          <div className="absolute left-0 top-0 bottom-12 w-16 flex flex-col justify-between pr-2">
            {[maxValue, maxValue * 0.75, maxValue * 0.5, maxValue * 0.25, 0].map((val, i) => (
              <div key={i} className="text-xs text-slate-400 text-right">
                {formatShort(val)}
              </div>
            ))}
          </div>

          <div className="absolute left-16 right-4 top-0 bottom-12">
            <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                </linearGradient>
              </defs>

              {gridRatios.map((ratio) => (
                <line
                  key={ratio}
                  x1="0"
                  y1={200 * (1 - ratio)}
                  x2="600"
                  y2={200 * (1 - ratio)}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                />
              ))}

              <path d={linePath(incomeData) + ` L 600 200 L 0 200 Z`} fill="url(#incomeGradient)" />
              <path d={linePath(expenseData) + ` L 600 200 L 0 200 Z`} fill="url(#expenseGradient)" />

              <path d={linePath(incomeData)} stroke="#22c55e" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <path d={linePath(expenseData)} stroke="#ef4444" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

              {chartData.map((month, i) => {
                const x = (i / Math.max(chartData.length - 1, 1)) * 600;
                const incomeY = 200 * (1 - month.income / maxValue);
                const expenseY = 200 * (1 - month.expense / maxValue);
                return (
                  <g key={month.month}>
                    <circle cx={x} cy={incomeY} r={4} fill="#22c55e" stroke="white" strokeWidth={2} />
                    <circle cx={x} cy={expenseY} r={4} fill="#ef4444" stroke="white" strokeWidth={2} />
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="absolute left-16 right-4 bottom-0 h-12 flex items-start">
            {chartData.map((month) => (
              <div key={month.month} className="flex-1 text-center text-xs text-slate-400">
                {month.month}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm text-slate-600">Income</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-sm text-slate-600">Expense</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}