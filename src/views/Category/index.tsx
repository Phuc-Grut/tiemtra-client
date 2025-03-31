import { Box } from "@mui/material";
import PageHeader from "src/components/Dashboard/Layouts/PageHeader";
import CategoryTable from "./components/CategoryTable";
import { useState } from "react";

const Category = () => {
  const [categoryType, setCategoryType] = useState<string | undefined>(
    undefined
  );

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
        title="Trang Danh Mục"
        showAddButton={categoryType !== "Attributes"}
      />

      <Box
        sx={{
          flexGrow: 1,
          marginTop: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CategoryTable onTypeChange={setCategoryType} />
      </Box>
    </Box>
  );
};

export default Category;
