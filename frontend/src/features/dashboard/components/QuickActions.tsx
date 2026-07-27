import { ArrowUpRight, WalletCards } from "lucide-react";

const actions = [
  {
    label: "Add Transaction",
    icon: ArrowUpRight,
    className: "bg-blue-500 text-white shadow-blue-500/20 hover:bg-blue-600",
  },
  {
    label: "Add Budget",
    icon: WalletCards,
    className: "border border-[#E5E5E5] bg-white text-slate-700 hover:bg-slate-50",
  },
];

export default function QuickActions() {
  return (
    <section>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.label}
              className={`flex h-14 items-center justify-center gap-2 rounded-2xl px-4 text-sm font-bold shadow-sm transition-colors ${action.className}`}
              type="button"
            >
              <Icon size={18} />
              {action.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
