// src/views/Admin/Dashboard/components/AnalyticsFilter.tsx
import React, { useMemo, useState } from "react";
import {
  Button, Card, CardContent, FormControl, Grid,
  InputLabel, MenuItem, Select, Stack, TextField
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

type Props = {
  // thêm from/to optional; với preset khác "custom" thì 2 giá trị này sẽ undefined
  onApply: (range: string, channel: string, from?: string, to?: string) => void;
};

export default function AnalyticsFilter({ onApply }: Props) {
  const [range, setRange] = useState("this_month");
  const [channel, setChannel] = useState("all");
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");

  const isCustom = range === "custom";
  const canSubmit = useMemo(() => {
    if (!isCustom) return true;
    return Boolean(from) && Boolean(to);
  }, [isCustom, from, to]);

  const handleApply = () => onApply(range, channel, isCustom ? from : undefined, isCustom ? to : undefined);

  const handleRefresh = () => {
    // reset về mặc định
    setRange("this_month");
    setChannel("all");
    setFrom("");
    setTo("");
    onApply("this_month", "all");
  };

  return (
    <Card sx={{ mb: 2, borderRadius: 3, boxShadow: "0 8px 30px rgba(0,0,0,0.06)" }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Khoảng thời gian</InputLabel>
              <Select
                label="Khoảng thời gian"
                value={range}
                onChange={(e) => setRange(e.target.value)}
              >
                <MenuItem value="today">Hôm nay</MenuItem>
                <MenuItem value="7d">7 ngày qua</MenuItem>
                <MenuItem value="this_month">Tháng này</MenuItem>
                <MenuItem value="last_month">Tháng trước</MenuItem>
                <MenuItem value="custom">Tùy chọn…</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* nếu chọn Tùy chọn thì hiện 2 ô ngày */}
          {isCustom && (
            <>
              <Grid item xs={12} sm={4} md={3}>
                <TextField
                  fullWidth size="small" type="date" label="From"
                  InputLabelProps={{ shrink: true }}
                  value={from} onChange={(e) => setFrom(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <TextField
                  fullWidth size="small" type="date" label="To"
                  InputLabelProps={{ shrink: true }}
                  value={to} onChange={(e) => setTo(e.target.value)}
                />
              </Grid>
            </>
          )}

          <Grid item xs={12} sm={4} md={isCustom ? 3 : 9}>
            <Stack direction="row" spacing={1} justifyContent={{ xs: "flex-start", md: "flex-end" }}>
              <Button variant="outlined" startIcon={<RefreshIcon />} onClick={handleRefresh}>
                Làm mới
              </Button>
              <Button variant="contained" onClick={handleApply} disabled={!canSubmit}>
                Áp dụng
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
