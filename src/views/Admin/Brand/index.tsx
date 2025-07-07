import { Box } from "@mui/material";
import { useState } from "react";
import PageHeader from "src/components/Layouts/Admin/PageHeader";
import BrandTable from "./components/BrandTable";
import BrandModal from "./components/modal/BrandModal";

const Brand = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit" | "view">("create");
  const [selectedBrandId, setSelectedBrandId] = useState<number | undefined>(undefined);

  const handleOpenCreate = () => {
    setModalMode("create");
    setSelectedBrandId(undefined);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (brandId: number) => {
    setModalMode("edit");
    setSelectedBrandId(brandId);
    setIsModalOpen(true);
  };

  const handleOpenView = (brandId: number) => {
    setModalMode("view");
    setSelectedBrandId(brandId);
    setIsModalOpen(true);
  };

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
        onAddClick={handleOpenCreate}
      />

      <Box
        sx={{
          flexGrow: 1,
          marginTop: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <BrandTable
          onEdit={handleOpenEdit}
          onView={handleOpenView}
        />
      </Box>

      <BrandModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        brandId={selectedBrandId}
        mode={modalMode}
      />
    </Box>
  );
};

export default Brand;
