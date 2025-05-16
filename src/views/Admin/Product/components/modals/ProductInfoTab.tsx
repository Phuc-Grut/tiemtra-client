import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import ProductFormSection from "../ProductFormSection";
import CategoryAttributesSection from "../CategoryAttributesSection";
import ProductVariationsSection from "../ProductVariationsSection";
import { CreateProductRequest } from "src/Interfaces/IProduct";
import productApi from "src/services/api/Products/indext";
import categoryApi from "src/services/api/Category";
import { useQuery } from "@tanstack/react-query";

export interface CategoryDropdown {
  categoryId?: number;
  categoryName?: string;
}

const ProductInfoTab = () => {
  const [formData, setFormData] = useState<CreateProductRequest>({
    productCode: "",
    productName: "",
    price: null,
    stock: null,
    hasVariations: false,
    productImages: [],
    productAttributes: [],
    productVariations: [],
  });

  const [categories, setCategories] = useState<CategoryDropdown[]>([]);

  const [selectedCategoryID, setSelectedCategoryID] = useState("");
  console.log("🚀 ~ ProductInfoTab ~ selectedCategory:", selectedCategoryID)

  useEffect(() => {
    const fetchProductCode = async () => {
      const res = await productApi.generateProductCode();
      setFormData((prev) => ({
        ...prev,
        productCode: res.data,
      }));
    };
    fetchProductCode();
  }, []);

  useEffect(() => {
  const getLeafCategoriesAsync = async () => {
    const res = await categoryApi.getLeafCategories();
    const dropdownData: CategoryDropdown[] = res.data.map((cat) => ({
      categoryId: cat.categoryId,
      categoryName: cat.categoryName,
    }));

    setCategories(dropdownData);
  };

  getLeafCategoriesAsync();
}, []);

const {data: attributes} = useQuery({
  queryKey: ["get-attribute-by-categeryId", selectedCategoryID],
  queryFn: () =>
    categoryApi.getByIdApi({
      categoryId: Number(selectedCategoryID)
    }),
    select: (res) => {
      return res.data.data.items
    },
    enabled: !!selectedCategoryID
})

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
            // brands={brands}
          />
          <ProductVariationsSection />
        </Box>
        <Box sx={{ flex: 1 }}>
          <CategoryAttributesSection
            categories={categories}
            selectedCategory={selectedCategoryID}
            setSelectedCategory={setSelectedCategoryID}
            attributes={attributes}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ProductInfoTab;
