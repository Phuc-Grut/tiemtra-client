// src/views/Admin/Dashboard/components/AnalyticsFilter.tsx
import React, { useState } from "react";
import { Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function AnalyticsFilter({ onApply }: { onApply: (range: string, channel: string) => void }) {
  const [range, setRange] = useState("this_month");
  const [channel, setChannel] = useState("all");

  return (
    <Card sx={{ mb: 2, borderRadius: 3, boxShadow: "0 8px 30px rgba(0,0,0,0.06)" }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Khoảng thời gian</InputLabel>
              <Select label="Khoảng thời gian" value={range} onChange={(e) => setRange(e.target.value)}>
                <MenuItem value="today">Hôm nay</MenuItem>
                <MenuItem value="7d">7 ngày qua</MenuItem>
                <MenuItem value="this_month">Tháng này</MenuItem>
                <MenuItem value="last_month">Tháng trước</MenuItem>
                <MenuItem value="custom">Tùy chọn…</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Kênh bán</InputLabel>
              <Select label="Kênh bán" value={channel} onChange={(e) => setChannel(e.target.value)}>
                <MenuItem value="all">Tất cả</MenuItem>
                <MenuItem value="web">Website</MenuItem>
                <MenuItem value="tiktok">TikTok</MenuItem>
                <MenuItem value="facebook">Facebook</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4} md={6}>
            <Stack direction="row" spacing={1} justifyContent={{ xs: "flex-start", md: "flex-end" }}>
              <Button variant="outlined" startIcon={<RefreshIcon />} onClick={() => onApply(range, channel)}>
                Làm mới
              </Button>
              <Button variant="contained" onClick={() => onApply(range, channel)}>
                Áp dụng
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
