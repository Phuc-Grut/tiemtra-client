// src/views/Admin/Dashboard/components/KpiCards.tsx
import React from "react";
import { Grid, Skeleton } from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
// import TrendingUpIcon from "@mui/icons-material/TrendingUp";
// import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import KpiCard from "./KpiCard";
import { currency } from "../utils/currency";

type Props = {
  revenue: number;
  orders: number;
  revChange: number; // % so với kỳ trước
  ordChange: number; // % so với kỳ trước
  loading?: boolean;
};

export default function KpiCards({
  revenue,
  orders,
  revChange,
  ordChange,
  loading = false,
}: Props) {
  const items = [
    {
      icon: <MonetizationOnIcon />,
      label: "Doanh thu",
      value: currency(revenue),
      change: revChange,
    },
    {
      icon: <ReceiptLongIcon />,
      label: "Số đơn",
      value: orders.toLocaleString("vi-VN"),
      change: ordChange,
    },
    // Có thể mở thêm khi API có:
    // { icon: <TrendingUpIcon />, label: "AOV", value: currency(aov), change: aovChange },
    // { icon: <PeopleAltIcon />, label: "Khách mới", value: newCustomers.toLocaleString("vi-VN"), change: newCustomersChange },
  ];

  return (
    <Grid container spacing={2}>
      {items.map((it, idx) => (
        <Grid key={idx} item xs={12} sm={6} md={3}>
          {loading ? (
            <Skeleton variant="rounded" height={96} />
          ) : (
            <KpiCard {...it} />
          )}
        </Grid>
      ))}
    </Grid>
  );
}
