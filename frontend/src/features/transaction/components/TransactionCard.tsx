import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

export default function TransactionCard() {
  const transaction = {
    title: "React Course",
    category: "Education",
    date: "20 Jul",
    amount: 2999,
    type: "EXPENSE",
  };

  const isIncome = transaction.type === "INCOME";

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-4">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full ${
            isIncome
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {isIncome ? (
            <ArrowDownLeft size={20} />
          ) : (
            <ArrowUpRight size={20} />
          )}
        </div>

        <div>
          <h3 className="font-semibold text-slate-900">
            {transaction.title}
          </h3>

          <p className="text-sm text-slate-500">
            {transaction.category} • {transaction.date}
          </p>
        </div>
      </div>

      <p
        className={`text-md font-bold ${
          isIncome ? "text-green-600" : "text-red-600"
        }`}
      >
        {isIncome ? "+" : "-"}₹{transaction.amount.toLocaleString("en-IN")}
      </p>
    </div>
  );
}