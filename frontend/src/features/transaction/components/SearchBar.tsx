import { ArrowLeft, Search, X } from "lucide-react";

type SearchBarProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  onBack?: () => void;
};

export default function SearchBar({
  value = "",
  onChange,
  placeholder = "Search transactions...",
  onBack,
}: SearchBarProps) {
  return (
    <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2.5 shadow-sm transition-colors focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100">
      <button
        onClick={onBack}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-100 active:bg-slate-200 disabled:pointer-events-none disabled:opacity-40"
        type="button"
        aria-label="Go back"
        disabled={!onBack}
      >
        <ArrowLeft size={20} strokeWidth={2.25} />
      </button>

      <Search size={18} className="shrink-0 text-slate-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
      />
      {value.length > 0 && (
        <button
          onClick={() => onChange?.("")}
          className="shrink-0 rounded-full p-0.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          type="button"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
