/**
 * Contrato abstrato para provedores de dados de anúncios.
 * MockAdsProvider e MetaAdsProvider implementam esta interface.
 */

export interface AccountInsights {
  spend_total: number;
  impressions: number;
  reach: number;
  traffic_campaign_spend: number;
  traffic_link_clicks: number;
  campaign_count: number;
  used_campaign_fallback: boolean;
  is_queryable: boolean;
  account_status: string;
  not_queryable_reason?: string;
}

export interface CampaignInsight {
  id: string;
  name: string;
  status: string;
  spend: number;
  impressions: number;
  link_clicks: number;
  cpc: number | null;
  last_update: string;
}

export interface AccountStatus {
  account_status: string;
  is_queryable: boolean;
  not_queryable_reason?: string;
  currency: string;
  active_campaigns: number;
  active_adsets: number;
  programmed_daily_budget: number;
  spend_yesterday: number;
  spend_today: number;
  operational_status: "active" | "no_budget" | "budget_no_spend" | "blocked" | "error";
  inactive_reason?: string;
}

export interface AdsProvider {
  readonly kind: "mock" | "meta";
  getAccountInsights(params: { metaAccountId: string; start: string; end: string; trafficTag?: string }): Promise<AccountInsights>;
  getCampaignInsights(params: { metaAccountId: string; start: string; end: string; trafficTag?: string }): Promise<CampaignInsight[]>;
  getAccountStatus(params: { metaAccountId: string }): Promise<AccountStatus>;
}
