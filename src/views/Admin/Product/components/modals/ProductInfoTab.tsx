import { Box, Button } from "@mui/material";
import { useState } from "react";
import { attributes, brands, categories } from "src/Interfaces/test";
import DetailedImagesSection from "./DetailedImagesSection";
import ProductFormSection from "./ProductFormSection";
import CategoryAttributesSection from "./CategoryAttributesSection";

const ProductInfoTab = () => {
  const [formData, setFormData] = useState({
    productCode: "",
    productName: "",
    previewImage: null as File | null,
    price: "",
    stock: "",
    origin: "",
    description: "",
    brandId: "",
  });

  const [detailedImages, setDetailedImages] = useState<File[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSubmit = () => {
    console.log("Form Data:", formData);
    console.log("Detailed Images:", detailedImages);
    console.log("Selected Category:", selectedCategory);
    console.log("Attributes:", attributes);
    // Thêm logic để lưu dữ liệu sản phẩm tại đây
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 3,
        p: 2,
        height: "100%",
        position: "relative",
      }}
    >
      {/* Danh sách ảnh chi tiết */}
      <DetailedImagesSection
        detailedImages={detailedImages}
        setDetailedImages={setDetailedImages}
      />

      {/* Form thông tin sản phẩm */}
      <ProductFormSection
        formData={formData}
        setFormData={setFormData}
        brands={brands}
      />

      {/* Danh mục và thuộc tính */}
      <CategoryAttributesSection
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        attributes={attributes}
      />

      {/* Nút Lưu */}
      <Box sx={{ position: "absolute", bottom: -21, right: 0 }}>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            bgcolor: "#508815",
            color: "#fff",
            textTransform: "none",
            fontWeight: 500,
            px: 3,
            py: 1,
            "&:hover": {
              bgcolor: "#5e9b17",
            },
          }}
        >
          Lưu
        </Button>
      </Box>
    </Box>
  );
};

export default ProductInfoTab;