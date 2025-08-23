import React, { SyntheticEvent } from "react";
import { Container, Paper, Tabs, Tab, Typography, Box } from "@mui/material";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import OrdersTab from "./components/OrdersTab";
import ProfileTab from "./components/ProfileTab";

type TabKey = "orders" | "profile";
const tabIndexByKey: Record<TabKey, number> = { orders: 0, profile: 1 };
const tabKeyByIndex: TabKey[] = ["orders", "profile"];

const AccountPage: React.FC = () => {
  const [tab, setTab] = React.useState<TabKey>("orders");

  const handleTabChange = (_: SyntheticEvent, newIndex: number) => {
    setTab(tabKeyByIndex[newIndex]);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 3 },
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          background:
            "linear-gradient(180deg, rgba(46,125,50,0.04) 0%, rgba(46,125,50,0.00) 100%)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1 }}>
          <AssignmentIndIcon color="success" />
          <Typography variant="h5" fontWeight={700}>
            Tài khoản của tôi
          </Typography>
        </Box>

        <Tabs
          value={tabIndexByKey[tab]}
          onChange={handleTabChange}
          textColor="inherit"
          TabIndicatorProps={{ sx: { backgroundColor: "success.main", height: 3, borderRadius: 3 } }}
          sx={{
            "& .MuiTab-root": { fontWeight: 600, letterSpacing: 0.3 },
            "& .MuiTab-root.Mui-selected": { color: "success.main" },
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Tab label="ĐƠN HÀNG" />
          <Tab label="THÔNG TIN TÀI KHOẢN" />
        </Tabs>

        <Box sx={{ mt: 3 }}>
          {tab === "orders" && <OrdersTab />}
          {tab === "profile" && <ProfileTab />}
        </Box>
      </Paper>
    </Container>
  );
};

export default AccountPage;
