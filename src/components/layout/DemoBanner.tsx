import { Info } from "lucide-react";
import { isDemoMode } from "@/services/ads";

export function DemoBanner() {
  if (!isDemoMode()) return null;
  return (
    <div className="border-b border-warning/30 bg-warning/10 text-warning-foreground/90 px-6 py-2 flex items-center gap-2 text-[12.5px]">
      <Info className="h-3.5 w-3.5 text-warning" />
      <span className="text-warning font-medium">Ambiente de demonstração</span>
      <span className="text-muted-foreground">— os dados exibidos não são provenientes da Meta Ads.</span>
    </div>
  );
}
