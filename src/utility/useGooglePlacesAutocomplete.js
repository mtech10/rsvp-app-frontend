import { useEffect, useMemo, useRef, useState } from "react";
import { loadGoogleMaps, GoogleMapsConfigError } from "../utility/googleMaps";

const DEBOUNCE_MS = 250;

export function useGooglePlacesAutocomplete(query) {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMapsLoaded, setIsMapsLoaded] = useState(false);

  const sessionTokenRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    loadGoogleMaps()
      .then((google) => {
        if (cancelled) return;
        setIsMapsLoaded(true);
        sessionTokenRef.current =
          new google.maps.places.AutocompleteSessionToken();
      })
      .catch((err) => {
        if (cancelled) return;
        setError(
          err instanceof GoogleMapsConfigError
            ? err.message
            : "Couldn't load location search.",
        );
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    clearTimeout(debounceRef.current);

    if (!query.trim() || !isMapsLoaded) {
      setPredictions([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const request = {
          input: query,
          sessionToken: sessionTokenRef.current,
        };

        const { suggestions } =
          await window.google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(
            request,
          );

        const formattedResults = (suggestions || []).map((s) => ({
          placeId: s.placePrediction.placeId,
          description: s.placePrediction.text.text,
          mainText: s.placePrediction.mainText?.text,
          secondaryText: s.placePrediction.secondaryText?.text,
        }));

        setPredictions(formattedResults);
      } catch (err) {
        console.error("Autocomplete API Error:", err);
        setPredictions([]);
      } finally {
        setLoading(false);
      }
    }, DEBOUNCE_MS);

    return () => clearTimeout(debounceRef.current);
  }, [query, isMapsLoaded]);

  const getPlaceDetails = useMemo(
    () => async (placeId) => {
      if (!isMapsLoaded || !window.google) {
        throw new Error("Google Maps not ready");
      }

      try {
        const place = new window.google.maps.places.Place({
          id: placeId,
        });

        await place.fetchFields({
          fields: ["displayName", "formattedAddress", "location"],
        });

        sessionTokenRef.current =
          new window.google.maps.places.AutocompleteSessionToken();

        return {
          name: place.displayName,
          address: place.formattedAddress,
          lat: place.location?.lat(),
          lng: place.location?.lng(),
        };
      } catch (err) {
        console.error("Place Details API Error:", err);
        throw new Error("Couldn't load that location");
      }
    },
    [isMapsLoaded],
  );

  return { predictions, loading, error, getPlaceDetails };
}
