/**
 * Formatação PT-BR / BRL para o FA Ads Intelligence.
 * Todas as funções lidam com null/undefined/NaN retornando "—".
 */

const DASH = "—";

export const isNil = (v: unknown): v is null | undefined =>
  v === null || v === undefined || (typeof v === "number" && !Number.isFinite(v));

export function formatBRL(value: number | null | undefined, options?: { compact?: boolean }): string {
  if (isNil(value)) return DASH;
  const opts: Intl.NumberFormatOptions = {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
  if (options?.compact) {
    opts.notation = "compact";
    opts.maximumFractionDigits = 1;
  }
  return new Intl.NumberFormat("pt-BR", opts).format(value);
}

export function formatNumber(value: number | null | undefined, fractionDigits = 0): string {
  if (isNil(value)) return DASH;
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
}

export function formatPercent(value: number | null | undefined, fractionDigits = 1): string {
  if (isNil(value)) return DASH;
  return `${new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value)}%`;
}

export function formatDate(input: string | Date | null | undefined): string {
  if (isNil(input)) return DASH;
  const d = typeof input === "string" ? new Date(input) : input;
  if (Number.isNaN(d.getTime())) return DASH;
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" }).format(d);
}

export function formatDateTime(input: string | Date | null | undefined): string {
  if (isNil(input)) return DASH;
  const d = typeof input === "string" ? new Date(input) : input;
  if (Number.isNaN(d.getTime())) return DASH;
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  }).format(d);
}

/** Divisão segura — retorna null se denominator inválido ou zero. */
export function safeDivide(numerator: number | null | undefined, denominator: number | null | undefined): number | null {
  if (isNil(numerator) || isNil(denominator) || denominator === 0) return null;
  return numerator / denominator;
}

/** Percentual seguro (0-100+) — retorna null se inválido. */
export function safeRate(part: number | null | undefined, total: number | null | undefined): number | null {
  const r = safeDivide(part, total);
  return r === null ? null : r * 100;
}
