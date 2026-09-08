// import { UserCheck, Hash, Minus, Plus } from "lucide-react";

// export default function RegistrationCard({
//   event,
//   rsvp,
//   ticketCount,
//   onIncrement,
//   onDecrement,
//   onRegister,
//   onCancel,
//   loading,
//   UserProfileInfo,
//   setShowApprovalForm,
// }) {
//   const ticketType = event.ticketType?.toLowerCase().trim() || "";

//   const isRegistration = ticketType === "registration";
//   const isApprovalRequired =
//     ticketType.includes("approval") || event.requireApproval;
//   const isFree = ticketType === "free";
//   const isPaid = ticketType === "paid";
//   const isPaidOrRegistration = isPaid || isRegistration;

//   return (
//     <div className="mt-12 rounded-2xl border border-slate-200 bg-white shadow-sm">
//       <div className="bg-slate-50 px-5 py-3 text-sm font-medium text-slate-600">
//         Registration
//       </div>

//       <div className="px-5 pb-5">
//         {isApprovalRequired ? (
//           <>
//             <div className="flex items-start gap-3 border-b border-slate-100 py-4">
//               <div className="rounded-full bg-slate-100 p-2 text-slate-600">
//                 <UserCheck size={18} />
//               </div>

//               <div>
//                 <span className="font-semibold text-slate-900">
//                   Approval Required
//                 </span>

//                 <p className="text-sm text-slate-500">
//                   Your registration is subject to host approval.
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center justify-between py-4">
//               <div className="flex items-center gap-2 font-semibold text-slate-900">
//                 <Hash size={18} className="text-slate-400" />
//                 Tickets
//               </div>

//               <div className="flex items-center gap-4">
//                 <button
//                   onClick={onDecrement}
//                   className="rounded-md bg-slate-50 p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
//                 >
//                   <Minus size={16} />
//                 </button>

//                 <span className="w-4 text-center font-semibold">
//                   {ticketCount}
//                 </span>

//                 <button
//                   onClick={onIncrement}
//                   className="rounded-md bg-slate-50 p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
//                 >
//                   <Plus size={16} />
//                 </button>
//               </div>
//             </div>

//             <UserProfileInfo />

//             <button
//               onClick={() => setShowApprovalForm(true)}
//               className="mt-2 w-full rounded-xl bg-[#2C2C2C] py-3 text-sm font-bold text-white transition hover:bg-black"
//             >
//               Request to Join
//             </button>
//           </>
//         ) : isFree ? (
//           <>
//             <p className="mt-4 text-sm text-slate-700">
//               Welcome! To join the event, please register below.
//             </p>

//             <UserProfileInfo />

//             <button
//               disabled={loading}
//               onClick={onRegister}
//               className="mt-2 w-full rounded-xl bg-[#2C2C2C] py-3 text-sm font-bold text-white transition hover:bg-black disabled:opacity-50"
//             >
//               {loading ? "Registering..." : "One-Click RSVP"}
//             </button>
//           </>
//         ) : isPaidOrRegistration ? (
//           <>
//             <p className="mt-4 text-sm text-slate-700">
//               Welcome! To join the event, please register below.
//             </p>

//             <UserProfileInfo />

//             <button
//               onClick={onRegister}
//               className="mt-2 w-full rounded-xl bg-[#2C2C2C] py-3 text-sm font-bold text-white transition hover:bg-black"
//             >
//               Register
//             </button>
//           </>
//         ) : (
//           <p className="mt-4 text-sm text-slate-700">
//             This event requires registration. Please contact the organizer.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// RegistrationCard.jsx

import { UserCheck, Hash, Minus, Plus } from "lucide-react";
import useRequireAuth from "../../hooks/useRequireAuth";

export default function RegistrationCard({
  event,
  rsvp,
  ticketCount,
  onIncrement,
  onDecrement,
  onRegister,
  onCancel,
  loading,
  UserProfileInfo,
  setShowApprovalForm,
}) {
  const { requireAuth } = useRequireAuth();

  const ticketType = event.ticketType?.toLowerCase().trim() || "";

  const isRegistration = ticketType === "registration";
  const isApprovalRequired =
    ticketType.includes("approval") || event.requireApproval;
  const isFree = ticketType === "free";
  const isPaid = ticketType === "paid";
  const isPaidOrRegistration = isPaid || isRegistration;

  const handleRegister = () => {
    if (!requireAuth()) return;
    onRegister?.();
  };

  const handleRequestToJoin = () => {
    if (!requireAuth()) return;
    setShowApprovalForm?.(true);
  };

  return (
    <div className="mt-12 rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="bg-slate-50 px-5 py-3 text-sm font-medium text-slate-600">
        Registration
      </div>

      <div className="px-5 pb-5">
        {isApprovalRequired ? (
          <>
            <div className="flex items-start gap-3 border-b border-slate-100 py-4">
              <div className="rounded-full bg-slate-100 p-2 text-slate-600">
                <UserCheck size={18} />
              </div>

              <div>
                <span className="font-semibold text-slate-900">
                  Approval Required
                </span>

                <p className="text-sm text-slate-500">
                  Your registration is subject to host approval.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-2 font-semibold text-slate-900">
                <Hash size={18} className="text-slate-400" />
                Tickets
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={onDecrement}
                  className="rounded-md bg-slate-50 p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                >
                  <Minus size={16} />
                </button>

                <span className="w-4 text-center font-semibold">
                  {ticketCount}
                </span>

                <button
                  type="button"
                  onClick={onIncrement}
                  className="rounded-md bg-slate-50 p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <UserProfileInfo />

            <button
              type="button"
              onClick={handleRequestToJoin}
              className="mt-2 w-full rounded-xl bg-[#2C2C2C] py-3 text-sm font-bold text-white transition hover:bg-black"
            >
              Request to Join
            </button>
          </>
        ) : isFree ? (
          <>
            <p className="mt-4 text-sm text-slate-700">
              Welcome! To join the event, please register below.
            </p>

            <UserProfileInfo />

            <button
              type="button"
              disabled={loading}
              onClick={handleRegister}
              className="mt-2 w-full rounded-xl bg-[#2C2C2C] py-3 text-sm font-bold text-white transition hover:bg-black disabled:opacity-50"
            >
              {loading ? "Registering..." : "One-Click RSVP"}
            </button>
          </>
        ) : isPaidOrRegistration ? (
          <>
            <p className="mt-4 text-sm text-slate-700">
              Welcome! To join the event, please register below.
            </p>

            <UserProfileInfo />

            <button
              type="button"
              onClick={handleRegister}
              className="mt-2 w-full rounded-xl bg-[#2C2C2C] py-3 text-sm font-bold text-white transition hover:bg-black"
            >
              Register
            </button>
          </>
        ) : (
          <p className="mt-4 text-sm text-slate-700">
            This event requires registration. Please contact the organizer.
          </p>
        )}
      </div>
    </div>
  );
}
