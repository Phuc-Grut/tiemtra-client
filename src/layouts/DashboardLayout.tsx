import { Box, useMediaQuery, useTheme } from "@mui/material";
import Sidebar from "../components/Layouts/Admin/Sidebar";
import { Outlet } from "react-router-dom";
import TopBar from "src/components/Layouts/Admin/Topbar";
import Footer from "src/components/Layouts/Admin/Footer";
import { useState } from "react";
import { SidebarContext } from "src/components/Layouts/SidebarContext";

const AdminDashboard = () => {
  const [expanded, setExpanded] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#EEEEEE",
        // overflowX: "auto",
        width: "100vw",
      }}
    >
      <TopBar setExpanded={setExpanded} />
      {/* <TopBar setExpanded={setExpanded} /> */}

      <Box sx={{ display: "flex", flexGrow: 1 }}>
        {!isMobile && <Sidebar expanded={expanded} setExpanded={setExpanded} />}
        {isMobile && <Sidebar expanded={expanded} setExpanded={setExpanded} />}

        <SidebarContext.Provider value={{ expanded }}>
          <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                flexGrow: 1,
                marginTop: "10px",
                display: "flex",
                flexDirection: "column",
                width: isMobile ? "100vw" : "auto",
              }}
            >
              <Outlet />
            </Box>

            <Footer />
          </Box>
        </SidebarContext.Provider>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
