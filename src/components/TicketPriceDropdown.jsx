import React, { useState } from "react";

const CURRENCIES = {
  NGN: "₦",
  USD: "$",
};

const TicketPriceDropdown = ({ value, onDone }) => {
  const [isPaid, setIsPaid] = useState(value?.isPaid || false);
  const [price, setPrice] = useState(value?.price || "");
  const [currency, setCurrency] = useState(value?.currency || "NGN");

  const handleDone = () => {
    onDone({
      isPaid,
      price: isPaid ? price : "",
      currency: isPaid ? currency : "NGN",
      formattedPrice: isPaid ? `${CURRENCIES[currency]}${price}` : "Free",
    });
  };

  return (
    <div className="w-72 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
      <p className="mb-3 text-sm font-semibold text-slate-900">Ticket Price</p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsPaid(false)}
          className={[
            "flex-1 rounded-full px-3 py-1.5 text-xs font-semibold transition",
            !isPaid
              ? "bg-indigo-600 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200",
          ].join(" ")}
        >
          Free
        </button>
        <button
          type="button"
          onClick={() => setIsPaid(true)}
          className={[
            "flex-1 rounded-full px-3 py-1.5 text-xs font-semibold transition",
            isPaid
              ? "bg-indigo-600 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200",
          ].join(" ")}
        >
          Paid
        </button>
      </div>

      {isPaid && (
        <div className="mt-4 flex gap-2">
          {/* Currency Dropdown */}
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-2 text-sm font-medium text-slate-700 focus:border-indigo-400 focus:outline-none cursor-pointer hover:bg-slate-100 transition-colors"
          >
            <option value="NGN">NGN</option>
            <option value="USD">USD</option>
          </select>

          {/* Price Input with absolute positioned symbol */}
          <div className="relative flex-1">
            <span className="absolute left-3 top-2 text-sm font-medium text-slate-500 pointer-events-none">
              {CURRENCIES[currency]}
            </span>
            <input
              autoFocus
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
              className="w-full rounded-lg border border-slate-200 py-2 pl-7 pr-3 text-sm text-slate-900 focus:border-indigo-400 focus:outline-none"
            />
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={handleDone}
        className="mt-5 w-full rounded-xl bg-slate-900 py-2 text-sm font-semibold text-white transition hover:bg-black"
      >
        Done
      </button>
    </div>
  );
};

export default TicketPriceDropdown;
