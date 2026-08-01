import {
  UtensilsCrossed,
  ShoppingBag,
  BookOpen,
  Heart,
  DollarSign,
  Gift,
  Clapperboard,
  Plane,
  Bus,
  Zap,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";

type TransactionType = "income" | "expense";

type TransactionRowProps = {
  title: string;
  category: string;
  date: string;
  amount: number;
  type: TransactionType;
};

const categoryConfig: Record<
  string,
  { icon: LucideIcon; bg: string; text: string }
> = {
  Food: {
    icon: UtensilsCrossed,
    bg: "bg-orange-100",
    text: "text-orange-600",
  },
  Shopping: {
    icon: ShoppingBag,
    bg: "bg-pink-100",
    text: "text-pink-600",
  },
  Education: {
    icon: BookOpen,
    bg: "bg-blue-100",
    text: "text-blue-600",
  },
  Health: {
    icon: Heart,
    bg: "bg-red-100",
    text: "text-red-500",
  },
  Salary: {
    icon: DollarSign,
    bg: "bg-emerald-100",
    text: "text-emerald-600",
  },
  Gift: {
    icon: Gift,
    bg: "bg-purple-100",
    text: "text-purple-600",
  },
  Entertainment: {
    icon: Clapperboard,
    bg: "bg-amber-100",
    text: "text-amber-600",
  },
  Travel: {
    icon: Plane,
    bg: "bg-cyan-100",
    text: "text-cyan-600",
  },
  Transport: {
    icon: Bus,
    bg: "bg-indigo-100",
    text: "text-indigo-600",
  },
  Utilities: {
    icon: Zap,
    bg: "bg-yellow-100",
    text: "text-yellow-600",
  },
  Other: {
    icon: HelpCircle,
    bg: "bg-slate-100",
    text: "text-slate-500",
  },
};

const defaultConfig = {
  icon: HelpCircle,
  bg: "bg-slate-100",
  text: "text-slate-500",
};

function formatAmount(amount: number): string {
  return amount.toLocaleString("en-IN");
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function TransactionRow({
  title,
  category,
  date,
  amount,
  type,
}: TransactionRowProps) {
  const isIncome = type === "income";
  const config = categoryConfig[category] ?? defaultConfig;
  const Icon = config.icon;

  return (
    <div className="flex items-center justify-between px-1 py-3">
      <div className="flex items-center gap-3.5">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${config.bg}`}
        >
          <Icon size={19} className={config.text} strokeWidth={2} />
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-900">
            {title}
          </p>
          <p className="text-xs text-slate-400">
            {category} • {formatDate(date)}
          </p>
        </div>
      </div>

      <p
        className={`shrink-0 text-sm font-bold tabular-nums ${
          isIncome ? "text-emerald-600" : "text-slate-900"
        }`}
      >
        {isIncome ? "+" : "-"}₹{formatAmount(amount)}
      </p>
    </div>
  );
}
