import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { NewTaskDialog } from "@/components/forms/NewTaskDialog";
import { ListTodo } from "lucide-react";

export const AppLayout = () => {
  return (
    <div className="flex min-h-screen w-full bg-background relative">
      <Sidebar />
      <main className="flex-1 min-w-0 flex flex-col relative">
        <Outlet />
      </main>

      {/* Floating Action Button for Tasks */}
      <div className="fixed bottom-8 right-8 z-50">
        <NewTaskDialog>
          <button 
            className="h-16 w-16 rounded-full bg-[#95ec00] text-black shadow-2xl flex items-center justify-center transform transition-all hover:scale-110 active:scale-95 hover:rotate-12 group"
            title="New Checkpoint Task"
          >
            <ListTodo className="h-7 w-7 group-hover:scale-110 transition-transform" />
            
            {/* Subtle Pulse Animation */}
            <span className="absolute inset-0 rounded-full bg-[#95ec00] animate-ping opacity-20 pointer-events-none" />
          </button>
        </NewTaskDialog>
      </div>
    </div>
  );
};
