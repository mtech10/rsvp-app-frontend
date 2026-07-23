import { X } from "lucide-react";
import RegistrationCard from "./RegistrationCard";
import RegistrationStatusCard from "./RegistrationStatusCard";
import { AnimatePresence, motion } from "framer-motion";

export default function RegistrationSection({
  event,
  myRSVP,
  loading,
  ticketCount,
  onIncrement,
  onDecrement,
  onRegister,
  onCancel,
  UserProfileInfo,
  showApprovalForm,
  setShowApprovalForm,
  submitApprovalRequest,
}) {
  if (myRSVP) {
    return (
      <RegistrationStatusCard
        status={myRSVP.status}
        loading={loading}
        onCancel={onCancel}
        onJoinAgain={onRegister}
      />
    );
  }

  return (
    <>
      <RegistrationCard
        event={event}
        ticketCount={ticketCount}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onRegister={onRegister}
        loading={loading}
        UserProfileInfo={UserProfileInfo}
        setShowApprovalForm={setShowApprovalForm}
      />

      <AnimatePresence>
        {showApprovalForm && (
          <motion.div
            className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
              initial={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
            >
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-bold">Complete Registration</h3>

                <button
                  onClick={() => setShowApprovalForm(false)}
                  className="rounded-full p-2 hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={submitApprovalRequest}>
                <div className="mb-4">
                  <label className="mb-2 block text-sm font-medium">
                    Additional Information
                  </label>

                  <textarea
                    rows={3}
                    required
                    className="w-full rounded-xl border p-3"
                    placeholder="Why would you like to attend?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-black py-3 font-semibold text-white"
                >
                  Submit Request
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
