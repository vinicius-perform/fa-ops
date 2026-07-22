import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-6">
      <div className="text-center">
        <p className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest">404</p>
        <h1 className="text-[22px] font-semibold text-foreground mt-2">Página não encontrada</h1>
        <p className="text-[13px] text-muted-foreground mt-1">O endereço acessado não existe.</p>
        <Button asChild className="mt-5"><Link to="/">Voltar ao início</Link></Button>
      </div>
    </div>
  );
}
