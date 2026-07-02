// Builds the OAuth "authorize" URL that the Connect button opens in a new
// tab. This only *starts* the OAuth handshake (gets user consent + an auth
// code) — completing it (exchanging the code for a token and actually
// creating a Zoom/Meet meeting) has to happen on a backend you control,
// since it needs a client secret that can never live in frontend code.
//
// Set these in your .env file:
//   VITE_GOOGLE_MEET_OAUTH_CLIENT_ID=your-google-oauth-client-id
//   VITE_GOOGLE_MEET_OAUTH_REDIRECT_URI=https://yourapp.com/oauth/google/callback
//   VITE_ZOOM_OAUTH_CLIENT_ID=your-zoom-oauth-client-id
//   VITE_ZOOM_OAUTH_REDIRECT_URI=https://yourapp.com/oauth/zoom/callback
//
// Google: create credentials at https://console.cloud.google.com/apis/credentials
//   (OAuth client type "Web application"). Scope below covers creating Meet
//   spaces via the Meet REST API — swap it for whatever scope your backend
//   actually needs.
// Zoom: create an OAuth app at https://marketplace.zoom.us/develop/create

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_MEET_OAUTH_CLIENT_ID;
const GOOGLE_REDIRECT_URI = import.meta.env.VITE_GOOGLE_MEET_OAUTH_REDIRECT_URI;
const GOOGLE_MEET_SCOPE =
  "https://www.googleapis.com/auth/meetings.space.created";

const ZOOM_CLIENT_ID = import.meta.env.VITE_ZOOM_OAUTH_CLIENT_ID;
const ZOOM_REDIRECT_URI = import.meta.env.VITE_ZOOM_OAUTH_REDIRECT_URI;

export function getGoogleMeetAuthUrl() {
  if (!GOOGLE_CLIENT_ID || !GOOGLE_REDIRECT_URI) return null;
  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: GOOGLE_REDIRECT_URI,
    response_type: "code",
    scope: GOOGLE_MEET_SCOPE,
    access_type: "offline",
    prompt: "consent",
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

export function getZoomAuthUrl() {
  if (!ZOOM_CLIENT_ID || !ZOOM_REDIRECT_URI) return null;
  const params = new URLSearchParams({
    response_type: "code",
    client_id: ZOOM_CLIENT_ID,
    redirect_uri: ZOOM_REDIRECT_URI,
  });
  return `https://zoom.us/oauth/authorize?${params.toString()}`;
}
