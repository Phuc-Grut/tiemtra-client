import { Box, Tabs, Tab, Dialog, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import ProductInfoTab from "./ProductInfoTab";

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
}

const tabLabels = ["Thêm sản phẩm"];

const AddProductModal = ({ open, onClose }: AddProductModalProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <ProductInfoTab />;
      default:
        return null;
    }
  };

  return (
    <Dialog
      open={open}
      onClick={() => {
        onClose();
      }}
      maxWidth="xl"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          overflow: "hidden",
          height: "95%",
          maxHeight: "95%",
          position: "relative",
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          color: "#666",
          "&:hover": {
            color: "#333",
            backgroundColor: "#e8e8e8",
          },
        }}
      >
        <CloseIcon />
      </IconButton>

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
    </Dialog>
  );
};

export default AddProductModal;
