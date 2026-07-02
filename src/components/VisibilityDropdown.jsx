import React from "react";
import { Globe, Lock, Check } from "lucide-react";

const OPTIONS = [
  {
    id: "public",
    label: "Public",
    description: "Shown on your calendar and eligible to be featured.",
    icon: Globe,
  },
  {
    id: "private",
    label: "Private",
    description: "Unlisted. Only people with the link can register.",
    icon: Lock,
  },
];

const VisibilityDropdown = ({ value, onSelect }) => (
  <div className="w-72 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl">
    {OPTIONS.map((option) => {
      const Icon = option.icon;
      const selected = option.id === value;
      return (
        <button
          type="button"
          key={option.id}
          onClick={() => onSelect(option.id)}
          className="flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-slate-50"
        >
          <Icon size={18} className="mt-0.5 shrink-0 text-slate-400" />
          <span className="flex-1">
            <span className="block text-sm font-semibold text-slate-900">
              {option.label}
            </span>
            <span className="mt-0.5 block text-xs leading-snug text-slate-500">
              {option.description}
            </span>
          </span>
          {selected && (
            <Check size={16} className="mt-0.5 shrink-0 text-slate-900" />
          )}
        </button>
      );
    })}
  </div>
);

export default VisibilityDropdown;
