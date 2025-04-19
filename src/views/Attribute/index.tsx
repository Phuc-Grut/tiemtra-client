import { Box } from "@mui/material";
import PageHeader from "src/components/Layouts/PageHeader";
import AttributeTable from "./components/AttributeTable";
import { useState } from "react";
import AddAttributeModal from "./components/modal/AddAttributeModal";

const Attribute = () => {
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
        pageTitle="Thuộc tính"
        pageUrl="/admin/attribute"
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
        <AttributeTable
        // onTypeChange={setCategoryType}
        // onParentInfoChange={(id, name) => {
        //   setParentCategoryId(Number(id));
        //   setParentCategoryName(name);
        // }}
        // onBreadcrumbsChange={setBreadcrumbs}
        />
      </Box>

      <AddAttributeModal open={isAddOpen}
      onClose={() => setIsAddOpen(false)}
      />
    </Box>
  );
};

export default Attribute;
