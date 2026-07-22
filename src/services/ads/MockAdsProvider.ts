import { AdsProvider, AccountInsights, CampaignInsight, AccountStatus } from "./AdsProvider";

function seed(s: string): () => number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return () => { h += 0x6D2B79F5; let t = h; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

function daysBetween(start: string, end: string): number {
  const s = new Date(start).getTime();
  const e = new Date(end).getTime();
  return Math.max(1, Math.round((e - s) / 86400000) + 1);
}

export class MockAdsProvider implements AdsProvider {
  readonly kind = "mock" as const;

  async getAccountInsights({ metaAccountId, start, end }: { metaAccountId: string; start: string; end: string; trafficTag?: string }): Promise<AccountInsights> {
    const rnd = seed(metaAccountId + start + end);
    const days = daysBetween(start, end);
    const dailySpend = 80 + rnd() * 220;
    const spend_total = Math.round(dailySpend * days * 100) / 100;
    const impressions = Math.round(spend_total * (600 + rnd() * 400));
    const reach = Math.round(impressions * (0.55 + rnd() * 0.2));
    const traffic_campaign_spend = Math.round(spend_total * (0.6 + rnd() * 0.25) * 100) / 100;
    const traffic_link_clicks = Math.round(traffic_campaign_spend / (0.8 + rnd() * 1.6));
    return {
      spend_total, impressions, reach,
      traffic_campaign_spend, traffic_link_clicks,
      campaign_count: 3 + Math.floor(rnd() * 5),
      used_campaign_fallback: false,
      is_queryable: true,
      account_status: "ACTIVE",
    };
  }

  async getCampaignInsights({ metaAccountId, start, end, trafficTag = "TRAF" }: { metaAccountId: string; start: string; end: string; trafficTag?: string }): Promise<CampaignInsight[]> {
    const rnd = seed(metaAccountId + start + end + "camp");
    const now = new Date().toISOString();
    const templates = [
      `${trafficTag} - Conversão Leads`,
      `${trafficTag} - Alcance Local`,
      `Branding - Reconhecimento`,
      `${trafficTag} - Retargeting`,
      `Engajamento - Instagram`,
    ];
    return templates.map((name, i) => {
      const spend = Math.round((50 + rnd() * 400) * 100) / 100;
      const link_clicks = Math.round(spend / (0.5 + rnd() * 2));
      const impressions = Math.round(spend * (500 + rnd() * 500));
      return {
        id: `${metaAccountId}-c${i}`,
        name,
        status: rnd() > 0.2 ? "ACTIVE" : "PAUSED",
        spend, impressions, link_clicks,
        cpc: link_clicks > 0 ? Math.round((spend / link_clicks) * 100) / 100 : null,
        last_update: now,
      };
    });
  }

  async getAccountStatus({ metaAccountId }: { metaAccountId: string }): Promise<AccountStatus> {
    const rnd = seed(metaAccountId + "status");
    const daily = Math.round((100 + rnd() * 400) * 100) / 100;
    const spend_today = rnd() > 0.15 ? Math.round(daily * (0.2 + rnd() * 0.8) * 100) / 100 : 0;
    const spend_yesterday = rnd() > 0.1 ? Math.round(daily * (0.5 + rnd() * 0.6) * 100) / 100 : 0;
    const budgetOk = daily > 0;
    const spendingReal = spend_today > 0 || spend_yesterday > 0;
    let operational_status: AccountStatus["operational_status"] = "active";
    let inactive_reason: string | undefined;
    if (!budgetOk) { operational_status = "no_budget"; inactive_reason = "Nenhuma campanha ou conjunto ativo com orçamento no momento."; }
    else if (!spendingReal) { operational_status = "budget_no_spend"; inactive_reason = "Existe orçamento programado, mas não houve gasto real ontem nem hoje. Verifique saldo, cobrança, pausas ou queda de entrega."; }
    return {
      account_status: "ACTIVE",
      is_queryable: true,
      currency: "BRL",
      active_campaigns: 2 + Math.floor(rnd() * 4),
      active_adsets: 3 + Math.floor(rnd() * 6),
      programmed_daily_budget: daily,
      spend_yesterday, spend_today,
      operational_status,
      inactive_reason,
    };
  }
}
