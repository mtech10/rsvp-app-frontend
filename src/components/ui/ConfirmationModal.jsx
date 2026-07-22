import { AlertTriangle } from "lucide-react";

export default function ConfirmationModal({
  open,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmVariant = "danger",
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-full bg-red-100 p-3">
            <AlertTriangle className="text-red-600" size={22} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">{title}</h2>

            <p className="mt-1 text-sm text-slate-500">{message}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-xl border border-slate-300 px-4 py-2 font-medium hover:bg-slate-100"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className={`rounded-xl px-4 py-2 font-medium text-white ${
              confirmVariant === "danger"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-slate-900 hover:bg-slate-800"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
