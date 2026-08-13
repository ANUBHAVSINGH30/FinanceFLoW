import { useState } from "react";
import { Button } from "../../../components/ui/Button";

const CATEGORIES = [
  "Food",
  "Transport",
  "Shopping",
  "Entertainment",
  "Health",
  "Education",
  "Other",
] as const;

export type BudgetFormData = {
  category: string;
  amount: number;
  month: number;
  year: number;
};

type CreateBudgetFormProps = {
  onSubmit: (data: BudgetFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
};

export default function CreateBudgetForm({
  onSubmit,
  onCancel,
  isSubmitting = false,
}: CreateBudgetFormProps) {
  const [category, setCategory] = useState<string>("Other");
  const [amount, setAmount] = useState<number>(0);
  const [monthValue, setMonthValue] = useState<string>(new Date().toISOString().slice(0, 7));
  const [errors, setErrors] = useState<{ category?: string; amount?: string; month?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!category) newErrors.category = "Category is required";
    if (!amount || amount <= 0) newErrors.amount = "Budget amount must be greater than 0";
    if (!monthValue) newErrors.month = "Month is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const [yearStr, monthStr] = monthValue.split("-");
    await onSubmit({
      category,
      amount,
      month: Number(monthStr),
      year: Number(yearStr),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700">Category</label>
        <select
          value={category}
          onChange={(e) => { setCategory(e.target.value); setErrors((prev) => ({ ...prev, category: undefined })); }}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {errors.category && <p className="text-xs text-red-500">{errors.category}</p>}
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700">Budget Amount</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">₹</span>
          <input
            value={amount || ""}
            onChange={(e) => { setAmount(Number(e.target.value)); setErrors((prev) => ({ ...prev, amount: undefined })); }}
            type="number"
            placeholder="0"
            className="w-full rounded-xl border border-slate-200 py-3 pl-8 pr-4 text-sm outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
          />
        </div>
        {errors.amount && <p className="text-xs text-red-500">{errors.amount}</p>}
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700">Month</label>
        <input
          value={monthValue}
          onChange={(e) => { setMonthValue(e.target.value); setErrors((prev) => ({ ...prev, month: undefined })); }}
          type="month"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
        />
        {errors.month && <p className="text-xs text-red-500">{errors.month}</p>}
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel} className="flex-1" disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" className="flex-1" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Budget"}
        </Button>
      </div>
    </form>
  );
}