import { Coffee, Music, ShoppingBag, Utensils } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card";

const transactions = [
  {
    title: "Grocery Market",
    category: "Food",
    amount: "-$84.20",
    date: "Today",
    icon: ShoppingBag,
    tone: "text-red-600",
  },
  {
    title: "Salary Deposit",
    category: "Income",
    amount: "+$3,400.00",
    date: "Jun 28",
    icon: Utensils,
    tone: "text-green-600",
  },
  {
    title: "Coffee Latte",
    category: "Food",
    amount: "-$5.80",
    date: "Jun 27",
    icon: Coffee,
    tone: "text-red-600",
  },
  {
    title: "Music Subscription",
    category: "Bills",
    amount: "-$9.99",
    date: "Jun 26",
    icon: Music,
    tone: "text-red-600",
  },
];

export default function RecentTransactions() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Activity</CardTitle>
          <p className="mt-1 text-sm text-slate-500">Today</p>
        </div>
        <button className="text-sm font-semibold text-blue-500" type="button">
          See all
        </button>
      </CardHeader>
      <CardContent className="space-y-3 pt-3">
        {transactions.map((transaction) => {
          const Icon = transaction.icon;

          return (
            <div key={transaction.title} className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                <Icon size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {transaction.title}
                </p>
                <p className="text-xs text-slate-500">{transaction.category}</p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-bold ${transaction.tone}`}>
                  {transaction.amount}
                </p>
                <p className="text-xs text-slate-400">{transaction.date}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
