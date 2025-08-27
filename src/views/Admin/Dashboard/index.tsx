import { Box, Button, Grid, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DashboardHeader from "./components/DashboardHeader";
import AnalyticsFilter from "./components/AnalyticsFilter";
import KpiCards from "./components/KpiCards";
import RevenueLineChart from "./components/RevenueLineChart";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";
import {
  IDashboardRequest,
  IDashboardResponse,
} from "src/Interfaces/IAnalytics";
import analyticsApi from "src/services/api/Analytics";

type RangeKey = "today" | "7d" | "this_month" | "last_month" | "custom";

const labelMap: Record<RangeKey, string> = {
  today: "Hôm nay",
  "7d": "7 ngày qua",
  this_month: "Tháng này",
  last_month: "Tháng trước",
  custom: "Tùy chọn",
};

type AppliedFilter = {
  range: RangeKey;
  channel: string;
  from?: string;
  to?: string;
};

// map range từ filter -> request gọi API
function mapRangeToRequest(applied: AppliedFilter): IDashboardRequest {
  switch (applied.range) {
    case "today":
      return { period: "Today" };
    case "7d":
      return { period: "Last7Days" };
    case "this_month":
      return { period: "ThisMonth" };
    case "last_month":
      return { period: "LastMonth" };
    case "custom":
      return {
        period: "Custom",
        from: applied.from,
        to: applied.to,
      };
    default:
      return { period: "ThisMonth" };
  }
}

const Dashboard = () => {
  const [applied, setApplied] = useState<AppliedFilter>({
    range: "this_month",
    channel: "all",
  });

  const subtitle = useMemo(
    () => `${labelMap[applied.range]} • Kênh: ${applied.channel}`,
    [applied]
  );

  const [showFilter, setShowFilter] = useState(true);

  const isCustomValid =
  applied.range !== "custom" || (!!applied.from && !!applied.to);

  const requestParams = useMemo<IDashboardRequest>(
    () => mapRangeToRequest(applied),
    [applied]
  );
  const { data, isLoading, isFetching, error } = useQuery<IDashboardResponse>({
    queryKey: ["dashboard", requestParams],
    queryFn: async () => {
      const res = await analyticsApi.getDashboard(requestParams);
      return res.data;
    },
    enabled: isCustomValid, 
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        height: "calc(100vh - 63px)",
      }}
    >
      {/* Header */}
      <Box sx={{ flexShrink: 0, p: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <DashboardHeader title="Bảng điều khiển — Tiệm Trà" />
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {subtitle}
              {(isLoading || isFetching) && " • đang tải..."}
            </Typography>
          </Box>
          <Button
            size="small"
            startIcon={showFilter ? <CloseIcon /> : <FilterAltIcon />}
            onClick={() => setShowFilter((prev) => !prev)}
          >
            {showFilter ? "Ẩn bộ lọc" : "Hiện bộ lọc"}
          </Button>
        </Box>

        {showFilter && (
          <AnalyticsFilter
            onApply={(range, channel, from, to) =>
              setApplied({ range: range as any, channel, from, to })
            }
          />
        )}
      </Box>

      {/* Nội dung cuộn */}
      <Box sx={{ flex: 1, overflow: "auto", px: 1 }}>
        {/* Lỗi */}
        {error && (
          <Typography color="error" sx={{ mb: 1 }}>
            {(error as Error).message}
          </Typography>
        )}

        {/* KPI cards */}
        <KpiCards
          revenue={data?.revenue ?? 0}
          orders={data?.orderCount ?? 0}
          revChange={data?.revenueChangePct ?? 0}
          ordChange={data?.orderChangePct ?? 0}
          loading={isLoading || isFetching}
        />

        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          <Grid item xs={12} md={8}>
            <RevenueLineChart
              points={(data?.dailySeries ?? []).map((p) => ({
                // hiển thị MM/dd cho giống ảnh mẫu; cần thì đổi sang dd/MM
                label: new Date(p.date + "T00:00:00").toLocaleDateString(
                  "vi-VN",
                  {
                    day: "2-digit",
                    month: "2-digit",
                  }
                ),
                revenue: p.revenue,
              }))}
              loading={isLoading || isFetching}
            />
          </Grid>
          <Box sx={{ mt: 0, textAlign: "right", mb: 0 }}>
            <Button startIcon={<ShoppingBagIcon />} variant="contained">
              Xem danh sách đơn hàng
            </Button>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
