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
  "Salary",
  "Other",
] as const;

const transactionSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(70, "Title is too long"),
  amount: z.coerce.number().positive("Amount must be positive"),
  type: z.enum(["income", "expense"]),
  category: z.enum(CATEGORIES),
  date: z.string().min(1, "Date is required"),
  note: z.string().trim().max(500, "Note is too long").optional(),
  isRecurring: z.boolean().default(false),
});

type TransactionFormInput = z.input<typeof transactionSchema>;
type TransactionFormData = z.output<typeof transactionSchema>;

type CreateTransactionFormProps = {
  onSubmit: (data: TransactionFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
};

export default function CreateTransactionForm({
  onSubmit,
  onCancel,
  isSubmitting = false,
}: CreateTransactionFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TransactionFormInput, unknown, TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      title: "",
      amount: 0,
      type: "expense",
      category: "Other",
      date: new Date().toISOString().split("T")[0],
      note: "",
      isRecurring: false
    },
  });

  const selectedType = watch("type");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700">Type</label>
        <div className="flex gap-2">
          {(["expense", "income"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setValue("type", type, { shouldValidate: true })}
              className={`flex-1 rounded-xl py-2.5 text-sm font-medium transition-all ${
                selectedType === type
                  ? type === "income"
                    ? "bg-emerald-500 text-white shadow-sm"
                    : "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
              type="button"
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
        {errors.type && (
          <p className="text-xs text-red-500">{errors.type.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700">Title</label>
        <input
          {...register("title")}
          placeholder="e.g. Grocery Shopping"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
        />
        {errors.title && (
          <p className="text-xs text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700">Amount</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
            ₹
          </span>
          <input
            {...register("amount")}
            type="number"
            step="0.01"
            placeholder="0.00"
            className="w-full rounded-xl border border-slate-200 py-3 pl-8 pr-4 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
          />
        </div>
        {errors.amount && (
          <p className="text-xs text-red-500">{errors.amount.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700">Category</label>
        <select
          {...register("category")}
          className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-xs text-red-500">{errors.category.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700">Date</label>
        <input
          {...register("date")}
          type="date"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
        />
        {errors.date && (
          <p className="text-xs text-red-500">{errors.date.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
         <label className="text-sm font-medium text-slate-700">Recurring Transaction</label>
        <div className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3">
          <p className="text-xs text-slate-400">
            Repeat this transaction every month
          </p>

          <input
          type="checkbox"
          {...register("isRecurring")}
          className="h-5 w-5 accent-blue-600"
        />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-700">
          Note <span className="text-slate-400">(optional)</span>
        </label>
        <textarea
          {...register("note")}
          rows={3}
          placeholder="Add a note..."
          className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
        />
        {errors.note && (
          <p className="text-xs text-red-500">{errors.note.message}</p>
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
        <Button type="submit" className="flex-1" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Transaction"}
        </Button>
      </div>
    </form>
  );
}
