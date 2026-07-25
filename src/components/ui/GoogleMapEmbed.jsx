export default function GoogleMapEmbed({ address, className = "" }) {
  if (!address) return null;

  const query = encodeURIComponent(address);

  return (
    <div
      className={`overflow-hidden rounded-xl border border-slate-200 ${className}`}
    >
      <iframe
        title="Google Map"
        width="100%"
        height="280"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps?q=${query}&output=embed`}
      />

      <div className="border-t border-slate-200 bg-slate-50 p-3">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${query}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-indigo-600 transition hover:text-indigo-700"
        >
          Open in Google Maps →
        </a>
      </div>
    </div>
  );
}
