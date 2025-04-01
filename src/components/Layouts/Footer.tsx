import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#fff",
        padding: "16px",
        textAlign: "center",
        boxShadow: "0px -2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} Rookie-Coders. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
