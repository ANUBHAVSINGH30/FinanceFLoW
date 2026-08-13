import { Card, CardContent } from "../../../components/ui/Card";
import { TrendingUp, TrendingDown, Wallet, Target } from "lucide-react";

interface SummaryCardsProps {
  summary: {
    totalIncome: number;
    totalExpense: number;
    balance: number;
    transactionCount: number;
  };
  dailyAverage: number;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

const statCards = [
  {
    title: "Total Income",
    icon: TrendingUp,
    iconColor: "text-green-500",
    bgColor: "bg-green-50",
    value: (props: SummaryCardsProps) => formatCurrency(props.summary.totalIncome),
  },
  {
    title: "Total Expense",
    icon: TrendingDown,
    iconColor: "text-red-500",
    bgColor: "bg-red-50",
    value: (props: SummaryCardsProps) => formatCurrency(props.summary.totalExpense),
  },
  {
    title: "Balance",
    icon: Wallet,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50",
    value: (props: SummaryCardsProps) => formatCurrency(props.summary.balance),
  },
  {
    title: "Daily Average",
    icon: Target,
    iconColor: "text-purple-500",
    bgColor: "bg-purple-50",
    value: (props: SummaryCardsProps) => formatCurrency(props.dailyAverage),
  },
];

export default function SummaryCards({ summary, dailyAverage }: SummaryCardsProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">{card.title}</p>
                    <p className="mt-1 text-2xl font-bold text-slate-950">
                      {card.value({ summary, dailyAverage })}
                    </p>
                  </div>
                  <div className={`rounded-full p-3 ${card.bgColor}`}>
                    <Icon className={`h-6 w-6 ${card.iconColor}`} size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}