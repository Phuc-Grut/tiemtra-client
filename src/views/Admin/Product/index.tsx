import { Box } from "@mui/material";
import { useState } from "react";
import PageHeader from "src/components/Layouts/Admin/PageHeader";
import ProductTable from "./components/ProductTable";
import ProductModal from "./components/modals/ProductModal";

const Product = () => {
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
        pageTitle="Sản phẩm"
        pageUrl="/admin/product"
        onAddClick={() => setIsAddOpen(true)}
      />

      <Box
        sx={{
          flexGrow: 1,
          marginTop: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ProductTable />
      </Box>

      <ProductModal open={isAddOpen} onClose={() => setIsAddOpen(false)} mode = "create"/>
    </Box>
  );
};

export default Product;
