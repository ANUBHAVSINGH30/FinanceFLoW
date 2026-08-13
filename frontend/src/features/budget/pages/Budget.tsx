import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";

import BudgetOverview from "../components/BudgetOverview";
import BudgetFilterBar, {
  type BudgetStatus,
  type BudgetSort,
} from "../components/BudgetFilterBar";
import BudgetList from "../components/BudgetList";
import BudgetSkeleton from "../components/BudgetSkeleton";
import EmptyBudgetState from "../components/EmptyBudgetState";
import CreateBudgetModal from "../components/CreateBudgetModal";
import {
  getBudget,
  type Budget,
} from "../../../services/budget";
import BottomNavigation from "../../dashboard/components/BottomNavigation";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const YEARS = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

export default function Budget() {
  const navigate = useNavigate();

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [status, setStatus] = useState<BudgetStatus>("all");
  const [sort, setSort] = useState<BudgetSort>("highest-usage");
  const [showModal, setShowModal] = useState(false);

  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBudgets();
  }, [selectedMonth, selectedYear]);

  const fetchBudgets = async () => {
    try {
      setLoading(true);
      const data = await getBudget(selectedMonth, selectedYear);
      setBudgets(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBudgets = useMemo(() => {
    let result = budgets.filter((budget) => {
      const usage = budget.percentageUsed;
      switch (status) {
        case "within":
          return usage < 80;
        case "near-limit":
          return usage >= 80 && usage <= 100;
        case "over-budget":
          return usage > 100;
        default:
          return true;
      }
    });

    result.sort((a, b) => {
      switch (sort) {
        case "highest-usage":
          return b.percentageUsed - a.percentageUsed;
        case "lowest-usage":
          return a.percentageUsed - b.percentageUsed;
        case "highest-budget":
          return b.amount - a.amount;
        case "lowest-budget":
          return a.amount - b.amount;
        case "a-z":
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    return result;
  }, [budgets, status, sort]);

  const totalBudget = budgets.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const totalSpent = budgets.reduce(
    (sum, item) => sum + item.spent,
    0
  );

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F7F7]">
      <div className="mx-auto w-full max-w-3xl px-4 pt-5 pb-24">
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-5 text-sm font-semibold text-blue-600"
        >
          ← Back
        </button>

        <div className="mb-5 flex items-center gap-3">
          <div className="relative">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm font-medium text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {MONTHS.map((month, index) => (
                <option key={month} value={index + 1}>
                  {month}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>

          <div className="relative">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm font-medium text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {YEARS.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>
        </div>

        <BudgetOverview
          totalBudget={totalBudget}
          totalSpent={totalSpent}
        />

        <div className="mt-5">
          <BudgetFilterBar
            status={status}
            sort={sort}
            onStatusChange={setStatus}
            onSortChange={setSort}
          />
        </div>

        <div className="mt-5">
          {loading ? (
            <BudgetSkeleton />
          ) : filteredBudgets.length === 0 ? (
            <EmptyBudgetState
              onCreateBudget={() => setShowModal(true)}
            />
          ) : (
            <BudgetList budgets={filteredBudgets as any} />
          )}
        </div>
      </div>

      <CreateBudgetModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={fetchBudgets}
      />

      <BottomNavigation />
    </div>
  );
}