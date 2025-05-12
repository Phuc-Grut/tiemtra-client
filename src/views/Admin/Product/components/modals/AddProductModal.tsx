import { Box, Tabs, Tab, Dialog, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import ProductInfoTab from "./ProductInfoTab";
import DetailedImagesSection from "../DetailedImagesSection";

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
}

const tabLabels = ["Thêm sản phẩm", "Ảnh chi tiết"];

const AddProductModal = ({ open, onClose }: AddProductModalProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const [detailedImages, setDetailedImages] = useState<File[]>([]);
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

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <ProductInfoTab />;
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
    console.log("Form Data:", formData);
    console.log("Selected Category:", selectedCategory);
    // console.log("Attributes:", attributes);
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
          overflow: "hidden",
          height: "100%",
          maxHeight: "95%",
          position: "relative",
          width: { xs: "90%", md: "80%", lg: "90%" },
          maxWidth: "none",
        },
      }}
    >
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
      <Box sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "#f5f5f5" }}>
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
      <Box sx={{ p: 4, flex: 1, overflowY: "auto" }}>{renderContent()}</Box>

      <Box sx={{ px: 4, pb: 4, textAlign: "right" }}>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            bgcolor: "#508815",
            color: "#fff",
            textTransform: "none",
            fontWeight: 500,
            borderRadius: 1,
            boxShadow: 2,
            "&:hover": {
              bgcolor: "#5e9b17",
            },
          }}
        >
          Lưu
        </Button>
      </Box>
    </Dialog>
  );
};

export default AddProductModal;
