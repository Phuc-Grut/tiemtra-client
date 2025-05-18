import { Box, Tabs, Tab, Dialog, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import ProductInfoTab from "./ProductInfoTab";
import DetailedImagesSection from "../DetailedImagesSection";
import { CreateProductRequest } from "src/Interfaces/IProduct";

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
}

const tabLabels = ["Thêm sản phẩm", "Ảnh chi tiết"];

const AddProductModal = ({ open, onClose }: AddProductModalProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const [formData, setFormData] = useState<CreateProductRequest>({
    productCode: "",
    productName: "",
    privewImage: undefined,
    price: null,
    stock: null,
    origin: "",
    description: "",
    hasVariations: false,
    categoryId: undefined,
    brandId: undefined,
    productImageUrls: [],
    productAttributes: [],
    productVariations: [],
  });

  const [selectedCategoryID, setSelectedCategoryID] = useState<
    number | undefined
  >(undefined);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const [detailedImages, setDetailedImages] = useState<File[]>([]);

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <ProductInfoTab
            formData={formData}
            setFormData={setFormData}
            selectedCategoryID={selectedCategoryID}
            setSelectedCategoryID={setSelectedCategoryID}
          />
        );
      case 1:
        return (
          <DetailedImagesSection
            detailedImages={detailedImages}
            setDetailedImages={setDetailedImages}
          />
        );
      default:
        return null;
    }
  };

  const handleSubmit = () => {
    console.log("🚀 ~ AddProductModal ~ formData:", formData);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      keepMounted={false}
      maxWidth="xl"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          height: "95vh",
          display: "flex",
          flexDirection: "column",
          width: { xs: "90%", md: "80%", lg: "90%" },
          maxWidth: "none",
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Button
          onClick={onClose}
          sx={{
            zIndex: 10,
            width: 40,
            height: 40,
            minWidth: "unset",
            borderRadius: "50%",
            backgroundColor: "#f5f5f5",
            position: "absolute",
            color: "#333",
            top: 8,
            right: 8,
            padding: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "&:hover": {
              backgroundColor: "#f5f5f5",
              color: "#333",
            },
          }}
        >
          <CloseIcon sx={{ fontSize: 28 }} />
        </Button>

        {/* Tabs tích hợp bên trong modal */}
        <Box
          sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "#f5f5f5" }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="product tabs"
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "#508815",
                height: 3,
              },
              px: 2,
            }}
          >
            {tabLabels.map((label, index) => (
              <Tab
                key={label}
                label={label}
                sx={{
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: 14,
                  color: activeTab === index ? "#508815" : "#666",
                  "&:hover": {
                    color: "#508815",
                    backgroundColor: "#e8e8e8",
                  },
                  "&.Mui-selected": {
                    color: "#508815",
                    fontWeight: 600,
                  },
                  px: 3,
                  py: 1.5,
                }}
              />
            ))}
          </Tabs>
        </Box>

        {/* Nội dung bên trong modal */}
        <Box sx={{ p: 4, flex: 1 }}>{renderContent()}</Box>

        <Box
          sx={{
            px: 4,
            pb: 4,
            pt: 2,
            textAlign: "right",
            bgcolor: "#fff",
            flexShrink: 0, // 👈 NGĂN không bị co lại
          }}
        >
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              bgcolor: "#508815",
              color: "#fff",
              textTransform: "none",
              fontWeight: 500,
              boxShadow: 2,
              "&:hover": {
                bgcolor: "#5e9b17",
              },
            }}
          >
            Lưu
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default AddProductModal;
