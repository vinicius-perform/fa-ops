import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { DemoBanner } from "./DemoBanner";
import { GlobalFiltersProvider } from "@/hooks/useGlobalFilters";

export function AppLayout() {
  return (
    <GlobalFiltersProvider>
      <div className="flex min-h-screen w-full bg-background text-foreground">
        <Sidebar />
        <div className="flex-1 min-w-0 flex flex-col">
          <DemoBanner />
          <Topbar />
          <main className="flex-1 min-w-0 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </GlobalFiltersProvider>
  );
}
