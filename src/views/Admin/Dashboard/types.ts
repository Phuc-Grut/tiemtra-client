// src/views/Admin/Dashboard/types.ts
export type RevenuePoint = { date: string; revenue: number };
export type StatusSlice = { status: string; value: number };
export type ProductBar = { name: string; revenue: number; qty?: number };
export type TopCustomer = { name: string; phone: string; orders: number; revenue: number };
