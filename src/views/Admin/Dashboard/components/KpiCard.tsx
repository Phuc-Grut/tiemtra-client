// src/views/Admin/Dashboard/components/KpiCard.tsx
import React from "react";
import { Card, CardContent, Stack, Box, Typography } from "@mui/material";

export default function KpiCard({
  icon,
  label,
  value,
  change,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  change?: number;
}) {
  const changeColor = (change ?? 0) >= 0 ? "#16a34a" : "#dc2626";
  const changePrefix = (change ?? 0) >= 0 ? "+" : "";

  return (
    <Card sx={{ borderRadius: 3, height: "100%", boxShadow: "0 8px 30px rgba(0,0,0,0.06)" }}>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box sx={{ p: 1.2, borderRadius: 2, bgcolor: "rgba(0,0,0,0.05)" }}>{icon}</Box>
          <Box>
            <Typography variant="body2" color="text.secondary">{label}</Typography>
            <Typography variant="h6" fontWeight={700}>{value}</Typography>
            {typeof change === "number" && (
              <Typography variant="caption" sx={{ color: changeColor }}>
                {changePrefix}{change.toFixed(1)}% so với kỳ trước
              </Typography>
            )}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
