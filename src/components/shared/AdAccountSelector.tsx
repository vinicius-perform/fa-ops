import { Check, ChevronsUpDown, Search } from "lucide-react";
import { useState } from "react";
import { useAdAccounts } from "@/hooks/useAdAccounts";
import { useGlobalFilters } from "@/hooks/useGlobalFilters";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

export function AdAccountSelector() {
  const { clientId, accountId, setAccountId } = useGlobalFilters();
  const { data: accounts = [] } = useAdAccounts(clientId ?? undefined);
  const [open, setOpen] = useState(false);
  const current = accounts.find(a => a.id === accountId);
  const disabled = !clientId;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          disabled={disabled}
          className="h-8 min-w-[200px] px-3 rounded-md border border-border bg-input text-[12.5px] flex items-center justify-between gap-2 hover:border-border-strong transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="truncate">
            {disabled
              ? <span className="text-muted-foreground">Escolha um cliente</span>
              : current?.name ?? <span className="text-muted-foreground">Todas as contas</span>}
          </span>
          <ChevronsUpDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[280px]" align="start">
        <Command>
          <div className="flex items-center border-b border-border px-2">
            <Search className="h-3.5 w-3.5 text-muted-foreground" />
            <CommandInput placeholder="Buscar conta ou ID..." className="h-9 text-[12.5px]" />
          </div>
          <CommandList>
            <CommandEmpty>Nenhuma conta encontrada.</CommandEmpty>
            <CommandGroup>
              <CommandItem value="__all" onSelect={() => { setAccountId(null); setOpen(false); }} className="text-[12.5px]">
                <Check className={cn("mr-2 h-3.5 w-3.5", !accountId ? "opacity-100" : "opacity-0")} />
                Todas as contas
              </CommandItem>
              {accounts.map(a => (
                <CommandItem key={a.id} value={`${a.name} ${a.meta_account_id}`} onSelect={() => { setAccountId(a.id); setOpen(false); }} className="text-[12.5px] flex items-center justify-between">
                  <span className="flex items-center gap-2 min-w-0">
                    <Check className={cn("h-3.5 w-3.5", accountId === a.id ? "opacity-100" : "opacity-0")} />
                    <span className="truncate">{a.name}</span>
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground ml-2">{a.meta_account_id}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
