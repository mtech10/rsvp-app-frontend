export default function Avatar({ name = "", size = "md", className = "" }) {
  const initials = name
    ?.trim()
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-14 w-14 text-lg",
    xl: "h-20 w-20 text-2xl",
  };

  return (
    <div
      className={`
        ${sizes[size]}
        flex items-center justify-center
        rounded-full
        bg-slate-900
        font-semibold
        text-white
        ${className}
      `}
    >
      {initials}
    </div>
  );
}
