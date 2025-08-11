// src/views/Admin/Dashboard/components/KpiCards.tsx
import React from "react";
import { Grid } from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import KpiCard from "./KpiCard";
import { currency } from "../utils/currency";
import { demoOverview } from "../demodata";

export default function KpiCards() {
  const items = [
    { icon: <MonetizationOnIcon />, label: "Doanh thu", value: currency(demoOverview.revenue), change: demoOverview.revenueChange },
    { icon: <ReceiptLongIcon />, label: "Số đơn", value: demoOverview.orders.toLocaleString("vi-VN"), change: demoOverview.ordersChange },
    { icon: <TrendingUpIcon />, label: "AOV", value: currency(demoOverview.aov), change: demoOverview.aovChange },
    { icon: <PeopleAltIcon />, label: "Khách mới", value: demoOverview.newCustomers.toLocaleString("vi-VN"), change: demoOverview.newCustomersChange },
  ];

  return (
    <Grid container spacing={2}>
      {items.map((it, idx) => (
        <Grid key={idx} item xs={12} sm={6} md={3}>
          <KpiCard {...it} />
        </Grid>
      ))}
    </Grid>
  );
}
