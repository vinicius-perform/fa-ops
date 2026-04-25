import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useData } from "@/hooks/useData";

export const AddMemberDialog = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const { addMember } = useData();
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    phone: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMember({
      ...formData,
      department: "General", // Defaulting to General
      email: formData.email || `${formData.name.toLowerCase().replace(" ", ".")}@example.com`,
      phone: formData.phone || "+55 (11) 99999-9999"
    });
    setOpen(false);
    setFormData({ name: "", role: "", email: "", phone: "" });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Team Member</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="John Doe" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input id="role" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} placeholder="Senior Designer" required />
          </div>
          <DialogFooter className="pt-4">
            <Button type="submit">Save member</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
