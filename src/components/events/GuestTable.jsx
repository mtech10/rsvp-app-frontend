import {
  User,
  Mail,
  Ticket,
  CheckCircle2,
  Clock3,
  XCircle,
  Check,
  X,
} from "lucide-react";

export default function GuestTable({ guests, onApprove, onReject }) {
  return (
    <div className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-6">
        <h2 className="text-xl font-semibold text-slate-900">Guest List</h2>

        <p className="mt-1 text-sm text-slate-500">
          Manage attendees for this event.
        </p>
      </div>

      {guests.length === 0 ? (
        <div className="p-10 text-center text-slate-500">
          No guests have registered yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">
                  Guest
                </th>

                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">
                  Email
                </th>

                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">
                  Tickets
                </th>

                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">
                  Status
                </th>

                <th className="px-6 py-3 text-right text-sm font-semibold text-slate-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {guests.map((guest) => (
                <tr key={guest._id} className="border-t border-slate-100">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 font-semibold text-slate-700">
                        {guest.user?.name?.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <p className="font-semibold text-slate-900">
                          {guest.user?.name}
                        </p>

                        <p className="text-sm text-slate-500">Guest</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Mail size={15} />

                      <span>{guest.user?.email}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1">
                      <Ticket size={15} />

                      {guest.tickets}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    {guest.status === "going" && (
                      <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                        <CheckCircle2 size={15} />
                        Going
                      </span>
                    )}

                    {guest.status === "pending" && (
                      <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700">
                        <Clock3 size={15} />
                        Pending
                      </span>
                    )}

                    {guest.status === "rejected" && (
                      <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                        <XCircle size={15} />
                        Rejected
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    {guest.status === "pending" && (
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => onApprove(guest._id)}
                          className="flex items-center gap-2 rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-green-700"
                        >
                          <Check size={16} />
                          Approve
                        </button>

                        <button
                          onClick={() => onReject(guest._id)}
                          className="flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                        >
                          <X size={16} />
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
