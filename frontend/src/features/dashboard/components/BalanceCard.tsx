import { ArrowDownLeft, ArrowUpRight, Eye, SlidersHorizontal } from "lucide-react";
import { Card } from "../../../components/ui/Card";

type BalanceCardProps = {
    balance: number,
    income: number,
    expense: number
  };

export default function BalanceCard({balance, income, expense}: BalanceCardProps) {

  const currentMonth = new Date().toLocaleString("default", {
    month: "long",
  });

  return (
    <Card className="overflow-hidden bg-emerald-900! ">
      <div className="p-5 sm:p-6 ">
        <div className="flex items-start justify-between ">
          <div>
            <p className="text-sm font-semibold text-amber-300">Total Balance</p>
            <div className="mt-2 flex items-center gap-2">
              <h2 className="text-4xl font-bold tracking-tight text-amber-100 sm:text-5xl">
                ₹{balance.toLocaleString("en-IN")}
              </h2>
              <Eye size={18} className="text-amber-100" />
            </div>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E5E5E5] bg-white text-slate-500">
            <SlidersHorizontal size={19} />
          </div>
        </div>

        <div className="mt-6 h-px bg-[#E5E5E5]" />

        <div className="mt-5 grid grid-cols-2 divide-x divide-[#E5E5E5]">
          <div className="pr-5">
            <div className="flex items-center gap-2 text-sm font-medium text-amber-300">
              <ArrowDownLeft size={15} className="text-green-600" />
              {currentMonth} Income 
            </div>
            <p className="mt-2 text-xl font-semibold text-amber-100">₹{income.toLocaleString("en-IN")}</p>
          </div>

          <div className="pl-5">
            <div className="flex items-center gap-2 text-sm font-medium text-amber-300">
              <ArrowUpRight size={15} className="text-red-600" />
              {currentMonth} Expenses
            </div>
            <p className="mt-2 text-xl font-semibold text-amber-100">₹{expense.toLocaleString("en-IN")}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
