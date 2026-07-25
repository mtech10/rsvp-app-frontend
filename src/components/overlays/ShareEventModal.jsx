import { Share2, Mail, MessageCircle, Globe } from "lucide-react";
import ModalWrapper from "./ModalWrapper";
import QuickActionGrid from "../ui/QuickActionGrid";
import useEventActions from "../../hooks/useEventActions";

export default function ShareEventModal({ isOpen, onClose, event }) {
  const {
    eventUrl,
    copyLink,
    nativeShare,
    shareWhatsapp,
    shareEmail,
    shareLinkedIn,
  } = useEventActions(event);

  if (!isOpen) return null;

  const shareActions = [
    {
      label: "WhatsApp",
      icon: MessageCircle,
      onClick: shareWhatsapp,
    },
    {
      label: "Email",
      icon: Mail,
      onClick: shareEmail,
    },
    {
      label: "LinkedIn",
      icon: Globe,
      onClick: shareLinkedIn,
    },
    {
      label: "Share",
      icon: Share2,
      onClick: nativeShare,
    },
  ];

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Share Event"
      subtitle={`Invite people to ${event?.title}`}
    >
      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <div className="relative h-36 bg-slate-100">
          <img
            src={
              event?.coverImage ||
              "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200"
            }
            alt={event?.title}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>

        <div className="bg-white p-5">
          <h2 className="text-xl font-bold text-slate-900">{event?.title}</h2>

          <p className="mt-2 text-sm text-slate-500">{event?.formattedDate}</p>
        </div>
      </div>

      <QuickActionGrid actions={shareActions} className="justify-evenly" />

      <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
          Event Link
        </p>

        <div className="flex items-center gap-3">
          <input
            readOnly
            value={eventUrl}
            className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
          />

          <button
            onClick={copyLink}
            className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Copy
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}
