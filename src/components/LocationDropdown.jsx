import React, { useState } from "react";
import { MapPin, Video, Info, Loader2 } from "lucide-react";
import { useGooglePlacesAutocomplete } from "../utility/useGooglePlacesAutocomplete";

const RECENTS_KEY = "recentEventLocations";
const MAX_RECENTS = 5;

function readRecents() {
  try {
    return JSON.parse(localStorage.getItem(RECENTS_KEY)) || [];
  } catch {
    return [];
  }
}

function saveRecent(location) {
  const current = readRecents().filter((l) => l.name !== location.name);
  const next = [location, ...current].slice(0, MAX_RECENTS);
  localStorage.setItem(RECENTS_KEY, JSON.stringify(next));
}

const LocationDropdown = ({ onSelectLocation, onSelectVirtual }) => {
  const [query, setQuery] = useState("");
  const [recents] = useState(readRecents);
  const { predictions, loading, error, getPlaceDetails } =
    useGooglePlacesAutocomplete(query);

  const handlePick = async (prediction) => {
    try {
      const details = await getPlaceDetails(prediction.placeId);
      const location = {
        name: details.name || prediction.mainText || prediction.description,
        address: details.address,
        lat: details.lat,
        lng: details.lng,
        placeId: prediction.placeId,
      };
      saveRecent(location);
      onSelectLocation(location);
    } catch {
      const location = {
        name: prediction.mainText || prediction.description,
        address: prediction.secondaryText || null,
      };
      onSelectLocation(location);
    }
  };

  const showRecents = !query.trim() && recents.length > 0;

  return (
    <div className="w-96 rounded-2xl border border-slate-200 bg-white shadow-xl">
      <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-3">
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter location or virtual link"
          className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
        />
        {loading && (
          <Loader2 size={14} className="shrink-0 animate-spin text-slate-400" />
        )}
      </div>

      <div className="max-h-80 overflow-y-auto p-2">
        {error && <p className="px-2 py-3 text-xs text-rose-600">{error}</p>}

        {showRecents && (
          <>
            <p className="px-2 pb-1 pt-2 text-xs font-medium text-slate-400">
              Recent Locations
            </p>
            {recents.map((loc) => (
              <button
                type="button"
                key={loc.placeId || loc.name}
                onClick={() => onSelectLocation(loc)}
                className="flex w-full items-start gap-2 rounded-lg px-2 py-2.5 text-left transition hover:bg-slate-50"
              >
                <MapPin size={16} className="mt-0.5 shrink-0 text-slate-400" />
                <span className="flex flex-col">
                  <span className="text-sm font-medium text-slate-900">
                    {loc.name}
                  </span>
                  {loc.address && (
                    <span className="text-xs text-slate-500">
                      {loc.address}
                    </span>
                  )}
                </span>
              </button>
            ))}
          </>
        )}

        {query.trim() && !error && (
          <>
            <p className="px-2 pb-1 pt-2 text-xs font-medium text-slate-400">
              Search Results
            </p>
            {predictions.length === 0 && !loading && (
              <p className="px-2 py-3 text-sm text-slate-400">
                No locations found
              </p>
            )}
            {predictions.map((prediction) => (
              <button
                type="button"
                key={prediction.placeId}
                onClick={() => handlePick(prediction)}
                className="flex w-full items-start gap-2 rounded-lg px-2 py-2.5 text-left transition hover:bg-slate-50"
              >
                <MapPin size={16} className="mt-0.5 shrink-0 text-slate-400" />
                <span className="flex flex-col">
                  <span className="text-sm font-medium text-slate-900">
                    {prediction.mainText || prediction.description}
                  </span>
                  {prediction.secondaryText && (
                    <span className="text-xs text-slate-500">
                      {prediction.secondaryText}
                    </span>
                  )}
                </span>
              </button>
            ))}
          </>
        )}

        <p className="px-2 pb-1 pt-3 text-xs font-medium text-slate-400">
          Virtual Options
        </p>
        <button
          type="button"
          onClick={() => onSelectVirtual("zoom")}
          className="flex w-full items-center gap-2 rounded-lg px-2 py-2.5 text-left text-sm text-slate-700 transition hover:bg-slate-50"
        >
          <Video size={16} className="text-slate-400" />
          Create Zoom meeting
        </button>
        <button
          type="button"
          onClick={() => onSelectVirtual("google_meet")}
          className="flex w-full items-center gap-2 rounded-lg px-2 py-2.5 text-left text-sm text-slate-700 transition hover:bg-slate-50"
        >
          <Video size={16} className="text-slate-400" />
          Create Google Meet
        </button>

        <div className="mt-2 flex items-start gap-2 rounded-lg bg-slate-50 px-3 py-2.5">
          <Info size={14} className="mt-0.5 shrink-0 text-slate-400" />
          <p className="text-xs text-slate-500">
            If you have a virtual event link, you can enter or paste it above.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LocationDropdown;
