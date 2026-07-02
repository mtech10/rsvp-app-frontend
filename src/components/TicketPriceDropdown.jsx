import React, { useState } from "react";

/**
 * value: { isPaid: boolean, price: string }
 * onDone: (nextValue) => void
 */
const TicketPriceDropdown = ({ value, onDone }) => {
  const [isPaid, setIsPaid] = useState(value.isPaid);
  const [price, setPrice] = useState(value.price || "");

  const handleDone = () => {
    onDone({ isPaid, price: isPaid ? price : "" });
  };

  return (
    <div className="w-64 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
      <p className="mb-3 text-sm font-semibold text-slate-900">Ticket Price</p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsPaid(false)}
          className={[
            "flex-1 rounded-full px-3 py-1.5 text-xs font-semibold transition",
            !isPaid
              ? "bg-indigo-600 text-white"
              : "bg-slate-100 text-slate-600",
          ].join(" ")}
        >
          Free
        </button>
        <button
          type="button"
          onClick={() => setIsPaid(true)}
          className={[
            "flex-1 rounded-full px-3 py-1.5 text-xs font-semibold transition",
            isPaid ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600",
          ].join(" ")}
        >
          Paid
        </button>
      </div>

      {isPaid && (
        <input
          autoFocus
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="$0.00"
          className="mt-3 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none"
        />
      )}

      <button
        type="button"
        onClick={handleDone}
        className="mt-4 w-full rounded-xl bg-slate-900 py-2 text-sm font-semibold text-white transition hover:bg-black"
      >
        Done
      </button>
    </div>
  );
};

export default TicketPriceDropdown;
