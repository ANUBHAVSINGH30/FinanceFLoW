import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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

const budgetSchema = z.object({
  category: z.enum(CATEGORIES),
  amount: z.coerce
    .number()
    .positive("Budget amount must be greater than 0"),
  month: z.string().min(1, "Month is required"),
});

type BudgetFormInput = z.input<typeof budgetSchema>;
type BudgetFormData = z.output<typeof budgetSchema>;

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BudgetFormInput, unknown, BudgetFormData>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      category: "Other",
      amount: 0,
      month: new Date().toISOString().slice(0, 7),
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700">
          Category
        </label>

        <select
          {...register("category")}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
        >
          {CATEGORIES.map((category) => (
            <option
              key={category}
              value={category}
            >
              {category}
            </option>
          ))}
        </select>

        {errors.category && (
          <p className="text-xs text-red-500">
            {errors.category.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700">
          Budget Amount
        </label>

        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            ₹
          </span>

          <input
            {...register("amount")}
            type="number"
            placeholder="0"
            className="w-full rounded-xl border border-slate-200 py-3 pl-8 pr-4 text-sm outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {errors.amount && (
          <p className="text-xs text-red-500">
            {errors.amount.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700">
          Month
        </label>

        <input
          {...register("month")}
          type="month"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
        />

        {errors.month && (
          <p className="text-xs text-red-500">
            {errors.month.message}
          </p>
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          className="flex-1"
          disabled={isSubmitting}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          className="flex-1"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create Budget"}
        </Button>
      </div>
    </form>
  );
}