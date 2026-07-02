export const TIMEZONES = [
  {
    id: "Pacific/Honolulu",
    label: "Hawaii Time - Honolulu",
    offsetMinutes: -600,
    popular: false,
  },
  {
    id: "America/Anchorage",
    label: "Alaska Time - Anchorage",
    offsetMinutes: -540,
    popular: false,
  },
  {
    id: "America/Los_Angeles",
    label: "Pacific Time - Los Angeles",
    offsetMinutes: -420,
    popular: true,
  },
  {
    id: "America/Denver",
    label: "Mountain Time - Denver",
    offsetMinutes: -360,
    popular: false,
  },
  {
    id: "America/Phoenix",
    label: "Mountain Time - Phoenix",
    offsetMinutes: -420,
    popular: false,
  },
  {
    id: "America/Chicago",
    label: "Central Time - Chicago",
    offsetMinutes: -300,
    popular: true,
  },
  {
    id: "America/Mexico_City",
    label: "Central Time - Mexico City",
    offsetMinutes: -360,
    popular: false,
  },
  {
    id: "America/Toronto",
    label: "Eastern Time - Toronto",
    offsetMinutes: -240,
    popular: true,
  },
  {
    id: "America/New_York",
    label: "Eastern Time - New York",
    offsetMinutes: -240,
    popular: true,
  },
  {
    id: "America/Halifax",
    label: "Atlantic Time - Halifax",
    offsetMinutes: -180,
    popular: false,
  },
  {
    id: "America/Sao_Paulo",
    label: "Brasilia Standard Time - Sao Paulo",
    offsetMinutes: -180,
    popular: true,
  },
  {
    id: "America/Argentina/Buenos_Aires",
    label: "Argentina Time - Buenos Aires",
    offsetMinutes: -180,
    popular: false,
  },
  {
    id: "Atlantic/Azores",
    label: "Azores Time - Ponta Delgada",
    offsetMinutes: -60,
    popular: false,
  },
  {
    id: "Europe/London",
    label: "United Kingdom Time - London",
    offsetMinutes: 60,
    popular: true,
  },
  {
    id: "Europe/Lisbon",
    label: "Western European Time - Lisbon",
    offsetMinutes: 0,
    popular: false,
  },
  {
    id: "Africa/Casablanca",
    label: "Morocco Time - Casablanca",
    offsetMinutes: 60,
    popular: false,
  },
  {
    id: "Europe/Paris",
    label: "Central European Time - Paris",
    offsetMinutes: 120,
    popular: false,
  },
  {
    id: "Europe/Madrid",
    label: "Central European Time - Madrid",
    offsetMinutes: 120,
    popular: true,
  },
  {
    id: "Europe/Berlin",
    label: "Central European Time - Berlin",
    offsetMinutes: 120,
    popular: false,
  },
  {
    id: "Africa/Lagos",
    label: "West Africa Time - Lagos",
    offsetMinutes: 60,
    popular: true,
  },
  {
    id: "Africa/Johannesburg",
    label: "South Africa Time - Johannesburg",
    offsetMinutes: 120,
    popular: false,
  },
  {
    id: "Africa/Cairo",
    label: "Eastern European Time - Cairo",
    offsetMinutes: 120,
    popular: false,
  },
  {
    id: "Europe/Athens",
    label: "Eastern European Time - Athens",
    offsetMinutes: 180,
    popular: false,
  },
  {
    id: "Europe/Istanbul",
    label: "Turkey Time - Istanbul",
    offsetMinutes: 180,
    popular: false,
  },
  {
    id: "Europe/Moscow",
    label: "Moscow Time - Moscow",
    offsetMinutes: 180,
    popular: false,
  },
  {
    id: "Asia/Dubai",
    label: "Gulf Standard Time - Dubai",
    offsetMinutes: 240,
    popular: false,
  },
  {
    id: "Asia/Karachi",
    label: "Pakistan Time - Karachi",
    offsetMinutes: 300,
    popular: false,
  },
  {
    id: "Asia/Kolkata",
    label: "India Time - Mumbai",
    offsetMinutes: 330,
    popular: true,
  },
  {
    id: "Asia/Dhaka",
    label: "Bangladesh Time - Dhaka",
    offsetMinutes: 360,
    popular: false,
  },
  {
    id: "Asia/Bangkok",
    label: "Indochina Time - Bangkok",
    offsetMinutes: 420,
    popular: false,
  },
  {
    id: "Asia/Jakarta",
    label: "Western Indonesia Time - Jakarta",
    offsetMinutes: 420,
    popular: false,
  },
  {
    id: "Asia/Singapore",
    label: "Singapore Time - Singapore",
    offsetMinutes: 480,
    popular: true,
  },
  {
    id: "Asia/Shanghai",
    label: "China Standard Time - Shanghai",
    offsetMinutes: 480,
    popular: false,
  },
  {
    id: "Asia/Hong_Kong",
    label: "Hong Kong Time - Hong Kong",
    offsetMinutes: 480,
    popular: false,
  },
  {
    id: "Asia/Tokyo",
    label: "Japan Standard Time - Tokyo",
    offsetMinutes: 540,
    popular: true,
  },
  {
    id: "Asia/Seoul",
    label: "Korea Standard Time - Seoul",
    offsetMinutes: 540,
    popular: false,
  },
  {
    id: "Australia/Perth",
    label: "Australian Western Time - Perth",
    offsetMinutes: 480,
    popular: false,
  },
  {
    id: "Australia/Sydney",
    label: "Australian Eastern Time - Sydney",
    offsetMinutes: 660,
    popular: true,
  },
  {
    id: "Pacific/Auckland",
    label: "New Zealand Time - Auckland",
    offsetMinutes: 780,
    popular: false,
  },
];

export function formatGmtOffset(offsetMinutes) {
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const abs = Math.abs(offsetMinutes);
  const hours = String(Math.floor(abs / 60)).padStart(2, "0");
  const minutes = String(abs % 60).padStart(2, "0");
  return `GMT${sign}${hours}:${minutes}`;
}

export function getDeviceTimezone() {
  try {
    const tzId = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const match = TIMEZONES.find((tz) => tz.id === tzId);
    if (match) return match;
  } catch {}
  return TIMEZONES.find((tz) => tz.id === "Africa/Lagos") || TIMEZONES[0];
}
