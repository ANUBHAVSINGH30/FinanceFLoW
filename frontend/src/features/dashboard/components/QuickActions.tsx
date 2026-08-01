import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, WalletCards } from "lucide-react";
import CreateTransactionModal from "../../transaction/components/CreateTransactionModal";

export default function QuickActions() {
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <>
      <section>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-blue-500 px-4 text-sm font-bold text-white shadow-sm shadow-blue-500/20 transition-colors hover:bg-blue-600"
            type="button"
          >
            <ArrowUpRight size={18} />
            Add Transaction
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="flex h-14 items-center justify-center gap-2 rounded-2xl border border-[#E5E5E5] bg-white px-4 text-sm font-bold text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
            type="button"
          >
            <WalletCards size={18} />
            Add Budget
          </button>
        </div>
      </section>

      <CreateTransactionModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={() => setShowCreateModal(false)}
      />
    </>
  );
}
