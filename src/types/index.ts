export type AppRole = "admin" | "traffic_manager" | "commercial" | "viewer";

export interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Client {
  id: string;
  name: string;
  legal_name: string | null;
  document: string | null;
  segment: string | null;
  city: string | null;
  state: string | null;
  logo_url: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AdAccount {
  id: string;
  client_id: string;
  meta_account_id: string;
  name: string;
  currency: string;
  timezone: string;
  active: boolean;
  integration_status: "pending" | "connected" | "error" | "demo";
  last_sync_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Period {
  start: string; // ISO date (YYYY-MM-DD)
  end: string;
  label: string; // "Últimos 7 dias" etc.
}

export const ROLE_LABEL: Record<AppRole, string> = {
  admin: "Administrador",
  traffic_manager: "Gestor de Tráfego",
  commercial: "Comercial",
  viewer: "Visualizador",
};
