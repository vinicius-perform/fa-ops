
# FA Ads Intelligence — Plano de Construção

Vou substituir o projeto atual (FA Ops) por uma nova aplicação chamada **FA Ads Intelligence**, focada em gestão de tráfego pago, métricas comerciais, status de contas de anúncio Meta Ads e controle de saldo. Dada a dimensão do escopo (27 seções, ~15 tabelas, 4 papéis de usuário, integração Meta Ads, exportação PDF/HTML/CSV, auditoria, etc.), a entrega será **faseada** — não é viável entregar tudo em uma única iteração sem perder qualidade.

## Perguntas antes de começar

1. **Confirma apagar tudo?** Vou remover páginas, componentes, hooks e dados atuais (FA Ops). O `.env` e integrações existentes com Supabase serão preservados. Confirma?
2. **Backend:** vou usar **Lovable Cloud** (Supabase gerenciado) para auth, DB, RLS e Edge Functions. Ok?
3. **Meta Ads agora ou depois?** Você já tem App ID, App Secret e Access Token da Meta? Se sim, cadastro nos secrets ao chegar na Etapa 7. Se não, entrego a Edge Function pronta e sigo em modo demonstração.
4. **Idioma dos identificadores no código:** interface em PT-BR (conforme pedido). Nomes de tabelas, colunas, funções e componentes em **inglês** (padrão da indústria). Confirma?

## Escopo por entrega

Proponho dividir em **3 entregas grandes**, cada uma revisável antes de seguir. Se preferir tudo em uma vaga só, entrego, mas o risco de retrabalho aumenta.

### Entrega 1 — Fundação (Etapas 1-2 do brief)
- Reset do projeto e nova identidade visual (tema escuro `#070B10`, Inter + JetBrains Mono, tokens semânticos no `index.css` e `tailwind.config.ts`).
- Layout: sidebar recolhível + drawer mobile, cabeçalho com filtros globais persistidos na URL e localStorage.
- Auth Supabase (email/senha) + tabela `profiles` + papéis (`admin`, `traffic_manager`, `commercial`, `viewer`) via tabela `user_roles` + função `has_role` (security definer).
- Migrations: `profiles`, `clients`, `ad_accounts`, `user_client_access`, `user_roles` com RLS e GRANTs.
- Páginas Login, Visão Geral (esqueleto), Clientes (CRUD), Configurações (perfil + tema).
- `MockAdsProvider` + `AdsProvider` interface + banner "Ambiente de demonstração".
- Seed dos 12 clientes/médicos listados.

### Entrega 2 — Módulos operacionais (Etapas 3-6)
- Migrations: `traffic_snapshots`, `manual_metrics`, `sales_origins`, `account_status_snapshots`, `investment_balances`, `goals`.
- Módulo **Tráfego pago**: layout 3 colunas, funil (impressões → alcance → visitas → leads), campanhas com tag `TRAF`, cards de indicadores, salvamento debounced de leads/seguidores.
- Módulo **Métricas comerciais**: cards, gráfico de rosca de origem de vendas, canais configuráveis.
- Módulo **Status das contas**: grid de cards, regra operacional (orçamento > 0 && gasto real > 0), motivos de inatividade, atualização progressiva com concorrência limitada.
- Módulo **Banco de investimento**: tabela, modal de edição, timeline de histórico, estimativa de dias restantes com faixas de alerta.
- Módulo **Visão geral** completo: KPIs consolidados, gráficos Recharts, seção "Contas que precisam de atenção".
- Metas por cliente com comparação atual vs. meta.
- Funções puras de domínio em `src/domain/` com testes Vitest.

### Entrega 3 — Integração, exportação, auditoria (Etapas 7-9)
- Edge Function `meta-ads-sync` (App Secret via `add_secret`), fallback para soma de campanhas, tratamento de erros (token expirado, sem permissão, rate limit, timeout).
- Tabelas `sync_logs`, `exported_reports`, `audit_logs`.
- Exportação: PDF (react-pdf ou html2pdf), snapshot HTML estático, CSV.
- Triggers de auditoria para saldo, métricas manuais, permissões, clientes, exportações.
- Rate limiting básico e revisão RLS final.
- Ajustes responsivos, tema claro, checklist final.

## Detalhes técnicos importantes

- **Stack**: React 18 + Vite 5 + TS strict + Tailwind + shadcn/ui + Lucide + React Router + TanStack Query + RHF + Zod + Recharts + Supabase JS.
- **RLS**: papéis em tabela separada (nunca em `profiles`), função `has_role` security definer, políticas por `user_client_access`.
- **Segurança Meta Ads**: token só na Edge Function via `Deno.env.get`. Nunca no frontend.
- **URL state**: `?client=&account=&from=&to=` sincronizado com filtros.
- **Formato BRL/PT-BR**: helpers `formatBRL`, `formatDate`, `formatPercent` em `src/lib/format.ts`.
- **Fallback**: `used_campaign_fallback` marcado no snapshot e badge visível na UI.
- **Modo demo**: banner global fixo enquanto `MockAdsProvider` estiver ativo.
- **Zero `NaN`/`Infinity`**: todos os cálculos passam por helpers que retornam `null` → renderizado como `—`.

## O que NÃO entrego sem confirmação
- Cron jobs ativos (deixo estrutura pronta).
- Envio real de PDF por WhatsApp/e-mail (só geração e download).
- Rotação de tokens Meta automática.

---

**Confirma o plano e as 4 perguntas acima?** Assim que confirmar, começo pela Entrega 1.
