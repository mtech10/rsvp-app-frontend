import React from "react";
import { Video } from "lucide-react";
import CenterModal from "./CenterModal";
import { getGoogleMeetAuthUrl, getZoomAuthUrl } from "../utility/oauthUrls";

const PROVIDER_COPY = {
  zoom: {
    title: "Connect Zoom",
    description:
      "To let this app create Zoom meetings automatically, please connect your Zoom account with Zoom Meeting authorization.",
    buttonLabel: "Connect Zoom Account",
    getAuthUrl: getZoomAuthUrl,
  },
  google_meet: {
    title: "Connect Google Meet",
    description:
      "To let this app create Google Meet links automatically, please connect your Google account with Google Meet authorization.",
    buttonLabel: "Connect Google Account",
    getAuthUrl: getGoogleMeetAuthUrl,
  },
};

/**
 * provider: "zoom" | "google_meet" | null (null = closed)
 */
const ConnectMeetingModal = ({ provider, onClose }) => {
  const copy = provider ? PROVIDER_COPY[provider] : null;
  const authUrl = copy?.getAuthUrl();

  return (
    <CenterModal open={Boolean(provider)} onClose={onClose}>
      {copy && (
        <div className="flex flex-col items-center text-center">
          <div className="mb-1 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
            <Video size={24} className="text-slate-500" />
          </div>
          <h3 className="mt-3 text-lg font-bold text-slate-900">
            {copy.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            {copy.description}
          </p>

          <a
            href={authUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (!authUrl) {
                e.preventDefault();
                console.warn(
                  `No OAuth client configured for ${provider}. Set the VITE_${provider === "zoom" ? "ZOOM" : "GOOGLE_MEET"}_OAUTH_CLIENT_ID / _REDIRECT_URI env vars (see utility/oauthUrls.js).`,
                );
                return;
              }
              onClose();
            }}
            className="mt-5 w-full rounded-xl bg-indigo-600 py-3 text-center text-sm font-bold text-white transition hover:bg-indigo-700"
          >
            {copy.buttonLabel}
          </a>

          {!authUrl && (
            <p className="mt-2 text-xs text-amber-600">
              OAuth isn't configured yet for this provider — see the comment in
              utility/oauthUrls.js.
            </p>
          )}
        </div>
      )}
    </CenterModal>
  );
};

export default ConnectMeetingModal;
