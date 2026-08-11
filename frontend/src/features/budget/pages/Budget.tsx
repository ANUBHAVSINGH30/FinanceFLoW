import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

import BudgetOverview from "../components/BudgetOverview";
import BudgetFilterBar, {
  type BudgetStatus,
  type BudgetSort,
} from "../components/BudgetFilterBar";
import BudgetList from "../components/BudgetList";
import EmptyBudgetState from "../components/EmptyBudgetState";
import CreateBudgetModal from "../components/CreateBudgetModal";
import {
  getBudget,
  type Budget,
} from "../../../services/budget";
import BottomNavigation from "../../dashboard/components/BottomNavigation";



export default function Budget() {
  const navigate = useNavigate();

  const [status, setStatus] =
    useState<BudgetStatus>("all");

  const [sort, setSort] =
    useState<BudgetSort>("highest-usage");

  const [showModal, setShowModal] =
    useState(false);

  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchBudgets();
    }, []);

    const fetchBudgets = async () => {
    try {
        setLoading(true);

        const data = await getBudget();

        setBudgets(data);
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
  };

//   {loading ? (
//   <BudgetSkeleton />
// ) : budgets.length === 0 ? (
//   <EmptyBudgetState
//     onCreateBudget={() => setShowModal(true)}
//   />
// ) : (
//   <BudgetList budgets={budgets} />
// )}

  budgets.filter((budget) => {
    const usage = (budget.spent / budget.amount) * 100;

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

  budgets.sort((a, b) => {
    switch (sort) {
      case "highest-usage":
        return b.spent / b.amount - a.spent / a.amount;

      case "lowest-usage":
        return a.spent / a.amount - b.spent / b.amount;

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

  const totalBudget = budgets.reduce(
    (sum, item) =>  sum + item.amount,
    0
  )

  const totalSpent = budgets.reduce(
    (sum, item) => sum + item.spent,
    0
  );

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F7F7]">
      <div className="mx-auto w-full max-w-3xl px-4 pt-5 pb-24">

        {/* Back */}

        <button
          onClick={() => navigate("/dashboard")}
          className="mb-5 text-sm font-semibold text-blue-600"
        >
          ← Back
        </button>

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
          {budgets.length === 0 ? (
            <EmptyBudgetState
              onCreateBudget={() => setShowModal(true)}
            />
          ) : (
            <BudgetList budgets={budgets as any} />
          )}
        </div>
      </div>

      <CreateBudgetModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={(fetchBudgets)}
      />

      <BottomNavigation />
    </div>
  );
}