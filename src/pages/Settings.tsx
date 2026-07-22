import { useAuth } from "@/hooks/useAuth";
import { ROLE_LABEL } from "@/types";

export default function Settings() {
  const { user, role } = useAuth();
  return (
    <div className="p-6 space-y-4 animate-in-fade">
      <div className="surface-card p-5 max-w-xl">
        <h2 className="text-[14px] font-semibold text-foreground">Perfil</h2>
        <dl className="mt-3 space-y-2 text-[13px]">
          <div className="flex justify-between"><dt className="text-muted-foreground">Nome</dt><dd className="text-foreground">{(user?.user_metadata?.full_name as string) ?? "—"}</dd></div>
          <div className="flex justify-between"><dt className="text-muted-foreground">E-mail</dt><dd className="text-foreground font-mono text-[12px]">{user?.email}</dd></div>
          <div className="flex justify-between"><dt className="text-muted-foreground">Função</dt><dd className="text-foreground">{role ? ROLE_LABEL[role] : "—"}</dd></div>
        </dl>
      </div>
      <div className="surface-card p-5 max-w-xl">
        <h2 className="text-[14px] font-semibold text-foreground">Preferências</h2>
        <p className="text-[12.5px] text-muted-foreground mt-1">Alternância de tema, integrações Meta Ads e configuração de tag de tráfego serão disponibilizados nas próximas entregas.</p>
      </div>
    </div>
  );
}
