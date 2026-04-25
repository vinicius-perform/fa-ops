import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useData } from "@/hooks/useData";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export const AddClientDialog = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const { addClient, teamMembers } = useData();
  const [formData, setFormData] = useState({
    name: "",
    team: [] as string[] // Array of member IDs
  });

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

    addClient({
      name: formData.name,
      team: formData.team,
      // Defaulting other required fields for the backend
      niche: "General",
      monthlyFee: 0,
      status: "active",
      priority: "medium"
    });
    
    setOpen(false);
    setFormData({ name: "", team: [] });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2.5">
            <Label htmlFor="name" className="text-[13px] font-semibold">Client Name</Label>
            <Input 
              id="name" 
              value={formData.name} 
              onChange={e => setFormData({ ...formData, name: e.target.value })} 
              placeholder="e.g. Acme Corp" 
              className="h-11 rounded-xl"
              required 
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-[13px] font-semibold">Assign Team Members</Label>
              <span className="text-[11px] text-muted-foreground font-medium">{formData.team.length} selected</span>
            </div>
            
            {/* Selected Badges */}
            {formData.team.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pb-2">
                {formData.team.map(id => {
                  const member = teamMembers.find(m => m.id === id);
                  return (
                    <Badge key={id} variant="secondary" className="pl-2 pr-1 py-1 rounded-lg bg-[#95ec00]/10 text-foreground border-[#95ec00]/20 flex items-center gap-1">
                      {member?.name}
                      <button type="button" onClick={() => toggleMember(id)} className="hover:bg-foreground/10 rounded-full p-0.5 transition-colors">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  );
                })}
              </div>
            )}

            <ScrollArea className="h-[200px] w-full rounded-xl border border-border p-4 bg-muted/30">
              <div className="space-y-3">
                {teamMembers.length === 0 ? (
                  <p className="text-[12px] text-muted-foreground text-center py-8">No team members found. Add them in the Team tab first.</p>
                ) : (
                  teamMembers.map(member => (
                    <div key={member.id} className="flex items-center space-x-3 group">
                      <Checkbox 
                        id={`member-${member.id}`} 
                        checked={formData.team.includes(member.id)}
                        onCheckedChange={() => toggleMember(member.id)}
                        className="rounded-md border-muted-foreground/30 data-[state=checked]:bg-[#95ec00] data-[state=checked]:border-[#95ec00]"
                      />
                      <label 
                        htmlFor={`member-${member.id}`}
                        className="text-[13.5px] font-medium leading-none cursor-pointer group-hover:text-primary transition-colors flex items-center gap-2"
                      >
                        <div className={`h-6 w-6 rounded-md ${member.avatarColor} text-white text-[9px] font-bold grid place-items-center`}>
                          {member.initials}
                        </div>
                        {member.name}
                        <span className="text-[11px] text-muted-foreground font-normal">— {member.role}</span>
                      </label>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </div>

          <DialogFooter className="pt-4">
            <Button type="submit" className="w-full h-11 rounded-xl bg-[#95ec00] text-[#090909] hover:bg-[#a6ff00] font-bold">
              Add client
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
