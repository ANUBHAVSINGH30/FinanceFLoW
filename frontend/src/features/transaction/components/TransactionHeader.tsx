import { ArrowLeft } from "lucide-react";

export default function TransactionHeader() {
  return (
    <div className="flex items-center gap-4">
      <button className="rounded-full border border-[#E5E5E5] p-2">
        <ArrowLeft size={18} />
      </button>

      <div>
        <h1 className="text-xl font-bold">Transactions</h1>
        <p className="text-sm text-slate-500">
          Manage all your transactions
        </p>
      </div>
    </div>
  );
}