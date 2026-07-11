export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>

          {subtitle && <p className="mt-2 text-gray-500">{subtitle}</p>}
        </div>

        {children}
      </div>
    </div>
  );
}
