import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

export default function DropdownSelect({
  value,
  onChange,
  options,
  placeholder,
  icon: Icon,
}) {
  const [open, setOpen] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected =
    options.find((option) => option.value === value) || options[0];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex min-w-42.5 items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon size={16} className="text-slate-500" />}

          <span>{selected?.label || placeholder}</span>
        </div>

        <ChevronDown
          size={18}
          className={`transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm transition
${option.value === value ? "bg-slate-100 font-semibold" : "hover:bg-slate-50"}`}
            >
              <span>{option.label}</span>

              {option.value === value && (
                <Check size={16} className="text-green-600" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
