import { useEffect, useRef, useState, type ReactNode } from "react";
import FilterDropdown from "./FilterDropdown";

type FilterType = "all" | "income" | "expense";

export type SortOption =
  | "newest"
  | "oldest"
  | "highest"
  | "lowest";

export type DateRangePreset =
  | "today"
  | "yesterday"
  | "last7"
  | "last30"
  | "thisMonth"
  | "lastMonth"
  | "custom"
  | "";

type FilterBarProps = {
  activeType?: FilterType;
  onTypeChange?: (type: FilterType) => void;
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
  dateRange?: DateRangePreset;
  onDateRangeChange?: (preset: DateRangePreset) => void;
  customStartDate?: string;
  customEndDate?: string;
  onCustomDateChange?: (start: string, end: string) => void;
  sort?: SortOption;
  onSortChange?: (sort: SortOption) => void;
};

const typeOptions: { value: FilterType; label: string }[] = [
  { value: "all", label: "All" },
  { value: "income", label: "Income" },
  { value: "expense", label: "Expense" },
];

const categories = [
  "Food",
  "Shopping",
  "Salary",
  "Transport",
  "Education",
  "Entertainment",
  "Health",
  "Travel",
  "Other",
];

const datePresets: { value: DateRangePreset; label: string }[] = [
  { value: "", label: "All Dates" },
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "last7", label: "Last 7 Days" },
  { value: "last30", label: "Last 30 Days" },
  { value: "thisMonth", label: "This Month" },
  { value: "lastMonth", label: "Last Month" },
  { value: "custom", label: "Custom Range" },
];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "highest", label: "Highest Amount" },
  { value: "lowest", label: "Lowest Amount" },
];

function getTypeLabel(type: FilterType) {
  return typeOptions.find((option) => option.value === type)?.label ?? "All";
}

function getDateLabel(dateRange: DateRangePreset) {
  return datePresets.find((preset) => preset.value === dateRange)?.label ?? "Date";
}

function getSortLabel(sort: SortOption) {
  return sortOptions.find((option) => option.value === sort)?.label ?? "Sort";
}

export function getDateRange(preset: DateRangePreset): {
  startDate?: string;
  endDate?: string;
} {
  if (!preset || preset === "custom") return {};

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let start: Date;
  let end: Date;

  switch (preset) {
    case "today":
      start = today;
      end = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
      break;
    case "yesterday":
      start = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
      end = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 23, 59, 59);
      break;
    case "last7":
      start = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6);
      end = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
      break;
    case "last30":
      start = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 29);
      end = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
      break;
    case "thisMonth":
      start = new Date(today.getFullYear(), today.getMonth(), 1);
      end = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59);
      break;
    case "lastMonth":
      start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      end = new Date(today.getFullYear(), today.getMonth(), 0, 23, 59, 59);
      break;
    default:
      return {};
  }

  return {
    startDate: start.toISOString(),
    endDate: end.toISOString(),
  };
}

export default function FilterBar({
  activeType = "all",
  onTypeChange,
  selectedCategory = "",
  onCategoryChange,
  dateRange = "",
  onDateRangeChange,
  customStartDate = "",
  customEndDate = "",
  onCustomDateChange,
  sort = "newest",
  onSortChange,
}: FilterBarProps) {
  const [openFilter, setOpenFilter] = useState<
    "type" | "category" | "date" | "sort" | null
  >(null);
  const filterBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterBarRef.current &&
        !filterBarRef.current.contains(event.target as Node)
      ) {
        setOpenFilter(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={filterBarRef} className="relative">
      <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="shrink-0">
          <FilterDropdown
            value={getTypeLabel(activeType)}
            active={activeType !== "all"}
            onClick={() =>
              setOpenFilter((current) => (current === "type" ? null : "type"))
            }
          />
        </div>

        <div className="shrink-0">
          <FilterDropdown
            value={selectedCategory || "Category"}
            active={Boolean(selectedCategory)}
            onClick={() =>
              setOpenFilter((current) =>
                current === "category" ? null : "category"
              )
            }
          />
        </div>

        <div className="shrink-0">
          <FilterDropdown
            value={dateRange ? getDateLabel(dateRange) : "Date"}
            active={Boolean(dateRange)}
            onClick={() =>
              setOpenFilter((current) => (current === "date" ? null : "date"))
            }
          />
        </div>

        <div className="shrink-0">
          <FilterDropdown
            value={getSortLabel(sort)}
            active={sort !== "newest"}
            onClick={() =>
              setOpenFilter((current) => (current === "sort" ? null : "sort"))
            }
          />
        </div>
      </div>

      {openFilter === "type" && (
        <DropdownMenu>
          {typeOptions.map((option) => (
            <DropdownOption
              key={option.value}
              active={activeType === option.value}
              onClick={() => {
                onTypeChange?.(option.value);
                setOpenFilter(null);
              }}
            >
              {option.label}
            </DropdownOption>
          ))}
        </DropdownMenu>
      )}

      {openFilter === "category" && (
        <DropdownMenu>
          <DropdownOption
            active={!selectedCategory}
            onClick={() => {
              onCategoryChange?.("");
              setOpenFilter(null);
            }}
          >
            All Categories
          </DropdownOption>
          {categories.map((category) => (
            <DropdownOption
              key={category}
              active={selectedCategory === category}
              onClick={() => {
                onCategoryChange?.(category);
                setOpenFilter(null);
              }}
            >
              {category}
            </DropdownOption>
          ))}
        </DropdownMenu>
      )}

      {openFilter === "date" && (
        <DropdownMenu className="w-60">
          {datePresets.map((preset) => (
            <DropdownOption
              key={preset.value}
              active={dateRange === preset.value}
              onClick={() => {
                onDateRangeChange?.(preset.value);
                if (preset.value !== "custom") setOpenFilter(null);
              }}
            >
              {preset.label}
            </DropdownOption>
          ))}

          {dateRange === "custom" && (
            <div className="mt-1 space-y-2 border-t border-slate-100 px-3 py-3">
              <DateInput
                label="From"
                value={customStartDate}
                onChange={(value) =>
                  onCustomDateChange?.(value, customEndDate)
                }
              />
              <DateInput
                label="To"
                value={customEndDate}
                onChange={(value) =>
                  onCustomDateChange?.(customStartDate, value)
                }
              />
              <button
                onClick={() => {
                  if (customStartDate && customEndDate) setOpenFilter(null);
                }}
                disabled={!customStartDate || !customEndDate}
                className="w-full rounded-xl bg-slate-950 py-2 text-sm font-semibold text-white disabled:opacity-40"
                type="button"
              >
                Apply
              </button>
            </div>
          )}
        </DropdownMenu>
      )}

      {openFilter === "sort" && (
        <DropdownMenu>
          {sortOptions.map((option) => (
            <DropdownOption
              key={option.value}
              active={sort === option.value}
              onClick={() => {
                onSortChange?.(option.value);
                setOpenFilter(null);
              }}
            >
              {option.label}
            </DropdownOption>
          ))}
        </DropdownMenu>
      )}
    </div>
  );
}

function DropdownMenu({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`absolute left-0 top-full z-50 mt-2 max-h-80 w-52 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl ${className}`}
    >
      {children}
    </div>
  );
}

function DropdownOption({
  children,
  active,
  onClick,
}: {
  children: ReactNode;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition-colors ${
        active ? "bg-slate-950 text-white" : "text-slate-700 hover:bg-slate-50"
      }`}
      type="button"
    >
      {children}
    </button>
  );
}

function DateInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-slate-400">
        {label}
      </span>
      <input
        type="date"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
      />
    </label>
  );
}
