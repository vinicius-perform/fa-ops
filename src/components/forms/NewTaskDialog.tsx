import { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useData } from "@/hooks/useData";
import { ListTodo, Target, User, Calendar, Flag } from "lucide-react";

export const NewTaskDialog = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const { addTask, clients, teamMembers } = useData();
  
  const [formData, setFormData] = useState({
    title: "",
    clientId: "",
    responsible: "",
    dueDate: "",
    priority: "medium"
  });

  // Filter responsible based on selected client
  const availableResponsible = useMemo(() => {
    if (!formData.clientId) return [];
    const client = clients.find(c => c.id === formData.clientId);
    if (!client || !client.team) return [];
    
    // client.team contains IDs of members
    return teamMembers.filter(m => 
      client.team.includes(m.id) || client.team.includes(m.name)
    );
  }, [formData.clientId, clients, teamMembers]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const client = clients.find(c => c.id === formData.clientId);
    
    addTask({
      title: formData.title,
      clientName: client?.name || "",
      responsible: formData.responsible,
      dueDate: formData.dueDate,
      priority: formData.priority as any
    });
    
    setOpen(false);
    setFormData({ title: "", clientId: "", responsible: "", dueDate: "", priority: "medium" });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-[#f5f5f7] border-none p-0 overflow-hidden rounded-[32px] shadow-2xl">
        <DialogHeader className="p-8 pb-4 bg-white/80 backdrop-blur-md border-b border-black/5">
          <DialogTitle className="flex items-center gap-3 text-[#1d1d1f] text-[22px] font-bold tracking-tight">
            <div className="h-10 w-10 rounded-2xl bg-[#95ec00] grid place-items-center shadow-sm">
              <ListTodo className="h-5.5 w-5.5 text-black" />
            </div>
            New Checkpoint Task
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <Label className="text-[11px] font-bold text-black/30 uppercase tracking-widest ml-1">Task Title</Label>
            <input
              type="text"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Optimize Google Ads Campaigns"
              className="w-full h-12 px-4 rounded-2xl bg-white border border-black/5 text-[15px] text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#95ec00]/20 transition-all font-medium placeholder:text-black/10"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[11px] font-bold text-black/30 uppercase tracking-widest ml-1 flex items-center gap-1.5">
                <Target className="h-3 w-3" /> Client
              </Label>
              <select
                value={formData.clientId}
                onChange={e => setFormData({ ...formData, clientId: e.target.value, responsible: "" })}
                className="w-full h-12 px-4 rounded-2xl bg-white border border-black/5 text-[14px] text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#95ec00]/20 transition-all font-medium appearance-none cursor-pointer"
                required
              >
                <option value="" disabled>Select client</option>
                {clients.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label className="text-[11px] font-bold text-black/30 uppercase tracking-widest ml-1 flex items-center gap-1.5">
                <User className="h-3 w-3" /> Responsible
              </Label>
              <select
                value={formData.responsible}
                onChange={e => setFormData({ ...formData, responsible: e.target.value })}
                className="w-full h-12 px-4 rounded-2xl bg-white border border-black/5 text-[14px] text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#95ec00]/20 transition-all font-medium appearance-none cursor-pointer disabled:opacity-50"
                disabled={!formData.clientId}
                required
              >
                <option value="" disabled>Select responsible</option>
                {availableResponsible.map(m => (
                  <option key={m.id} value={m.name}>{m.name}</option>
                ))}
              </select>
              {formData.clientId && availableResponsible.length === 0 && (
                <p className="text-[10px] text-red-500 font-medium ml-1">No members linked to this client.</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[11px] font-bold text-black/30 uppercase tracking-widest ml-1 flex items-center gap-1.5">
                <Calendar className="h-3 w-3" /> Execution Date
              </Label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full h-12 px-4 rounded-2xl bg-white border border-black/5 text-[14px] text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#95ec00]/20 transition-all font-medium cursor-pointer"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[11px] font-bold text-black/30 uppercase tracking-widest ml-1 flex items-center gap-1.5">
                <Flag className="h-3 w-3" /> Priority
              </Label>
              <select
                value={formData.priority}
                onChange={e => setFormData({ ...formData, priority: e.target.value })}
                className="w-full h-12 px-4 rounded-2xl bg-white border border-black/5 text-[14px] text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#95ec00]/20 transition-all font-medium appearance-none cursor-pointer"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent (Obrigatório)</option>
              </select>
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button 
              type="submit" 
              className="w-full h-14 rounded-2xl bg-[#95ec00] text-black hover:bg-[#a6ff00] font-extrabold text-[16px] shadow-sm transform transition-all active:scale-95"
            >
              Create Checkpoint
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
