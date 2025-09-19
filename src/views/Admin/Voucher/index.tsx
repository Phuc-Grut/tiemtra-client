import { Box } from "@mui/material";
import PageHeader from "src/components/Layouts/Admin/PageHeader";
import VoucherTable from "./components/VoucherTable";
import { useState } from "react";
import VoucherDetailDialog from "./components/VoucherDetailDialog";

const VoucherPage = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  
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
        onAddClick={() => setIsAddOpen(true)}
        showAddButton={true}
      />

      <Box
        sx={{
          flexGrow: 1,
          marginTop: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <VoucherTable />
      </Box>

      <VoucherDetailDialog open={isAddOpen} onClose={() => setIsAddOpen(false)} mode="create" />
    </Box>
  );
};

export default VoucherPage;
