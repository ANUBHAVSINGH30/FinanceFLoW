import { useNavigate, useLocation } from "react-router-dom";
import { BarChart3, Home, ReceiptText, User, Wallet } from "lucide-react";

const items = [
  { label: "Dashboard", icon: Home, path: "/dashboard" },
  { label: "Transactions", icon: ReceiptText, path: "/transaction" },
  { label: "Budget", icon: Wallet, path: "/dashboard" },
  { label: "Analytics", icon: BarChart3, path: "/dashboard" },
  { label: "Profile", icon: User, path: "/dashboard" },
];

export default function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed inset-x-6 bottom-[calc(0.8rem+env(safe-area-inset-bottom))] z-40 rounded-[28px] border border-slate-200/80 bg-white/95 shadow-[0_-12px_28px_rgba(15,23,42,0.12)] backdrop-blur-xl md:hidden">
      <div className="grid h-16 grid-cols-5 items-center px-px py-1.5">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive =
            (item.label === "Dashboard" && location.pathname === "/dashboard") ||
            (item.label === "Transactions" && location.pathname === "/transaction");

          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`flex h-full min-h-12 w-full flex-col items-center justify-center gap-1 rounded-2xl px-1 py-2 transition-all duration-200 active:scale-[0.98] ${
                isActive
                  ? "text-blue-600"
                  : "text-slate-500 hover:text-slate-700"
              }`}
              type="button"
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 ${
                  isActive
                    ? "scale-105 bg-blue-50 text-blue-600"
                    : "text-slate-400"
                }`}
              >
                <Icon size={21} strokeWidth={2.1} />
              </span>
              <span
                className={`text-[12px] leading-none transition-colors duration-200 ${
                  isActive
                    ? "font-semibold text-blue-600"
                    : "font-medium text-slate-500"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
