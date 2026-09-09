import { Navigate, Route, Routes } from "react-router-dom";

import CalendarPage from "./pages/CalendarPage";
import DiscoverEvents from "./pages/DiscoverEvents";
import CreateEvent from "./pages/CreateEvent";
import NotificationPage from "./pages/NotificationPage";
import CategoryPage from "./pages/CategoryPage";
import SearchModal from "./components/SearchModal";

import Login from "./pages/Login";
import Register from "./pages/Register";

import { RSVPProvider } from "./context/RSVPContext";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./components/layouts/MainLayout";
import MyEvents from "./pages/MyEvents";
import ManageEvent from "./pages/ManageEvent";
import EditEvent from "./pages/EditEvent";
import EventDetails from "./pages/EventDetails";
import Profile from "./pages/Profile";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import { useAuth } from "./context/AuthContext";

function RootPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen" />;
  }

  return user ? <Navigate to="/events" replace /> : <HomePage />;
}

export default function App() {
  return (
    <RSVPProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<MainLayout />}>
          {/* Public home page */}
          <Route path="/" element={<RootPage />} />
          <Route path="/home" element={<HomePage />} />

          {/* Public browsing pages */}
          <Route path="/calendars" element={<CalendarPage />} />
          <Route path="/discover" element={<DiscoverEvents />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/search" element={<SearchModal />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route
            path="/discover/category/:categoryId"
            element={<CategoryPage />}
          />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            {/* Logged-in Events page */}
            <Route path="/events" element={<LandingPage />} />

            <Route path="/create" element={<CreateEvent />} />
            <Route path="/my-events" element={<MyEvents />} />
            <Route path="/my-events/:id" element={<ManageEvent />} />
            <Route path="/my-events/:id/edit" element={<EditEvent />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<NotificationPage />} />
          </Route>
        </Route>
      </Routes>
    </RSVPProvider>
  );
}
