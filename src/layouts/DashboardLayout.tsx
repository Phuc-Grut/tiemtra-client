import React from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import TopBar from "src/components/Topbar";
import Footer from "src/components/Footer";

const MainLayout: React.FC = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#EEEEEE", overflowX: "hidden" }}>
      
      <TopBar />

      <Box sx={{ display: "flex", flexGrow: 1 }}>
        
        {/* Sidebar */}
        <Sidebar />

        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          
          <Box sx={{ flexGrow: 1, padding: "10px", display: "flex", flexDirection: "column" }}>
            <Outlet />
          </Box>

          <Footer />
        </Box>
        
      </Box>
    </Box>
  );
};

export default MainLayout;
