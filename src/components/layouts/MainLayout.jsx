import { Outlet } from "react-router-dom";
import Topbar from "../Topbar";
import Footer from "../Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-linear-to-t from-slate-50 to-blue-100">
      <Topbar />

      <main className="mx-auto max-w-6xl px-6 py-10">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
