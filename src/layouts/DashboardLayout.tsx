import React from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import TopBar from "src/components/Topbar";
import Footer from "src/components/Footer";

const MainLayout: React.FC = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#EEEEEE", overflowX: "hidden" }}>
      
      {/* ✅ TopBar nằm trên cùng */}
      <TopBar />

      {/* ✅ Khu vực Sidebar + Nội dung chính */}
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        
        {/* Sidebar */}
        <Sidebar />

        {/* Nội dung chính + Footer */}
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          
          {/* ✅ Nội dung sẽ mở rộng và đẩy Footer xuống */}
          <Box sx={{ flexGrow: 1, padding: "10px", display: "flex", flexDirection: "column" }}>
            <Outlet />
          </Box>

          {/* ✅ Footer luôn ở dưới cùng */}
          <Footer />
        </Box>
        
      </Box>
    </Box>
  );
};

export default MainLayout;
