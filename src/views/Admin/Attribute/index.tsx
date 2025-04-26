import { Box } from "@mui/material";
import AttributeTable from "./components/AttributeTable";
import { useState } from "react";
import AddAttributeModal from "./components/modal/AddAttributeModal";
import PageHeader from "src/components/Layouts/Admin/PageHeader";

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
        onAddClick={() => {
          setIsAddOpen(true);
        }}
      />

      <Box
        sx={{
          flexGrow: 1,
          marginTop: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AttributeTable />
      </Box>

      <AddAttributeModal open={isAddOpen} onClose={() => setIsAddOpen(false)} />
    </Box>
  );
};

export default Attribute;
