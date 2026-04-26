import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useData } from "@/hooks/useData";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { X, Trash2, Save, UserPlus, Users } from "lucide-react";
import { Client } from "@/data/mock";

interface EditClientDialogProps {
  client: Client;
  children: React.ReactNode;
}

export const EditClientDialog = ({ client, children }: EditClientDialogProps) => {
  const [open, setOpen] = useState(false);
  const { updateClient, deleteClient, teamMembers } = useData();
  const [formData, setFormData] = useState({
    name: client.name,
    niche: client.niche || "General",
    monthlyFee: client.monthlyFee || 0,
    team: client.team || [] as string[]
  });

  // Keep form in sync with client prop changes
  useEffect(() => {
    setFormData({
      name: client.name,
      niche: client.niche || "General",
      monthlyFee: client.monthlyFee || 0,
      team: client.team || []
    });
  }, [client, open]);

  const toggleMember = (id: string) => {
    setFormData(prev => ({
      ...prev,
      team: prev.team.includes(id) 
        ? prev.team.filter(tid => tid !== id)
        : [...prev.team, id]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    updateClient(client.id, {
      name: formData.name,
      niche: formData.niche,
      monthlyFee: formData.monthlyFee,
      team: formData.team
    });
    
    setOpen(false);
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete ${client.name}? This action cannot be undone.`)) {
      deleteClient(client.id);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] rounded-[32px] overflow-hidden border-none p-0 bg-white shadow-2xl">
        <DialogHeader className="p-8 pb-4 bg-[#f5f5f7] border-b border-black/5">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-[22px] font-bold text-[#1d1d1f] tracking-tight flex items-center gap-3">
              <div className={`h-10 w-10 rounded-2xl ${client.logoColor} text-white grid place-items-center shadow-lg`}>
                {client.initials}
              </div>
              Edit Client
            </DialogTitle>
            <button 
              onClick={handleDelete}
              className="h-10 w-10 rounded-2xl bg-red-50 text-red-500 hover:bg-red-100 transition-colors grid place-items-center"
              title="Delete Client"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[11px] font-bold text-black/30 uppercase tracking-widest ml-1">Client Name</Label>
              <Input 
                value={formData.name} 
                onChange={e => setFormData({ ...formData, name: e.target.value })} 
                className="h-12 rounded-2xl bg-[#f5f5f7] border-none text-[15px] font-semibold"
                required 
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[11px] font-bold text-black/30 uppercase tracking-widest ml-1">Niche / Area</Label>
              <Input 
                value={formData.niche} 
                onChange={e => setFormData({ ...formData, niche: e.target.value })} 
                className="h-12 rounded-2xl bg-[#f5f5f7] border-none text-[15px] font-semibold"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-[11px] font-bold text-black/30 uppercase tracking-widest ml-1 flex items-center gap-2">
                <Users className="h-3.5 w-3.5" /> Team Members
              </Label>
              <span className="text-[11px] font-bold text-[#95ec00] bg-[#95ec00]/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                {formData.team.length} Assigned
              </span>
            </div>
            
            {/* Selected Badges */}
            {formData.team.length > 0 && (
              <div className="flex flex-wrap gap-2 animate-in-fade">
                {formData.team.map(id => {
                  const member = teamMembers.find(m => m.id === id);
                  return (
                    <Badge key={id} variant="secondary" className="pl-2 pr-1.5 py-1.5 rounded-xl bg-black/5 text-[#1d1d1f] border-none flex items-center gap-2">
                      <div className={`h-5 w-5 rounded-lg ${member?.avatarColor} text-white text-[8px] font-bold grid place-items-center`}>
                        {member?.initials}
                      </div>
                      <span className="text-[12px] font-semibold">{member?.name}</span>
                      <button type="button" onClick={() => toggleMember(id)} className="hover:bg-black/10 rounded-full p-0.5 transition-colors">
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </Badge>
                  );
                })}
              </div>
            )}

            <ScrollArea className="h-[180px] w-full rounded-[24px] border border-black/5 p-4 bg-[#f5f5f7]">
              <div className="space-y-3">
                {teamMembers.map(member => (
                  <div key={member.id} className="flex items-center space-x-3 group">
                    <Checkbox 
                      id={`edit-member-${member.id}`} 
                      checked={formData.team.includes(member.id)}
                      onCheckedChange={() => toggleMember(member.id)}
                      className="rounded-lg border-black/10 data-[state=checked]:bg-[#95ec00] data-[state=checked]:border-[#95ec00] h-5 w-5"
                    />
                    <label 
                      htmlFor={`edit-member-${member.id}`}
                      className="text-[14px] font-semibold text-[#1d1d1f] leading-none cursor-pointer group-hover:text-[#95ec00] transition-colors flex items-center gap-3"
                    >
                      <div className={`h-7 w-7 rounded-xl ${member.avatarColor} text-white text-[10px] font-bold grid place-items-center shadow-sm`}>
                        {member.initials}
                      </div>
                      <div className="flex flex-col">
                        <span>{member.name}</span>
                        <span className="text-[11px] text-black/30 font-bold uppercase tracking-wider">{member.role}</span>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          <DialogFooter className="pt-2">
            <Button type="submit" className="w-full h-14 rounded-2xl bg-[#95ec00] text-black hover:bg-[#a6ff00] font-black text-[16px] shadow-lg shadow-[#95ec00]/20 flex items-center gap-3 transform transition-all active:scale-[0.98]">
              <Save className="h-5 w-5" /> Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
