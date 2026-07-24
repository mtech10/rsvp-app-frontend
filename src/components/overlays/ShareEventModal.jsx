import { Link2, Share2, Mail, MessageCircle, Linkedin } from "lucide-react";
import toast from "react-hot-toast";
import { DashboardActionCard, DashboardActionList } from "../dashboard";
import { AnimatePresence, motion } from "framer-motion";

export default function ShareEventModal({ isOpen, onClose, event, url }) {
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);

      toast.success("Event link copied!");
    } catch {
      toast.error("Unable to copy link.");
    }
  }

  async function handleNativeShare() {
    if (!navigator.share) {
      handleCopy();
      return;
    }

    try {
      await navigator.share({
        title: event.title,
        text: event.description,
        url,
      });
    } catch {}
  }

  function openWindow(link) {
    window.open(link, "_blank", "noopener,noreferrer");
  }

  function shareWhatsapp() {
    openWindow(`https://wa.me/?text=${encodeURIComponent(url)}`);
  }

  function shareEmail() {
    openWindow(
      `mailto:?subject=${encodeURIComponent(event.title)}&body=${encodeURIComponent(url)}`,
    );
  }

  function shareLinkedIn() {
    openWindow(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    );
  }

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
        <motion.div className="w-full max-w-md rounded-3xl bg-white shadow-2xl">
          <div className="border-b border-slate-100 p-6">
            <h2 className="text-xl font-bold text-slate-900">Share Event</h2>

            <p className="mt-2 text-sm text-slate-500">
              Invite people to
              <span className="font-medium text-slate-700">
                {" "}
                {event?.title}
              </span>
            </p>
          </div>

          <div className="p-4">
            <DashboardActionList>
              <DashboardActionCard
                icon={Link2}
                title="Copy Link"
                description="Copy the event URL."
                onClick={handleCopy}
              />

              <DashboardActionCard
                icon={Share2}
                title="Share"
                description="Use your device's share menu."
                onClick={handleNativeShare}
              />

              <DashboardActionCard
                icon={MessageCircle}
                title="WhatsApp"
                description="Share with your contacts."
                onClick={shareWhatsapp}
              />

              <DashboardActionCard
                icon={Mail}
                title="Email"
                description="Send by email."
                onClick={shareEmail}
              />

              <DashboardActionCard
                icon={Linkedin}
                title="LinkedIn"
                description="Share professionally."
                onClick={shareLinkedIn}
              />
            </DashboardActionList>
          </div>

          <div className="border-t border-slate-100 p-4">
            <button
              onClick={onClose}
              className="w-full rounded-xl bg-slate-100 py-3 font-medium transition hover:bg-slate-200"
            >
              Close
            </button>
          </div>
          {/* Share Actions */}

          {/* Footer */}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
