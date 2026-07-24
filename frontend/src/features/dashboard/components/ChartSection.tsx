import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card";

const months = [
  { label: "Jan", value: 46 },
  { label: "Feb", value: 62 },
  { label: "Mar", value: 54 },
  { label: "Apr", value: 78 },
  { label: "May", value: 68 },
  { label: "Jun", value: 88, current: true },
];

export default function MonthlyExpenseChart() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Monthly Expenses</CardTitle>
          <p className="mt-1 text-sm text-slate-500">Last 6 months</p>
        </div>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
          June
        </span>
      </CardHeader>
      <CardContent className="pt-3">
        <div className="flex h-40 items-end justify-between gap-3 rounded-2xl bg-white p-2">
          {months.map((month) => (
            <div key={month.label} className="flex flex-1 flex-col items-center gap-3">
              <div className="flex h-28 w-full items-end rounded-full bg-[#F7F7F7] p-1">
                <div
                  className={`w-full rounded-full ${
                    month.current ? "bg-blue-500" : "bg-blue-200"
                  }`}
                  style={{ height: `${month.value}%` }}
                />
              </div>
              <span
                className={`text-xs font-semibold ${
                  month.current ? "text-blue-600" : "text-slate-400"
                }`}
              >
                {month.label}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
