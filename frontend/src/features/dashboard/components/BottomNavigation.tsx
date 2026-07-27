import { BarChart3, Home, icons, Plus, ReceiptText, User, Wallet} from "lucide-react";

const items = [
  { label: "Home", icon: Home },
  { label: "Transactions", icon: ReceiptText },
  { label: "Budget", icon: Wallet},
  { label: "Analytics", icon: BarChart3 },
  { label: "Profile", icon: User },
];

export default function BottomNavigation() {
  return (
    <nav className="fixed inset-x-8 bottom-5 z-40 rounded-full border border-[#E5E5E5] bg-white px-4 py-3 md:hidden">
      <div className="grid grid-cols-5 items-center">
        {items.slice(0, 2).map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              className="flex flex-col items-center gap-1 text-slate-400 first:text-slate-950"
              type="button"
            >
              <Icon size={20} />
              <span className="text-[10px] font-semibold">{item.label}</span>
            </button>
          );
        })}

        {items.slice(2).map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              className="flex flex-col items-center gap-1 text-slate-400"
              type="button"
            >
              <Icon size={20} />
              <span className="text-[10px] font-semibold">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
