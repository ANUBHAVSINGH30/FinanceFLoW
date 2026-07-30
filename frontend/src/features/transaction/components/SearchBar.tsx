import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-[#E5E5E5] bg-white px-4 py-3">
      <Search size={18} className="text-slate-400" />

      <input
        placeholder="Search transaction..."
        className="w-full bg-transparent outline-none"
      />
    </div>
  );
}