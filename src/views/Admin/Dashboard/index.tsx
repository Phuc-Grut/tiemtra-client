// import { useNavigate } from "react-router-dom"

import { Box, Button, Grid, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import DashboardHeader from "./components/DashboardHeader";
import AnalyticsFilter from "./components/AnalyticsFilter";
import KpiCards from "./components/KpiCards";
import RevenueLineChart from "./components/RevenueLineChart";
import OrdersStatusPie from "./components/OrdersStatusPie";
import TopProductsBarChart from "./components/TopProductsBarChart";
import TopCustomersTable from "./components/TopCustomersTable";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";

const Dashboard = () => {
  const [applied, setApplied] = useState({
    range: "this_month",
    channel: "all",
  });

  const subtitle = useMemo(() => {
    const labelMap: Record<string, string> = {
      today: "Hôm nay",
      "7d": "7 ngày qua",
      this_month: "Tháng này",
      last_month: "Tháng trước",
      custom: "Tùy chọn",
    };
    return `${labelMap[applied.range]} • Kênh: ${applied.channel}`;
  }, [applied]);

  const [showFilter, setShowFilter] = useState(true);

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
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box>
            <DashboardHeader title="Bảng điều khiển — Tiệm Trà" />
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {subtitle}
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
            onApply={(range, channel) => setApplied({ range, channel })}
          />
        )}
      </Box>

      {/* Nội dung cuộn */}
      <Box sx={{ flex: 1, overflow: "auto", px: 1 }}>
        <KpiCards />
        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          <Grid item xs={12} md={8}>
            <RevenueLineChart />
          </Grid>
          <Grid item xs={12} md={4}>
            <OrdersStatusPie />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          <Grid item xs={12} md={8}>
            <TopProductsBarChart />
          </Grid>
          <Grid item xs={12} md={4}>
            <TopCustomersTable />
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, textAlign: "right", mb: 3 }}>
          <Button startIcon={<ShoppingBagIcon />} variant="contained">
            Xem danh sách đơn hàng
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
