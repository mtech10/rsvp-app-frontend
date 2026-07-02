import React from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./components/Topbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import CalendarPage from "./pages/CalendarPage";
import DiscoverEvents from "./pages/DiscoverEvents";
import CreateEvent from "./pages/CreateEvent";
import SearchPage from "./pages/SearchPage";
import NotificationPage from "./pages/NotificationPage";
import CategoryPage from "./pages/CategoryPage";
import { RSVPProvider } from "./context/RSVPContext";

const App = () => {
  return (
    <div className="min-h-screen bg-linear-to-t from-slate-50 to-blue-100">
      <Topbar />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <RSVPProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/calendars" element={<CalendarPage />} />
            <Route path="/discover" element={<DiscoverEvents />} />
            <Route path="/create" element={<CreateEvent />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/notifications" element={<NotificationPage />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
          </Routes>
        </RSVPProvider>
      </main>
      <Footer />
    </div>
  );
};

export default App;
