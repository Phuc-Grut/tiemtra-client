import { Box } from "@mui/material";
import { useState } from "react";
import PageHeader from "src/components/Layouts/Admin/PageHeader";
import VoucherComponent from "./components/VoucherComponent";

const VoucherPage = () => {

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        minHeight: "calc(100vh-121px)",
        padding: 1,
        paddingTop: 5,
      }}
    >
      <PageHeader
        pageTitle="Voucher"
        pageUrl="/admin/voucher"
      />

      <Box
        sx={{
          flexGrow: 1,
          marginTop: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <VoucherComponent />
      </Box>
    </Box>
  );
};

export default VoucherPage;
