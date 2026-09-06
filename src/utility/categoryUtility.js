import {
  Cpu,
  Coffee,
  Palette,
  Leaf,
  Activity,
  Tag,
  Zap,
  Star,
  Music,
  Film,
} from "lucide-react";

export const icons = [
  Cpu,
  Coffee,
  Palette,
  Leaf,
  Activity,
  Tag,
  Zap,
  Star,
  Music,
  Film,
];

export const hashString = (s) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i);
  return Math.abs(h);
};

export const getCategoryIcon = (categoryName) => {
  return icons[hashString(categoryName) % icons.length];
};

export const getEventCategories = (events = []) => {
  return [
    ...new Set(
      events
        .map((event) => event.category)
        .filter(Boolean)
        .map((category) => category.trim()),
    ),
  ].sort((a, b) => a.localeCompare(b));
};
