import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card";
import type { MonthlyTrend } from "../../../services/dashboard";

interface MonthlyExpenseChartProps{
  monthlyTrend: MonthlyTrend[];
}

export default function MonthlyExpenseChart({monthlyTrend}: MonthlyExpenseChartProps) {

  //show only 6 months chart
  const currentMonthIndex = new Date().getMonth();
  const chartData = monthlyTrend.slice(
    Math.max(0, currentMonthIndex - 5), currentMonthIndex + 1
  );

  //find highest bar to scale chart
  const maxExpense = Math.max(
    ...chartData.map((month) => month.expense),

  );

  //current month is the last item
  const currMonth = chartData[chartData.length - 1]?.month;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Monthly Expenses</CardTitle>
          <p className="mt-1 text-sm text-slate-500">Last 6 months</p>
        </div>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
          {currMonth}
        </span>
      </CardHeader>

      <CardContent className="pt-3">
        <div className="flex h-40 items-end justify-between gap-3 rounded-2xl bg-white p-2">
          {chartData.map((month) => {
            const height = (month.expense / maxExpense) * 100;
            const isCurrent = month.month === currMonth;
             return(
              <div key={month.month} className="flex flex-1 flex-col items-center gap-3">
                <div className="flex h-28 w-full items-end rounded-full bg-[#F7F7F7] p-1">
                  <div
                    className={`w-full rounded-full transition-all duration-300 ${
                      isCurrent ? "bg-blue-500" : "bg-blue-300"
                    }`}
                    style={{
                      height: `${height}%`,
                    }}
                  />
                </div>

                  <span
                    className={`text-xs font-semibold ${
                      isCurrent ? "text-slate-600" : "text-slate-400"
                    }`}
                  >
                    {month.month}
                  </span>
                </div>
             )
          })}
        </div>
      </CardContent>
    </Card>
  );
}
