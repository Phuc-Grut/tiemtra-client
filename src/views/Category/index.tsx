import { Box } from "@mui/material";
import PageHeader from "src/components/Layouts/PageHeader";
import CategoryTable from "./components/CategoryTable";
import { useState } from "react";
import AddCategoryModal from "./components/modal/AddCategory";

interface BreadcrumbItem {
  categoryId: number;
  categoryName: string;
}

const Category = () => {
  const [categoryType, setCategoryType] = useState<string | undefined>(
    undefined
  );
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [parentCategoryId, setParentCategoryId] = useState<
    number | undefined
  >();
  const [parentCategoryName, setParentCategoryName] = useState<
    string | undefined
  >();
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);

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
        breadcrumbs={breadcrumbs}
        pageTitle="Danh mục"
        pageUrl="/admin/category"
        showAddButton={categoryType !== "Attributes"}
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
        <CategoryTable
          onTypeChange={setCategoryType}
          onParentInfoChange={(id, name) => {
            setParentCategoryId(Number(id));
            setParentCategoryName(name);
          }}
          onBreadcrumbsChange={setBreadcrumbs}
        />
      </Box>
      <AddCategoryModal
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        parentCategoryId={parentCategoryId}
        parentCategoryName={parentCategoryName}
      />
    </Box>
  );
};

export default Category;
