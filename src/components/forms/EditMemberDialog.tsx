import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useData } from "@/hooks/useData";
import { TeamMember } from "@/data/mock";
import { User, Briefcase, Info } from "lucide-react";

interface EditMemberDialogProps {
  member: TeamMember;
  children: React.ReactNode;
}

export const EditMemberDialog = ({ member, children }: EditMemberDialogProps) => {
  const [open, setOpen] = useState(false);
  const { updateMember } = useData();
  const [formData, setFormData] = useState({
    name: member.name,
    role: member.role,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.role) return;

    updateMember(member.id, formData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[420px] bg-background border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Edit Team Member
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="flex flex-col items-center pb-6 border-b border-border/50">
            <div className={`h-20 w-20 rounded-2xl ${member.avatarColor} text-white text-[24px] font-bold grid place-items-center mb-3 shadow-lg`}>
              {member.initials}
            </div>
            <p className="text-[14px] font-semibold">{member.name}</p>
            <p className="text-[12px] text-muted-foreground">{member.role}</p>
          </div>

          <div className="grid gap-5">
            <div className="space-y-2">
              <Label htmlFor="edit-name" className="text-[13px] font-semibold ml-1">Full Name</Label>
              <Input 
                id="edit-name" 
                value={formData.name} 
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="h-11 rounded-xl bg-muted/30 border-transparent focus:bg-background focus:border-primary/30 transition-all"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-role" className="text-[13px] font-semibold ml-1">Role / Function</Label>
              <Input 
                id="edit-role" 
                value={formData.role} 
                onChange={e => setFormData({ ...formData, role: e.target.value })}
                className="h-11 rounded-xl bg-muted/30 border-transparent focus:bg-background focus:border-primary/30 transition-all"
                required
              />
            </div>

            <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 space-y-3">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-[#95ec00]/10 text-[#95ec00] grid place-items-center shrink-0">
                  <Briefcase className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-foreground">Linked Clients</p>
                  <p className="text-[12px] text-muted-foreground font-medium">{member.assignedClients || 0} active {member.assignedClients === 1 ? 'client' : 'clients'}</p>
                </div>
              </div>
              
              {member.assignedClientNames && member.assignedClientNames.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-primary/10">
                  {member.assignedClientNames.map((name, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-lg bg-[#95ec00]/10 text-foreground border border-[#95ec00]/20 text-[10px] font-semibold">
                      {name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button type="submit" className="w-full h-11 rounded-xl bg-[#95ec00] text-[#090909] hover:bg-[#a6ff00] font-bold shadow-glow-sm">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
