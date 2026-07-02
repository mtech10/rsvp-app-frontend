const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export class GoogleMapsConfigError extends Error {}

let loadPromise = null;

export function loadGoogleMaps() {
  if (loadPromise) return loadPromise;

  if (!API_KEY) {
    return Promise.reject(
      new GoogleMapsConfigError(
        "Google Maps isn't configured. Set VITE_GOOGLE_MAPS_API_KEY in your .env file.",
      ),
    );
  }

  if (window.google?.maps?.places) {
    loadPromise = Promise.resolve(window.google);
    return loadPromise;
  }

  loadPromise = new Promise((resolve, reject) => {
    const callbackName = `__initGoogleMaps_${Date.now()}`;

    window[callbackName] = () => {
      resolve(window.google);
      delete window[callbackName];
    };

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&callback=${callbackName}`;
    script.async = true;
    script.defer = true;

    script.onerror = () =>
      reject(new Error("Failed to load Google Maps script."));

    document.head.appendChild(script);
  });

  return loadPromise;
}
