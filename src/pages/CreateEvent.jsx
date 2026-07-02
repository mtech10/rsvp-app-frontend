// import React, { useRef, useState } from "react";
// import {
//   Image as ImageIcon,
//   Camera,
//   Globe,
//   MapPin,
//   AlignLeft,
//   Ticket,
//   UserCheck,
//   Users,
//   Pencil,
//   ChevronDown,
//   Shuffle,
//   Loader2,
// } from "lucide-react";

// import Popover from "../components/Popover";
// import DateCalendarPopover from "../components/DateCalendarPopover";
// import TimeDropdown from "../components/TimeDropdown";
// import TimezoneDropdown from "../components/TimezoneDropdown";
// import LocationDropdown from "../components/LocationDropdown";
// import VisibilityDropdown from "../components/VisibilityDropdown";
// import TicketPriceDropdown from "../components/TicketPriceDropdown";
// import CapacityDropdown from "../components/CapacityDropdown";
// import DescriptionDropdown from "../components/DescriptionDropdown";
// import { formatShortWeekdayMonthDay } from "../utility/calendarUtils";
// import { getDeviceTimezone, formatGmtOffset } from "../utility/timezones";
// import ConnectMeetingModal from "../components/ConnectMeetingModal";
// import {
//   uploadImageToCloudinary,
//   CloudinaryConfigError,
// } from "../utility/cloudinaryUpload";
// import CenterModal from "../components/CenterModal";

// const THEMES = ["Minimal", "Vibrant", "Elegant", "Bold"];

// function getCityFromLabel(label) {
//   const parts = label.split(" - ");
//   return parts[parts.length - 1];
// }

// // Small pill trigger shared by the date/time fields inside the Start/End rows.
// const FieldPill = ({ open, onClick, children }) => (
//   <button
//     type="button"
//     onClick={onClick}
//     className={[
//       "rounded-lg px-2 py-1 text-left text-sm font-medium text-slate-800 transition",
//       open ? "bg-slate-200/70" : "hover:bg-slate-200/50",
//     ].join(" ")}
//   >
//     {children}
//   </button>
// );

// const DateTimeRow = ({
//   label,
//   dotFilled,
//   date,
//   time,
//   minDate,
//   onChangeDate,
//   onChangeTime,
// }) => (
//   <div className="flex items-center gap-3 px-4 py-2">
//     <span className="relative z-10 flex h-4 w-4 shrink-0 items-center justify-center">
//       <span
//         className={[
//           "h-2.5 w-2.5 rounded-full",
//           dotFilled ? "bg-indigo-600" : "border-2 border-slate-400 bg-white",
//         ].join(" ")}
//       />
//     </span>
//     <span className="w-10 shrink-0 text-sm text-slate-500">{label}</span>

//     <Popover
//       className="flex-1"
//       trigger={({ open, toggle }) => (
//         <FieldPill open={open} onClick={toggle}>
//           {formatShortWeekdayMonthDay(date)}
//         </FieldPill>
//       )}
//     >
//       {(close) => (
//         <DateCalendarPopover
//           value={date}
//           minDate={minDate}
//           onSelect={(d) => {
//             onChangeDate(d);
//             close();
//           }}
//         />
//       )}
//     </Popover>

//     <Popover
//       align="right"
//       trigger={({ open, toggle }) => (
//         <FieldPill open={open} onClick={toggle}>
//           {time}
//         </FieldPill>
//       )}
//     >
//       {(close) => (
//         <TimeDropdown
//           value={time}
//           onSelect={(t) => {
//             onChangeTime(t);
//             close();
//           }}
//         />
//       )}
//     </Popover>
//   </div>
// );

// const CreateEventPage = ({ onCreateEvent }) => {
//   const fileInputRef = useRef(null);

//   // --- Cover image / Cloudinary upload ---
//   const [imagePreview, setImagePreview] = useState(null);
//   const [imageUrl, setImageUrl] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState(null); // null = idle
//   const [uploadError, setUploadError] = useState(null);

//   // --- Core fields ---
//   const [eventName, setEventName] = useState("");
//   const [theme, setTheme] = useState("Minimal");

//   const [startDate, setStartDate] = useState(() => new Date());
//   const [endDate, setEndDate] = useState(() => new Date());
//   const [startTime, setStartTime] = useState("12:00");
//   const [endTime, setEndTime] = useState("13:00");
//   const [timezone, setTimezone] = useState(getDeviceTimezone());

//   const [location, setLocation] = useState(null); // { name, address }
//   const [description, setDescription] = useState("");

//   const [visibility, setVisibility] = useState("public"); // "public" | "private"
//   const [ticket, setTicket] = useState({ isPaid: false, price: "" });
//   const [requireApproval, setRequireApproval] = useState(false);
//   const [capacity, setCapacity] = useState(null); // null = Unlimited

//   const [descriptionModalOpen, setDescriptionModalOpen] = useState(false);
//   const [ticketModalOpen, setTicketModalOpen] = useState(false);
//   const [capacityModalOpen, setCapacityModalOpen] = useState(false);
//   const [connectProvider, setConnectProvider] = useState(null); // "zoom" | "google_meet" | null

//   const [submitting, setSubmitting] = useState(false);
//   const [connectProvider, setConnectProvider] = useState(null); // "zoom" | "google_meet" | null
//   const handlePickImage = () => fileInputRef.current?.click();

//   const handleImageChange = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setImagePreview(URL.createObjectURL(file));
//     setUploadError(null);
//     setUploadProgress(0);

//     try {
//       const { url } = await uploadImageToCloudinary(file, setUploadProgress);
//       setImageUrl(url);
//     } catch (err) {
//       const message =
//         err instanceof CloudinaryConfigError
//           ? err.message
//           : "Couldn't upload that image. Try again.";
//       setUploadError(message);
//     } finally {
//       setUploadProgress(null);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!eventName.trim()) return;

//     setSubmitting(true);
//     try {
//       await onCreateEvent?.({
//         name: eventName.trim(),
//         coverUrl: imageUrl,
//         theme,
//         startDate,
//         endDate,
//         startTime,
//         endTime,
//         timezone: timezone.id,
//         location,
//         description,
//         visibility,
//         ticketPrice: ticket.isPaid ? ticket.price : "Free",
//         requireApproval,
//         capacity,
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <section className="mx-auto max-w-4xl px-6 py-10">
//       <form onSubmit={handleSubmit}>
//         {/* Top pills */}
//         <div className="mb-4 flex items-center justify-between">
//           <button
//             type="button"
//             className="flex items-center gap-2 rounded-full bg-white/70 px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-white"
//           >
//             <span className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-100 text-[10px]">
//               📅
//             </span>
//             Personal Calendar
//             <ChevronDown size={14} className="text-slate-400" />
//           </button>

//           <Popover
//             align="right"
//             trigger={({ open, toggle }) => (
//               <button
//                 type="button"
//                 onClick={toggle}
//                 className="flex items-center gap-2 rounded-full bg-white/70 px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-white"
//               >
//                 <Globe size={14} className="text-slate-400" />
//                 {visibility === "public" ? "Public" : "Private"}
//                 <ChevronDown
//                   size={14}
//                   className={`text-slate-400 transition ${open ? "rotate-180" : ""}`}
//                 />
//               </button>
//             )}
//           >
//             {(close) => (
//               <VisibilityDropdown
//                 value={visibility}
//                 onSelect={(v) => {
//                   setVisibility(v);
//                   close();
//                 }}
//               />
//             )}
//           </Popover>
//         </div>

//         <div className="flex flex-col gap-8 sm:flex-row">
//           {/* Left column: cover image + theme */}
//           <div className="w-full shrink-0 sm:w-72">
//             <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl bg-slate-900">
//               {imagePreview ? (
//                 <img
//                   src={imagePreview}
//                   alt="Event cover preview"
//                   className="h-full w-full object-cover"
//                 />
//               ) : (
//                 <ImageIcon size={40} className="text-slate-600" />
//               )}

//               {uploadProgress !== null && (
//                 <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-slate-900/60">
//                   <Loader2 size={22} className="animate-spin text-white" />
//                   <span className="text-xs font-medium text-white">
//                     Uploading… {uploadProgress}%
//                   </span>
//                 </div>
//               )}

//               <button
//                 type="button"
//                 onClick={handlePickImage}
//                 className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-slate-900 text-white shadow-lg transition hover:bg-slate-800"
//                 aria-label="Add event image"
//               >
//                 <Camera size={16} />
//               </button>

//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="hidden"
//               />
//             </div>

//             {uploadError && (
//               <p className="mt-2 text-xs text-rose-600">{uploadError}</p>
//             )}

//             {/* <div className="mt-3 flex items-center gap-2">
//               <Popover
//                 className="flex-1"
//                 trigger={({ open, toggle }) => (
//                   <button
//                     type="button"
//                     onClick={toggle}
//                     className="flex w-full items-center justify-between rounded-xl bg-white/70 px-3 py-2 text-left shadow-sm transition hover:bg-white"
//                   >
//                     <span className="flex flex-col">
//                       <span className="text-xs text-slate-500">Theme</span>
//                       <span className="text-sm font-semibold text-slate-900">
//                         {theme}
//                       </span>
//                     </span>
//                     <ChevronDown
//                       size={16}
//                       className={`text-slate-400 transition ${open ? "rotate-180" : ""}`}
//                     />
//                   </button>
//                 )}
//               >
//                 {(close) => (
//                   <div className="w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
//                     {THEMES.map((t) => (
//                       <button
//                         type="button"
//                         key={t}
//                         onClick={() => {
//                           setTheme(t);
//                           close();
//                         }}
//                         className={[
//                           "block w-full rounded-lg px-3 py-2 text-left text-sm transition",
//                           t === theme
//                             ? "bg-indigo-600 font-semibold text-white"
//                             : "text-slate-700 hover:bg-slate-100",
//                         ].join(" ")}
//                       >
//                         {t}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </Popover>

//               <button
//                 type="button"
//                 onClick={() =>
//                   setTheme(THEMES[Math.floor(Math.random() * THEMES.length)])
//                 }
//                 className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/70 text-slate-500 shadow-sm transition hover:bg-white"
//                 aria-label="Shuffle theme"
//               >
//                 <Shuffle size={16} />
//               </button>
//             </div> */}
//           </div>

//           {/* Right column: form fields */}
//           <div className="min-w-0 flex-1">
//             <input
//               value={eventName}
//               onChange={(e) => setEventName(e.target.value)}
//               placeholder="Event Name"
//               className="w-full border-none bg-transparent font-serif text-4xl text-slate-800 placeholder:text-slate-400 focus:outline-none"
//             />

//             {/* Start / End + timezone */}
//             <div className="mt-6 flex flex-col md:flex-row gap-2">
//               <div className="relative flex-1 divide-y divide-slate-200/70 rounded-2xl border border-slate-200/70 bg-white/60 md:flex-col">
//                 <div className="absolute left-[26px] top-6 bottom-6 w-px bg-slate-300" />
//                 <DateTimeRow
//                   label="Start"
//                   dotFilled
//                   date={startDate}
//                   time={startTime}
//                   onChangeDate={setStartDate}
//                   onChangeTime={setStartTime}
//                 />
//                 <DateTimeRow
//                   label="End"
//                   dotFilled={false}
//                   date={endDate}
//                   time={endTime}
//                   minDate={startDate}
//                   onChangeDate={setEndDate}
//                   onChangeTime={setEndTime}
//                 />
//               </div>

//               <Popover
//                 align="right"
//                 trigger={({ open, toggle }) => (
//                   <button
//                     type="button"
//                     onClick={toggle}
//                     className={[
//                       "flex w-full lg:w-32 shrink-0 flex-row md:flex-col items-start lg:justify-center gap-2 rounded-2xl border border-slate-200/70 px-3 py-4 text-left transition",
//                       open ? "bg-white" : "bg-white/60 hover:bg-white",
//                     ].join(" ")}
//                   >
//                     <Globe size={16} className="text-slate-400" />
//                     <span className="text-xs font-medium text-slate-800">
//                       {formatGmtOffset(timezone.offsetMinutes)}
//                     </span>
//                     <span className="text-xs text-slate-500">
//                       {getCityFromLabel(timezone.label)}
//                     </span>
//                   </button>
//                 )}
//               >
//                 {(close) => (
//                   <TimezoneDropdown
//                     value={timezone}
//                     onSelect={(tz) => {
//                       setTimezone(tz);
//                       close();
//                     }}
//                   />
//                 )}
//               </Popover>
//             </div>

//             {/* Location */}
//             <Popover
//               className="mt-3 block"
//               trigger={({ toggle }) => (
//                 <button
//                   type="button"
//                   onClick={toggle}
//                   className="flex w-full items-start gap-3 rounded-2xl bg-indigo-100/60 px-4 py-3 text-left transition hover:bg-indigo-100"
//                 >
//                   <MapPin
//                     size={18}
//                     className="mt-0.5 shrink-0 text-slate-600"
//                   />
//                   <span className="flex flex-col">
//                     <span className="text-sm font-semibold text-slate-900">
//                       {location ? location.name : "Add Event Location"}
//                     </span>
//                     <span className="text-xs text-slate-500">
//                       {location?.address || "Offline location or virtual link"}
//                     </span>
//                   </span>
//                 </button>
//               )}
//             >
//               {(close) => (
//                 <LocationDropdown
//                   onSelectLocation={(loc) => {
//                     setLocation(loc);
//                     close();
//                   }}
//                   onSelectVirtual={(kind) => {
//                     setLocation({
//                       name: kind === "zoom" ? "Zoom Meeting" : "Google Meet",
//                       address: "Link generated after you create the event",
//                     });
//                     close();
//                   }}
//                   onSelectVirtual={(kind) => {
//                     close();
//                     setConnectProvider(kind);
//                   }}
//                 />
//               )}
//             </Popover>

//             {/* Description */}
//             <button
//               type="button"
//               onClick={() => setDescriptionModalOpen(true)}
//               className="mt-3 flex w-full items-center gap-3 rounded-2xl bg-slate-100/60 px-4 py-3 text-left transition hover:bg-slate-100"
//             >
//               <AlignLeft size={18} className="shrink-0 text-slate-500" />
//               <span className="text-sm font-medium text-slate-700">
//                 {description.trim() ? description : "Add Description"}
//               </span>
//             </button>

//             <CenterModal
//               open={descriptionModalOpen}
//               onClose={() => setDescriptionModalOpen(false)}
//             >
//               <DescriptionDropdown
//                 value={description}
//                 onDone={(next) => {
//                   setDescription(next);
//                   setDescriptionModalOpen(false);
//                 }}
//               />
//             </CenterModal>

//             {/* Event Options */}
//             <p className="mb-2 mt-6 text-sm font-semibold text-slate-800">
//               Event Options
//             </p>
//             <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white">
//               {/* Ticket price */}
//               <button
//                 type="button"
//                 onClick={() => setTicketModalOpen(true)}
//                 className="flex w-full items-center justify-between px-4 py-3 text-left transition hover:bg-slate-50"
//               >
//                 <span className="flex items-center gap-2 text-sm font-medium text-slate-800">
//                   <Ticket size={16} className="text-slate-400" />
//                   Ticket Price
//                 </span>
//                 <span className="flex items-center gap-1.5 text-sm text-slate-500">
//                   {ticket.isPaid ? ticket.price || "Set price" : "Free"}
//                   <Pencil size={13} />
//                 </span>
//               </button>

//               <CenterModal
//                 open={ticketModalOpen}
//                 onClose={() => setTicketModalOpen(false)}
//               >
//                 <TicketPriceDropdown
//                   value={ticket}
//                   onDone={(next) => {
//                     setTicket(next);
//                     setTicketModalOpen(false);
//                   }}
//                 />
//               </CenterModal>

//               {/* Require approval */}
//               <div className="flex items-center justify-between px-4 py-3">
//                 <span className="flex items-center gap-2 text-sm font-medium text-slate-800">
//                   <UserCheck size={16} className="text-slate-400" />
//                   Require Approval
//                 </span>
//                 <button
//                   type="button"
//                   role="switch"
//                   aria-checked={requireApproval}
//                   onClick={() => setRequireApproval((v) => !v)}
//                   className={[
//                     "relative h-6 w-11 rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
//                     requireApproval ? "bg-indigo-600" : "bg-slate-300",
//                   ].join(" ")}
//                 >
//                   <span
//                     className={[
//                       "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ease-in-out",
//                       requireApproval ? "translate-x-5" : "translate-x-0",
//                     ].join(" ")}
//                   />
//                 </button>
//               </div>

//               {/* Capacity */}
//               {/* Capacity */}
//               <button
//                 type="button"
//                 onClick={() => setCapacityModalOpen(true)}
//                 className="flex w-full items-center justify-between px-4 py-3 text-left transition hover:bg-slate-50"
//               >
//                 <span className="flex items-center gap-2 text-sm font-medium text-slate-800">
//                   <Users size={16} className="text-slate-400" />
//                   Capacity
//                 </span>
//                 <span className="flex items-center gap-1.5 text-sm text-slate-500">
//                   {capacity ? capacity : "Unlimited"}
//                   <Pencil size={13} />
//                 </span>
//               </button>

//               <CenterModal
//                 open={capacityModalOpen}
//                 onClose={() => setCapacityModalOpen(false)}
//               >
//                 <CapacityDropdown
//                   value={capacity}
//                   onDone={(next) => {
//                     setCapacity(next);
//                     setCapacityModalOpen(false);
//                   }}
//                 />
//               </CenterModal>
//             </div>

//             <button
//               type="submit"
//               disabled={submitting || !eventName.trim()}
//               className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               {submitting && <Loader2 size={16} className="animate-spin" />}
//               Create Event
//             </button>
//           </div>
//         </div>
//       </form>
//       <ConnectMeetingModal
//         provider={connectProvider}
//         onClose={() => setConnectProvider(null)}
//       />
//     </section>
//   );
// };

// export default CreateEventPage;

import React, { useRef, useState } from "react";
import {
  Image as ImageIcon,
  Camera,
  Globe,
  MapPin,
  AlignLeft,
  Ticket,
  UserCheck,
  Users,
  Pencil,
  ChevronDown,
  Shuffle,
  Loader2,
} from "lucide-react";

import Popover from "../components/Popover";
import DateCalendarPopover from "../components/DateCalendarPopover";
import TimeDropdown from "../components/TimeDropdown";
import TimezoneDropdown from "../components/TimezoneDropdown";
import LocationDropdown from "../components/LocationDropdown";
import VisibilityDropdown from "../components/VisibilityDropdown";
import TicketPriceDropdown from "../components/TicketPriceDropdown";
import CapacityDropdown from "../components/CapacityDropdown";
import DescriptionDropdown from "../components/DescriptionDropdown";
import { formatShortWeekdayMonthDay } from "../utility/calendarUtils";
import { getDeviceTimezone, formatGmtOffset } from "../utility/timezones";
import {
  uploadImageToCloudinary,
  CloudinaryConfigError,
} from "../utility/cloudinaryUpload";
import CenterModal from "../components/CenterModal";
import ConnectMeetingModal from "../components/ConnectMeetingModal";

const THEMES = ["Minimal", "Vibrant", "Elegant", "Bold"];

function getCityFromLabel(label) {
  const parts = label.split(" - ");
  return parts[parts.length - 1];
}

// Small pill trigger shared by the date/time fields inside the Start/End rows.
const FieldPill = ({ open, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={[
      "rounded-lg px-2 py-1 text-left text-sm font-medium text-slate-800 transition",
      open ? "bg-slate-200/70" : "hover:bg-slate-200/50",
    ].join(" ")}
  >
    {children}
  </button>
);

const DateTimeRow = ({
  label,
  dotFilled,
  date,
  time,
  minDate,
  onChangeDate,
  onChangeTime,
}) => (
  <div className="flex items-center gap-3 px-4 py-2">
    <span className="relative z-10 flex h-4 w-4 shrink-0 items-center justify-center">
      <span
        className={[
          "h-2.5 w-2.5 rounded-full",
          dotFilled ? "bg-indigo-600" : "border-2 border-slate-400 bg-white",
        ].join(" ")}
      />
    </span>
    <span className="w-10 shrink-0 text-sm text-slate-500">{label}</span>

    <Popover
      className="flex-1"
      trigger={({ open, toggle }) => (
        <FieldPill open={open} onClick={toggle}>
          {formatShortWeekdayMonthDay(date)}
        </FieldPill>
      )}
    >
      {(close) => (
        <DateCalendarPopover
          value={date}
          minDate={minDate}
          onSelect={(d) => {
            onChangeDate(d);
            close();
          }}
        />
      )}
    </Popover>

    <Popover
      align="right"
      trigger={({ open, toggle }) => (
        <FieldPill open={open} onClick={toggle}>
          {time}
        </FieldPill>
      )}
    >
      {(close) => (
        <TimeDropdown
          value={time}
          onSelect={(t) => {
            onChangeTime(t);
            close();
          }}
        />
      )}
    </Popover>
  </div>
);

const CreateEventPage = ({ onCreateEvent }) => {
  const fileInputRef = useRef(null);

  // --- Cover image / Cloudinary upload ---
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null); // null = idle
  const [uploadError, setUploadError] = useState(null);

  // --- Core fields ---
  const [eventName, setEventName] = useState("");
  const [theme, setTheme] = useState("Minimal");

  const [startDate, setStartDate] = useState(() => new Date());
  const [endDate, setEndDate] = useState(() => new Date());
  const [startTime, setStartTime] = useState("12:00");
  const [endTime, setEndTime] = useState("13:00");
  const [timezone, setTimezone] = useState(getDeviceTimezone());

  const [location, setLocation] = useState(null); // { name, address }
  const [description, setDescription] = useState("");

  const [visibility, setVisibility] = useState("public"); // "public" | "private"
  const [ticket, setTicket] = useState({ isPaid: false, price: "" });
  const [requireApproval, setRequireApproval] = useState(false);
  const [capacity, setCapacity] = useState(null); // null = Unlimited

  const [descriptionModalOpen, setDescriptionModalOpen] = useState(false);
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [capacityModalOpen, setCapacityModalOpen] = useState(false);
  const [connectProvider, setConnectProvider] = useState(null); // "zoom" | "google_meet" | null

  const [submitting, setSubmitting] = useState(false);

  const handlePickImage = () => fileInputRef.current?.click();

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    setUploadError(null);
    setUploadProgress(0);

    try {
      const { url } = await uploadImageToCloudinary(file, setUploadProgress);
      setImageUrl(url);
    } catch (err) {
      const message =
        err instanceof CloudinaryConfigError
          ? err.message
          : "Couldn't upload that image. Try again.";
      setUploadError(message);
    } finally {
      setUploadProgress(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!eventName.trim()) return;

    setSubmitting(true);
    try {
      await onCreateEvent?.({
        name: eventName.trim(),
        coverUrl: imageUrl,
        theme,
        startDate,
        endDate,
        startTime,
        endTime,
        timezone: timezone.id,
        location,
        description,
        visibility,
        ticketPrice: ticket.isPaid ? ticket.price : "Free",
        requireApproval,
        capacity,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-4xl px-6 py-10">
      <form onSubmit={handleSubmit}>
        {/* Top pills */}
        <div className="mb-4 flex items-center justify-between">
          <button
            type="button"
            className="flex items-center gap-2 rounded-full bg-white/70 px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-white"
          >
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-100 text-[10px]">
              📅
            </span>
            Personal Calendar
            <ChevronDown size={14} className="text-slate-400" />
          </button>

          <Popover
            align="right"
            trigger={({ open, toggle }) => (
              <button
                type="button"
                onClick={toggle}
                className="flex items-center gap-2 rounded-full bg-white/70 px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-white"
              >
                <Globe size={14} className="text-slate-400" />
                {visibility === "public" ? "Public" : "Private"}
                <ChevronDown
                  size={14}
                  className={`text-slate-400 transition ${open ? "rotate-180" : ""}`}
                />
              </button>
            )}
          >
            {(close) => (
              <VisibilityDropdown
                value={visibility}
                onSelect={(v) => {
                  setVisibility(v);
                  close();
                }}
              />
            )}
          </Popover>
        </div>

        <div className="flex flex-col gap-8 sm:flex-row">
          {/* Left column: cover image + theme */}
          <div className="w-full shrink-0 sm:w-72">
            <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl bg-slate-900">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Event cover preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <ImageIcon size={40} className="text-slate-600" />
              )}

              {uploadProgress !== null && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-slate-900/60">
                  <Loader2 size={22} className="animate-spin text-white" />
                  <span className="text-xs font-medium text-white">
                    Uploading… {uploadProgress}%
                  </span>
                </div>
              )}

              <button
                type="button"
                onClick={handlePickImage}
                className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-slate-900 text-white shadow-lg transition hover:bg-slate-800"
                aria-label="Add event image"
              >
                <Camera size={16} />
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {uploadError && (
              <p className="mt-2 text-xs text-rose-600">{uploadError}</p>
            )}

            {/* <div className="mt-3 flex items-center gap-2">
              <Popover
                className="flex-1"
                trigger={({ open, toggle }) => (
                  <button
                    type="button"
                    onClick={toggle}
                    className="flex w-full items-center justify-between rounded-xl bg-white/70 px-3 py-2 text-left shadow-sm transition hover:bg-white"
                  >
                    <span className="flex flex-col">
                      <span className="text-xs text-slate-500">Theme</span>
                      <span className="text-sm font-semibold text-slate-900">
                        {theme}
                      </span>
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-slate-400 transition ${open ? "rotate-180" : ""}`}
                    />
                  </button>
                )}
              >
                {(close) => (
                  <div className="w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
                    {THEMES.map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => {
                          setTheme(t);
                          close();
                        }}
                        className={[
                          "block w-full rounded-lg px-3 py-2 text-left text-sm transition",
                          t === theme
                            ? "bg-indigo-600 font-semibold text-white"
                            : "text-slate-700 hover:bg-slate-100",
                        ].join(" ")}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                )}
              </Popover>

              <button
                type="button"
                onClick={() =>
                  setTheme(THEMES[Math.floor(Math.random() * THEMES.length)])
                }
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/70 text-slate-500 shadow-sm transition hover:bg-white"
                aria-label="Shuffle theme"
              >
                <Shuffle size={16} />
              </button>
            </div> */}
          </div>

          {/* Right column: form fields */}
          <div className="min-w-0 flex-1">
            <input
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="Event Name"
              className="w-full border-none bg-transparent font-serif text-4xl text-slate-800 placeholder:text-slate-400 focus:outline-none"
            />

            {/* Start / End + timezone */}
            <div className="mt-6 flex flex-col md:flex-row gap-2">
              <div className="relative flex-1 divide-y divide-slate-200/70 rounded-2xl border border-slate-200/70 bg-white/60 md:flex-col">
                <div className="absolute left-[26px] top-6 bottom-6 w-px bg-slate-300" />
                <DateTimeRow
                  label="Start"
                  dotFilled
                  date={startDate}
                  time={startTime}
                  onChangeDate={setStartDate}
                  onChangeTime={setStartTime}
                />
                <DateTimeRow
                  label="End"
                  dotFilled={false}
                  date={endDate}
                  time={endTime}
                  minDate={startDate}
                  onChangeDate={setEndDate}
                  onChangeTime={setEndTime}
                />
              </div>

              <Popover
                align="right"
                trigger={({ open, toggle }) => (
                  <button
                    type="button"
                    onClick={toggle}
                    className={[
                      "flex w-full lg:w-32 shrink-0 flex-row md:flex-col items-start lg:justify-center gap-2 rounded-2xl border border-slate-200/70 px-3 py-4 text-left transition",
                      open ? "bg-white" : "bg-white/60 hover:bg-white",
                    ].join(" ")}
                  >
                    <Globe size={16} className="text-slate-400" />
                    <span className="text-xs font-medium text-slate-800">
                      {formatGmtOffset(timezone.offsetMinutes)}
                    </span>
                    <span className="text-xs text-slate-500">
                      {getCityFromLabel(timezone.label)}
                    </span>
                  </button>
                )}
              >
                {(close) => (
                  <TimezoneDropdown
                    value={timezone}
                    onSelect={(tz) => {
                      setTimezone(tz);
                      close();
                    }}
                  />
                )}
              </Popover>
            </div>

            {/* Location */}
            <Popover
              className="mt-3 block"
              trigger={({ toggle }) => (
                <button
                  type="button"
                  onClick={toggle}
                  className="flex w-full items-start gap-3 rounded-2xl bg-indigo-100/60 px-4 py-3 text-left transition hover:bg-indigo-100"
                >
                  <MapPin
                    size={18}
                    className="mt-0.5 shrink-0 text-slate-600"
                  />
                  <span className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-900">
                      {location ? location.name : "Add Event Location"}
                    </span>
                    <span className="text-xs text-slate-500">
                      {location?.address || "Offline location or virtual link"}
                    </span>
                  </span>
                </button>
              )}
            >
              {(close) => (
                <LocationDropdown
                  onSelectLocation={(loc) => {
                    setLocation(loc);
                    close();
                  }}
                  onSelectVirtual={(kind) => {
                    close();
                    setConnectProvider(kind);
                  }}
                />
              )}
            </Popover>

            {/* Description */}
            <button
              type="button"
              onClick={() => setDescriptionModalOpen(true)}
              className="mt-3 flex w-full items-center gap-3 rounded-2xl bg-slate-100/60 px-4 py-3 text-left transition hover:bg-slate-100"
            >
              <AlignLeft size={18} className="shrink-0 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">
                {description.trim() ? description : "Add Description"}
              </span>
            </button>

            <CenterModal
              open={descriptionModalOpen}
              onClose={() => setDescriptionModalOpen(false)}
            >
              <DescriptionDropdown
                value={description}
                onDone={(next) => {
                  setDescription(next);
                  setDescriptionModalOpen(false);
                }}
              />
            </CenterModal>

            {/* Event Options */}
            <p className="mb-2 mt-6 text-sm font-semibold text-slate-800">
              Event Options
            </p>
            <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white">
              {/* Ticket price */}
              <button
                type="button"
                onClick={() => setTicketModalOpen(true)}
                className="flex w-full items-center justify-between px-4 py-3 text-left transition hover:bg-slate-50"
              >
                <span className="flex items-center gap-2 text-sm font-medium text-slate-800">
                  <Ticket size={16} className="text-slate-400" />
                  Ticket Price
                </span>
                <span className="flex items-center gap-1.5 text-sm text-slate-500">
                  {ticket.isPaid ? ticket.price || "Set price" : "Free"}
                  <Pencil size={13} />
                </span>
              </button>

              <CenterModal
                open={ticketModalOpen}
                onClose={() => setTicketModalOpen(false)}
              >
                <TicketPriceDropdown
                  value={ticket}
                  onDone={(next) => {
                    setTicket(next);
                    setTicketModalOpen(false);
                  }}
                />
              </CenterModal>

              {/* Require approval */}
              <div className="flex items-center justify-between px-4 py-3">
                <span className="flex items-center gap-2 text-sm font-medium text-slate-800">
                  <UserCheck size={16} className="text-slate-400" />
                  Require Approval
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={requireApproval}
                  onClick={() => setRequireApproval((v) => !v)}
                  className={[
                    "relative h-6 w-11 rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
                    requireApproval ? "bg-indigo-600" : "bg-slate-300",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ease-in-out",
                      requireApproval ? "translate-x-5" : "translate-x-0",
                    ].join(" ")}
                  />
                </button>
              </div>

              {/* Capacity */}
              {/* Capacity */}
              <button
                type="button"
                onClick={() => setCapacityModalOpen(true)}
                className="flex w-full items-center justify-between px-4 py-3 text-left transition hover:bg-slate-50"
              >
                <span className="flex items-center gap-2 text-sm font-medium text-slate-800">
                  <Users size={16} className="text-slate-400" />
                  Capacity
                </span>
                <span className="flex items-center gap-1.5 text-sm text-slate-500">
                  {capacity ? capacity : "Unlimited"}
                  <Pencil size={13} />
                </span>
              </button>

              <CenterModal
                open={capacityModalOpen}
                onClose={() => setCapacityModalOpen(false)}
              >
                <CapacityDropdown
                  value={capacity}
                  onDone={(next) => {
                    setCapacity(next);
                    setCapacityModalOpen(false);
                  }}
                />
              </CenterModal>
            </div>

            <button
              type="submit"
              disabled={submitting || !eventName.trim()}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting && <Loader2 size={16} className="animate-spin" />}
              Create Event
            </button>
          </div>
        </div>
      </form>

      <ConnectMeetingModal
        provider={connectProvider}
        onClose={() => setConnectProvider(null)}
      />
    </section>
  );
};

export default CreateEventPage;
