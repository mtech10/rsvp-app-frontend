import Papa from "papaparse";

export function exportGuestsToCSV(event, guests) {
  const data = guests.map((guest) => ({
    Name: guest.user?.name,
    Email: guest.user?.email,
    Status: guest.status,
    Tickets: guest.tickets,
    "Registered At": new Date(guest.createdAt).toLocaleString(),
  }));

  const csv = Papa.unparse(data);

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = `${event.title}-guests.csv`;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}
