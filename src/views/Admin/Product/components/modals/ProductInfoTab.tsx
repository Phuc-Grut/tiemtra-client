import { Box } from "@mui/material";
import { useState } from "react";
import { attributes, brands, categories } from "src/Interfaces/test";
import ProductFormSection from "../ProductFormSection";
import CategoryAttributesSection from "../CategoryAttributesSection";

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

  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          p: 2,
          flex: 1,
          overflow: "auto",
        }}
      >
        <Box sx={{ flex: 2 }}>
          <ProductFormSection
            formData={formData}
            setFormData={setFormData}
            brands={brands}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <CategoryAttributesSection
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            attributes={attributes}
          />
        </Box>
      </Box>

      
    </Box>
  );
};

export default ProductInfoTab;