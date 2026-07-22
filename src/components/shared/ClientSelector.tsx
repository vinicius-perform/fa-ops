import { Check, ChevronsUpDown, Search } from "lucide-react";
import { useState } from "react";
import { useClients } from "@/hooks/useClients";
import { useGlobalFilters } from "@/hooks/useGlobalFilters";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

export function ClientSelector() {
  const { data: clients = [] } = useClients();
  const { clientId, setClientId, setAccountId } = useGlobalFilters();
  const [open, setOpen] = useState(false);
  const current = clients.find(c => c.id === clientId);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="h-8 min-w-[180px] px-3 rounded-md border border-border bg-input text-[12.5px] flex items-center justify-between gap-2 hover:border-border-strong transition-colors">
          <span className="truncate">{current?.name ?? <span className="text-muted-foreground">Selecionar cliente</span>}</span>
          <ChevronsUpDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[260px]" align="start">
        <Command>
          <div className="flex items-center border-b border-border px-2">
            <Search className="h-3.5 w-3.5 text-muted-foreground" />
            <CommandInput placeholder="Buscar cliente..." className="h-9 text-[12.5px]" />
          </div>
          <CommandList>
            <CommandEmpty>Nenhum cliente encontrado.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                value="__all"
                onSelect={() => { setClientId(null); setAccountId(null); setOpen(false); }}
                className="text-[12.5px]"
              >
                <Check className={cn("mr-2 h-3.5 w-3.5", !clientId ? "opacity-100" : "opacity-0")} />
                Todos os clientes
              </CommandItem>
              {clients.map(c => (
                <CommandItem
                  key={c.id}
                  value={c.name}
                  onSelect={() => { setClientId(c.id); setAccountId(null); setOpen(false); }}
                  className="text-[12.5px]"
                >
                  <Check className={cn("mr-2 h-3.5 w-3.5", clientId === c.id ? "opacity-100" : "opacity-0")} />
                  {c.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
