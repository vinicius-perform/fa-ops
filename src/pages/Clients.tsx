import { useState } from "react";
import { Plus, Users, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useClients, useCreateClient, useDeleteClient } from "@/hooks/useClients";
import { EmptyState } from "@/components/shared/EmptyState";
import { formatDate } from "@/lib/format";

export default function Clients() {
  const { data: clients = [], isLoading } = useClients();
  const create = useCreateClient();
  const remove = useDeleteClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", segment: "", city: "", state: "", document: "" });

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    try {
      await create.mutateAsync(form);
      toast.success("Cliente cadastrado");
      setOpen(false);
      setForm({ name: "", segment: "", city: "", state: "", document: "" });
    } catch (err: any) {
      toast.error("Erro ao cadastrar", { description: err.message });
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Remover ${name}?`)) return;
    try { await remove.mutateAsync(id); toast.success("Cliente removido"); }
    catch (err: any) { toast.error("Erro ao remover", { description: err.message }); }
  }

  return (
    <div className="p-6 space-y-4 animate-in-fade">
      <div className="flex items-center justify-between">
        <p className="text-[12.5px] text-muted-foreground">{clients.length} cliente(s)</p>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1.5"><Plus className="h-3.5 w-3.5" /> Novo cliente</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Cadastrar cliente</DialogTitle></DialogHeader>
            <form onSubmit={handleCreate} className="space-y-3">
              <div className="space-y-1.5"><Label>Nome</Label><Input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5"><Label>Segmento</Label><Input value={form.segment} onChange={e => setForm({ ...form, segment: e.target.value })} /></div>
                <div className="space-y-1.5"><Label>CNPJ</Label><Input value={form.document} onChange={e => setForm({ ...form, document: e.target.value })} /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5"><Label>Cidade</Label><Input value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} /></div>
                <div className="space-y-1.5"><Label>Estado</Label><Input value={form.state} onChange={e => setForm({ ...form, state: e.target.value })} maxLength={2} /></div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
                <Button type="submit" disabled={create.isPending}>Cadastrar</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? null : clients.length === 0 ? (
        <EmptyState icon={Users} title="Nenhum cliente cadastrado" description="Adicione seu primeiro cliente para começar." />
      ) : (
        <div className="surface-card overflow-hidden">
          <table className="w-full text-[13px]">
            <thead className="bg-surface-elevated border-b border-border">
              <tr className="text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="text-left px-4 py-2.5 font-medium">Nome</th>
                <th className="text-left px-4 py-2.5 font-medium">Segmento</th>
                <th className="text-left px-4 py-2.5 font-medium">Cidade / UF</th>
                <th className="text-left px-4 py-2.5 font-medium">Criado em</th>
                <th className="text-right px-4 py-2.5 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {clients.map(c => (
                <tr key={c.id} className="border-b border-border last:border-0 hover:bg-accent/30">
                  <td className="px-4 py-3 font-medium text-foreground">{c.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.segment ?? "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.city ?? "—"}{c.state ? ` / ${c.state}` : ""}</td>
                  <td className="px-4 py-3 text-muted-foreground font-mono text-[12px]">{formatDate(c.created_at)}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => handleDelete(c.id, c.name)} className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
