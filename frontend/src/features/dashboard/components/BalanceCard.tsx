import { ArrowDownLeft, ArrowUpRight, Eye, SlidersHorizontal } from "lucide-react";
import { Card } from "../../../components/ui/Card";

type BalanceCardProps = {
    balance: number,
    income: number,
    expense: number
  };

export default function BalanceCard({balance, income, expense}: BalanceCardProps) {


  return (
    <Card className="overflow-hidden bg-[#F7F7F7]">
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-500">Total Balance</p>
            <div className="mt-2 flex items-center gap-2">
              <h2 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                ₹{balance.toLocaleString("en-IN")}
              </h2>
              <Eye size={18} className="text-slate-400" />
            </div>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E5E5E5] bg-white text-slate-500">
            <SlidersHorizontal size={19} />
          </div>
        </div>

        <div className="mt-6 h-px bg-[#E5E5E5]" />

        <div className="mt-5 grid grid-cols-2 divide-x divide-[#E5E5E5]">
          <div className="pr-5">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <ArrowDownLeft size={15} className="text-green-600" />
              Income
            </div>
            <p className="mt-2 text-xl font-semibold text-slate-950">₹{income.toLocaleString("en-IN")}</p>
          </div>

          <div className="pl-5">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <ArrowUpRight size={15} className="text-red-600" />
              Expenses
            </div>
            <p className="mt-2 text-xl font-semibold text-slate-950">₹{expense.toLocaleString("en-IN")}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
