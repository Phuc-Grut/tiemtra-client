// src/views/Admin/Dashboard/components/TopProductsBarChart.tsx
import React from "react";
import { Box, Card, CardContent, Chip, Divider, Typography } from "@mui/material";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";
import { ProductBar } from "../types";
import { currency } from "../utils/currency";
import { demoTopProducts } from "../demodata";

export default function TopProductsBarChart({ data = demoTopProducts }: { data?: ProductBar[] }) {
  return (
    <Card sx={{ borderRadius: 3, height: 360, boxShadow: "0 8px 30px rgba(0,0,0,0.06)" }}>
      <CardContent sx={{ height: "100%" }}>
        <Typography variant="h6" fontWeight={700} mb={1}>
          Top sản phẩm theo doanh thu
        </Typography>
        <Chip size="small" label={`Top ${Math.min(5, data.length)}`} sx={{ mb: 1 }} />
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ width: "100%", height: 260 }}>
          <ResponsiveContainer>
            <BarChart data={data} layout="vertical" margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tickFormatter={(v) => `${Math.round(Number(v) / 1_000_000)}tr`} />
              <YAxis type="category" dataKey="name" width={160} />
              <Tooltip formatter={(v: any) => currency(Number(v))} />
              <Bar dataKey="revenue" radius={[4, 4, 4, 4]} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}
