import { Search } from "lucide-react";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}) {
  return (
    <div className="relative w-full max-w-md">
      <Search
        size={18}
        className="
          pointer-events-none
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-slate-400
        "
      />

      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="
          w-full
          rounded-xl
          border
          border-slate-200
          bg-white
          py-3
          pl-11
          pr-4
          text-sm
          shadow-sm
          outline-none
          transition
          focus:border-slate-900
        "
      />
    </div>
  );
}
