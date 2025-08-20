import { Box } from "@mui/material";
import PageHeader from "src/components/Layouts/Admin/PageHeader";
import CustomerTable from "./components/CustomerTable";

const Customer = () => {
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
        pageTitle="Khách hàng"
        pageUrl="/admin/customer"
        // onAddClick={() => setIsAddOpen(true)}
      />

      <Box
        sx={{
          flexGrow: 1,
          marginTop: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CustomerTable />
      </Box>
    </Box>
  );
};

export default Customer;
