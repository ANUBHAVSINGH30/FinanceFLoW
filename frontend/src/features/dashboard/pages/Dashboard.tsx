import { useEffect, useState,} from "react";
import { getDashboardSummary, type DashboardSummary, } from "../../../services/dashboard";
import { type Budget, getBudget } from "../../../services/budget";


import {
  BarChart3,
  CreditCard,
  Home,
  LogOut,
  PieChart,
  ReceiptText,
  Settings,
  User,
  Wallet,
} from "lucide-react";
import BottomNavigation from "../components/BottomNavigation";
import BudgetProgress from "../components/BudgetProgress";
import ExpenseCategories from "../components/ExpenseCategories";
import MonthlyExpenseChart from "../components/ChartSection";
import QuickActions from "../components/QuickActions";
import RecentTransactions from "../components/RecentTransactions";
import SpendingInsight from "../components/SpendingInsight";
import BalanceCard from "../components/BalanceCard";
import Greeting from "../components/Greeting";

const sidebarItems = [
  { label: "Dashboard", icon: Home, active: true },
  { label: "Transactions", icon: ReceiptText },
  { label: "Analytics", icon: BarChart3 },
  { label: "Budgets", icon: PieChart },
  { label: "Cards", icon: CreditCard },
  { label: "Profile", icon: User },
  { label: "Settings", icon: Settings },
];


function Dashboard() {

  const [loading, setLoading] = useState(true);

  const [budgets, setBudgets] = useState<Budget []>([])

  const user = JSON.parse(localStorage.getItem("user") ?? "{}");
  const [summary, setSummary] = useState<DashboardSummary | null>(null);  

  useEffect(() => {
    const fetchDashboardSummary = async () => {
      try{
        const [summaryData, budgetData] = await Promise.all([
          getDashboardSummary(),
          getBudget(),
        ]);
        setSummary(summaryData);
        setBudgets(budgetData);

      }catch(error){
        console.log(error);
      }finally {
        setLoading(false)
      }
    };

    fetchDashboardSummary()
  }, []);

  if(loading){
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-[#E5E5E5] bg-white p-6 xl:block">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500 text-white">
            <Wallet size={22} />
          </div>
          <div>
            <p className="text-lg font-bold tracking-tight">FinanceFloW</p>
            <p className="text-xs font-medium text-slate-500">Personal finance</p>
          </div>
        </div>

        <nav className="mt-10 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
                  item.active
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                }`}
                type="button"
              >
                <Icon size={19} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <button
          className="absolute bottom-6 left-6 right-6 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-500 hover:bg-slate-100"
          type="button"
        >
          <LogOut size={19} />
          Log out
        </button>
      </aside>

      <main className="mx-auto w-full max-w-7xl px-4 pb-28 pt-5 sm:px-6 md:pb-8 md:pt-7 xl:ml-72 xl:px-8">
        <div className="mb-4">
          <Greeting name={user.name}/>
        </div>

        <div className="grid gap-4 lg:grid-cols-12">
          <section className="space-y-4 lg:col-span-8">
            
            <BalanceCard  
              balance={summary?.balance ?? 0}
              income = {summary?.totalIncome ?? 0}
              expense = {summary?.totalExpense ?? 0}
            />
            <QuickActions />

            <BudgetProgress budget={budgets[0]} />

            <ExpenseCategories />

            <RecentTransactions />

            <SpendingInsight />

          </section>

          <section className="space-y-4 lg:col-span-4">
            <MonthlyExpenseChart />
          </section>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}

export default Dashboard;
