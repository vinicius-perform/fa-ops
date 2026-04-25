import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useData } from "@/hooks/useData";
import { 
  FileText, 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ChevronDown,
  Share2,
  MoreVertical,
  AlignLeft
} from "lucide-react";

export const NewAnalysisDialog = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const { clients, addAnalysis } = useData();
  const editorRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    clientId: "",
    priority: "medium",
    deadline: ""
  });

  const handleFormat = (command: string) => {
    document.execCommand(command, false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const notes = editorRef.current?.innerHTML || "";
    if (!formData.clientId || !notes || notes === "<br>") return;

    const client = clients.find(c => c.id === formData.clientId);
    addAnalysis({
      clientId: formData.clientId,
      clientName: client?.name || "",
      priority: formData.priority as any,
      deadline: formData.deadline,
      notes: notes,
      currentSituation: "",
      problems: "",
      opportunities: "",
      actionPlan: "",
      responsible: ""
    });
    
    setFormData({ clientId: "", priority: "medium", deadline: "" });
    if (editorRef.current) editorRef.current.innerHTML = "";
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[850px] bg-[#f5f5f7] border-none p-0 overflow-hidden rounded-[28px] shadow-2xl">
        <DialogHeader className="p-6 pb-2 bg-white/90 backdrop-blur-md border-b border-black/5">
          <div className="flex items-center justify-between w-full">
            <DialogTitle className="flex items-center gap-3 text-[#1d1d1f] text-[20px] font-bold tracking-tight">
              <div className="h-9 w-9 rounded-xl bg-[#95ec00] grid place-items-center shadow-sm">
                <FileText className="h-5 w-5 text-black" />
              </div>
              Strategic Analysis
            </DialogTitle>
            <div className="flex items-center gap-3">
              <button type="button" className="p-2 rounded-full hover:bg-black/5 text-[#1d1d1f] transition-colors">
                <Share2 className="h-4 w-4" />
              </button>
              <button type="button" className="p-2 rounded-full hover:bg-black/5 text-[#1d1d1f] transition-colors">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-0 flex flex-col h-[80vh]">
          {/* Top Info Bar */}
          <div className="px-8 py-4 flex items-center gap-10 bg-white border-b border-black/5">
            <div className="flex flex-col gap-1 flex-1">
              <Label className="text-[10px] font-bold text-black/30 uppercase tracking-widest">Client</Label>
              <select
                value={formData.clientId}
                onChange={e => setFormData({ ...formData, clientId: e.target.value })}
                className="bg-transparent text-[15px] font-semibold text-[#1d1d1f] focus:outline-none cursor-pointer hover:text-[#95ec00] transition-colors"
                required
              >
                <option value="" disabled>Select client for analysis</option>
                {clients.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-10">
              <div className="flex flex-col gap-1">
                <Label className="text-[10px] font-bold text-black/30 uppercase tracking-widest">Priority</Label>
                <select
                  value={formData.priority}
                  onChange={e => setFormData({ ...formData, priority: e.target.value })}
                  className="bg-transparent text-[14px] font-semibold text-[#1d1d1f] focus:outline-none cursor-pointer"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <Label className="text-[10px] font-bold text-black/30 uppercase tracking-widest">Deadline</Label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={e => setFormData({ ...formData, deadline: e.target.value })}
                  className="bg-transparent text-[14px] font-semibold text-[#1d1d1f] focus:outline-none cursor-pointer"
                  required
                />
              </div>
            </div>
          </div>

          {/* Apple Notes Style Canvas */}
          <div className="flex-1 overflow-hidden flex flex-col bg-white">
            {/* Toolbar */}
            <div className="flex items-center gap-1 px-8 py-3 bg-[#f5f5f7]/60 border-b border-black/5">
              <div className="flex items-center gap-1.5 px-3">
                <button 
                  type="button" 
                  onClick={() => handleFormat('bold')}
                  className="p-2 rounded-lg hover:bg-black/5 text-[#1d1d1f] active:bg-black/10 transition-all"
                >
                  <Bold className="h-5 w-5" />
                </button>
                <button 
                  type="button" 
                  onClick={() => handleFormat('italic')}
                  className="p-2 rounded-lg hover:bg-black/5 text-[#1d1d1f] active:bg-black/10 transition-all"
                >
                  <Italic className="h-5 w-5" />
                </button>
                <button 
                  type="button" 
                  onClick={() => handleFormat('underline')}
                  className="p-2 rounded-lg hover:bg-black/5 text-[#1d1d1f] active:bg-black/10 transition-all"
                >
                  <Underline className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Editable Canvas */}
            <div className="flex-1 overflow-y-auto bg-white custom-scrollbar">
              <div
                ref={editorRef}
                contentEditable
                className="w-full min-h-full p-16 outline-none text-[18px] text-[#1d1d1f] leading-[1.6] font-normal"
                onInput={(e) => {
                  if (e.currentTarget.innerHTML === "") {
                    e.currentTarget.innerHTML = "";
                  }
                }}
                data-placeholder="Start typing your strategic analysis here..."
              />
              <style>{`
                [contentEditable]:empty:before {
                  content: attr(data-placeholder);
                  color: #d1d1d6;
                  cursor: text;
                }
              `}</style>
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-6 bg-[#f5f5f7]/80 backdrop-blur-md border-t border-black/5 flex justify-end gap-3">
            <Button 
              type="button" 
              onClick={() => setOpen(false)}
              className="h-12 px-6 rounded-2xl bg-black/5 text-[#1d1d1f] hover:bg-black/10 font-bold text-[15px] transition-all"
            >
              Discard
            </Button>
            <Button 
              type="submit" 
              className="h-12 px-10 rounded-2xl bg-[#95ec00] text-black hover:bg-[#a6ff00] font-extrabold text-[15px] shadow-sm transform transition-all active:scale-95"
            >
              Save Strategic Analysis
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
