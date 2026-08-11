import { useEffect, useState,} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { type CategoryBreakdown, getCategoryBreakdown, getDashboardSummary, getMonthlyTrend, type DashboardSummary, type MonthlyTrend } from "../../../services/dashboard";
import { type Budget, getBudget } from "../../../services/budget";
import { getRecentTransactions, type Transaction } from "../../../services/transaction";
import { logout } from "../../../lib/auth";


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
  { label: "Dashboard", icon: Home, path: "/dashboard" },
  { label: "Transactions", icon: ReceiptText, path: "/transaction" },
  { label: "Analytics", icon: BarChart3, path: "/dashboard" },
  { label: "Budgets", icon: PieChart, path: "/budget" },
  { label: "Cards", icon: CreditCard, path: "/dashboard" },
  { label: "Profile", icon: User, path: "/dashboard" },
  { label: "Settings", icon: Settings, path: "/dashboard" },
];


function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);

  const [budgets, setBudgets] = useState<Budget []>([]);
  const [categories, setCategories] = useState<CategoryBreakdown []>([]);
  const [transactions, setTransactions] = useState<Transaction []>([]);
  const [monthlyTrend, setMonthlyTrend] = useState<MonthlyTrend[]>([]);

  const user = JSON.parse(localStorage.getItem("user") ?? "{}");
  const [summary, setSummary] = useState<DashboardSummary | null>(null);  

  useEffect(() => {
    const fetchDashboardSummary = async () => {
      try{
        const [summaryData, budgetData, categoryData, transactionData, monthlyData] = await Promise.all([
          getDashboardSummary(),
          getBudget(),
          getCategoryBreakdown(),
          getRecentTransactions(),
          getMonthlyTrend(),
        ]);
        setSummary(summaryData);
        setBudgets(budgetData);
        setCategories(categoryData);
        setTransactions(transactionData);
        setMonthlyTrend(monthlyData);

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
            const isActive = location.pathname === item.path && item.label === "Dashboard"
              || (item.label === "Transactions" && location.pathname === "/transaction");

            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
                  isActive
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
          onClick={() => {
            logout();
            navigate("/signin");
          }}
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

            <BudgetProgress budgets={budgets} />

            <ExpenseCategories categories={categories} />

            <RecentTransactions transactions={transactions}/>

            <SpendingInsight />

          </section>

          <section className="space-y-4 lg:col-span-4">
            <MonthlyExpenseChart monthlyTrend={monthlyTrend}/>
          </section>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}

export default Dashboard;
