import { Outlet } from "react-router-dom";
import Topbar from "../Topbar";
import Footer from "../Footer";
import LayoutTransition from "../ui/LayoutTransition";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-[320px] bg-gradient-to-b from-[#e5f5fc] via-[#f8fbfd] to-white" />

        <div className="relative z-10">
          <Topbar />

          <main className="mx-auto max-w-6xl px-6 py-10">
            <LayoutTransition>
              <Outlet />
            </LayoutTransition>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
