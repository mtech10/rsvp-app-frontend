import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function useEventActions(event) {
  const navigate = useNavigate();

  const eventUrl = `${window.location.origin}/events/${event?._id}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(eventUrl);
      toast.success("Event link copied!");
    } catch {
      toast.error("Unable to copy event link.");
    }
  }

  function openPublicPage() {
    navigate(`/events/${event._id}`);
  }

  async function nativeShare() {
    if (!navigator.share) {
      return copyLink();
    }

    try {
      await navigator.share({
        title: event.title,
        text: event.description,
        url: eventUrl,
      });
    } catch {}
  }

  function shareWhatsapp() {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(eventUrl)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  function shareEmail() {
    window.open(
      `mailto:?subject=${encodeURIComponent(
        event.title,
      )}&body=${encodeURIComponent(eventUrl)}`,
    );
  }

  function shareLinkedIn() {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        eventUrl,
      )}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return {
    eventUrl,
    copyLink,
    nativeShare,
    shareWhatsapp,
    shareEmail,
    shareLinkedIn,
    openPublicPage,
  };
}
