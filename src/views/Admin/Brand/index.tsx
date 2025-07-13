import { Box } from "@mui/material";
import { useState } from "react";

import BrandTable from "./components/BrandTable";
import AddBrandModal from "./components/modal/AddBrand";
import PageHeader from "src/components/Layouts/Admin/PageHeader";

const Brand = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        minHeight: "calc(100vh - 121px)",
        padding: 1,
        paddingTop: 5,
      }}
    >
      <PageHeader
        pageTitle="Thương hiệu"
        pageUrl="/admin/brand"
        showAddButton
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
        <BrandTable />
      </Box>

      <AddBrandModal open={isAddOpen} onClose={() => setIsAddOpen(false)} />
    </Box>
  );
};

export default Brand;