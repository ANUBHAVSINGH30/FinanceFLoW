import { ChevronDown } from "lucide-react";

type FilterDropdownProps = {
  value: string;
  onClick: () => void;
  active?: boolean;
};

export default function FilterDropdown({
  value,
  onClick,
  active = false,
}: FilterDropdownProps) {
  return (
    <button
      onClick={onClick}
      className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold shadow-sm transition-colors ${
        active
          ? "border-slate-300 bg-slate-950 text-white"
          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
      }`}
      type="button"
    >
      <span className="whitespace-nowrap">{value}</span>
      <ChevronDown
        size={15}
        className={active ? "text-white/80" : "text-slate-400"}
      />
    </button>
  );
}
