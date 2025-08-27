export type PeriodPreset =
  | "Today" | "Yesterday" | "Last7Days" | "Last30Days"
  | "ThisMonth" | "LastMonth" | "ThisQuarter" | "Custom";

export interface IDashboardRequest {
  period: PeriodPreset;
  from?: string; // ISO: "2025-08-01" hoặc "2025-08-01T00:00:00"
  to?: string;
}

export interface IDailyPoint {
  date: string;     // "yyyy-MM-dd"
  revenue: number;
  orders: number;
}

export interface IDashboardResponse {
  revenue: number;
  orderCount: number;
  revenueChangePct: number;
  orderChangePct: number;
  dailySeries: IDailyPoint[];
}