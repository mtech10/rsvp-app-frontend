export default function DashboardToolbar({ children, className = "" }) {
  return (
    <div
      className={`mb-6 flex flex-wrap items-center justify-between gap-4 ${className}`}
    >
      {children}
    </div>
  );
}
