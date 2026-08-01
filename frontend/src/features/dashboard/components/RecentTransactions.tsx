import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card";

import type { Transaction } from "../../../services/transaction";
import { getCategoryIcon } from "../utils/categoryIcon";
import { formatDate } from "../utils/formatDate";
import { useNavigate } from "react-router-dom";

type RecentTransactionsProps = {
  transactions: Transaction[];
};


export default function RecentTransactions({transactions,}: RecentTransactionsProps) {

  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Transactions</CardTitle>
          {/* <p className="mt-1 text-sm text-slate-500"></p> */}
        </div>
        <button onClick={() => navigate("/transaction")} className="text-sm font-semibold text-blue-500" type="button">
          See all
        </button>
      </CardHeader>
      <CardContent className="space-y-3 pt-3">
        {transactions.map((transaction) => {
          const Icon = getCategoryIcon(transaction.category);

          return (
            <div key={transaction.id} className="flex items-center gap-3">
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
                <p className={`text-sm font-bold ${transaction.type === "income" ? "text-green-500" : "text-red-500"}`}>
                  {transaction.type === "income" ? "+" : "-"}₹{transaction.amount.toLocaleString("en-IN")}
                </p>
                <p className="text-xs text-slate-400">{formatDate(transaction.date)}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
