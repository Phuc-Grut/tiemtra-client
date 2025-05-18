import { Box } from "@mui/material";
import { useState } from "react";
import PageHeader from "src/components/Layouts/Admin/PageHeader";
import AddProductModal from "./components/modals/AddProductModal";
import ProductTable from "./components/ProductTable";

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

      <AddProductModal open={isAddOpen} onClose={() => setIsAddOpen(false)} />
    </Box>
  );
};

export default Product;
