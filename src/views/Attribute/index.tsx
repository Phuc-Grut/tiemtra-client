import { Box } from "@mui/material";
import PageHeader from "src/components/Layouts/PageHeader";

const Attribute = () => {
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
        pageUrl="/admin/category"
      />
    </Box>
  );
};

export default Attribute;
