import { Outlet } from "react-router-dom";
import Footer from "src/components/Layouts/Stores/Footer";
import Header from "src/components/Layouts/Stores/Header";
import { Box } from "@mui/material";
import HideOnScroll from "src/components/HideOnScroll";

const StoreLayout = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff"
      }}
    >
      <Header />
      <HideOnScroll>
        <Box
          sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1200 }}
        >
          <Header />
        </Box>
      </HideOnScroll>
      <Box sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default StoreLayout;
