// src/views/Admin/Dashboard/utils/currency.ts
export const currency = (v: number) =>
  v.toLocaleString("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 });
