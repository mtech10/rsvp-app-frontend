import { CheckCircle2, Clock3, XCircle, RotateCcw } from "lucide-react";

export default function RegistrationStatusCard({
  status,
  loading,
  onCancel,
  onJoinAgain,
}) {
  const config = {
    going: {
      icon: CheckCircle2,
      iconColor: "text-green-600",
      bg: "bg-green-100",
      title: "You're attending",
      description: "Your registration has been confirmed.",
      button: "Cancel Registration",
      action: onCancel,
      buttonStyle: "bg-red-50 text-red-600 hover:bg-red-100",
    },

    pending: {
      icon: Clock3,
      iconColor: "text-amber-600",
      bg: "bg-amber-100",
      title: "Request Pending",
      description: "Your registration is awaiting approval.",
      button: "Cancel Registration",
      action: onCancel,
      buttonStyle: "bg-red-50 text-red-600 hover:bg-red-100",
    },

    rejected: {
      icon: XCircle,
      iconColor: "text-red-600",
      bg: "bg-red-100",
      title: "Request Declined",
      description: "The organizer declined your request.",
    },

    cancelled: {
      icon: RotateCcw,
      iconColor: "text-slate-600",
      bg: "bg-slate-100",
      title: "Registration Cancelled",
      description: "You are no longer attending this event.",
      button: "Join Again",
      action: onJoinAgain,
      buttonStyle: "bg-slate-900 text-white hover:bg-black",
    },
  };

  const current = config[status];

  if (!current) return null;

  const Icon = current.icon;

  return (
    <div className="mt-12 rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="bg-slate-50 px-5 py-3 text-sm font-medium text-slate-600">
        Registration Status
      </div>

      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className={`rounded-full p-3 ${current.bg}`}>
            <Icon size={22} className={current.iconColor} />
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">{current.title}</h3>

            <p className="mt-1 text-sm text-slate-500">{current.description}</p>
          </div>
        </div>

        {current.button && (
          <button
            disabled={loading}
            onClick={current.action}
            className={`mt-6 w-full rounded-xl py-3 font-semibold transition ${current.buttonStyle}`}
          >
            {current.button}
          </button>
        )}
      </div>
    </div>
  );
}
