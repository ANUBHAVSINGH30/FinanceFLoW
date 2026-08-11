import BudgetCard from "./BudgetCard";

type Budget = {
  id: string;
  category: string;
  amount: number;
  spent: number;
};

type BudgetListProps = {
  budgets: Budget[];
};

export default function BudgetList({
  budgets,
}: BudgetListProps) {
  return (
    <div className="space-y-4">
      {budgets.map((budget) => (
        <BudgetCard
          key={budget.id}
          category={budget.category}
          amount={budget.amount}
          spent={budget.spent}
        />
      ))}
    </div>
  );
}