import { Box, Tabs, Tab, Dialog, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import ProductInfoTab from "../ProductInfoTab";
import DetailedImagesSection from "../DetailedImagesSection";
import { CreateProductRequest } from "src/Interfaces/IProduct";
import useToast from "src/components/Toast";
import productApi from "src/services/api/Products/indext";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type Mode = "create" | "edit" | "view";

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
  productId?: string;
  mode: Mode;
}

const ProductModal = ({
  open,
  onClose,
  productId,
  mode,
}: AddProductModalProps) => {
  const { showSuccess, showError } = useToast();
  const [activeTab, setActiveTab] = useState(0);
  const queryClient = useQueryClient();

  const tabLabelsMap = {
    create: ["Thêm sản phẩm", "Ảnh chi tiết"],
    edit: ["Chỉnh sửa sản phẩm", "Ảnh chi tiết"],
    view: ["Xem chi tiết", "Ảnh chi tiết"],
  } as const;

  const tabLabels = tabLabelsMap[mode];

  const initialFormData: CreateProductRequest = {
    productCode: "",
    productName: "",
    privewImageUrl: "",
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
    productStatus: undefined,
    note: "",
    totalSold: null,
  };

  const [formData, setFormData] =
    useState<CreateProductRequest>(initialFormData);

  const [selectedCategoryID, setSelectedCategoryID] = useState<
    number | undefined
  >(undefined);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <ProductInfoTab
            formData={formData}
            setFormData={setFormData}
            selectedCategoryID={selectedCategoryID}
            setSelectedCategoryID={setSelectedCategoryID}
            mode={mode}
          />
        );
      case 1:
        return (
          <DetailedImagesSection
            formData={formData}
            setFormData={setFormData}
            mode={mode}
          />
        );
      default:
        return null;
    }
  };

  const handleCreateSubmit = async () => {
    try {
      const res = await productApi.createProduct(formData);

      if (res.data.success) {
        showSuccess("Thêm thành công");
        setFormData(initialFormData);
        queryClient.invalidateQueries({
          queryKey: ["get-paging-product"],
        });
        onClose();
      } else {
        showError("Thêm thất bại");
      }
    } catch (error) {
      console.error("Lỗi", error);
      showError("Thêm thất bại");
    }
  };

  const handleUpdateSubmit = async () => {
    try {
      const res = await productApi.updateProduct(productId ?? "", formData);

      if (res.data.success) {
        showSuccess("Sửa thành công");
        setFormData(initialFormData);

        queryClient.invalidateQueries({
          queryKey: ["get-paging-product"],
        });

        onClose();
      } else {
        showError("Sửa thất bại");
      }
    } catch (error) {
      console.error("Lỗi", error);
      showError("Sửa thất bại");
    }
  };

  const { data: productDetail } = useQuery({
    queryKey: ["productDetail", productId],
    queryFn: async () => {
      const response = await productApi.getByIdApi({ productId });
      return response.data;
    },
    enabled: !!productId && (mode === "edit" || mode === "view"),
  });

  useEffect(() => {
    if (productDetail) {
      setFormData({
        ...productDetail,
        productVariations: productDetail.productVariations ?? [],
      });
    }
  }, [productDetail]);

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
          // height: "95vh",
          minHeight: "95%",
          width: { xs: "90%", md: "80%", lg: "95%" },
          maxWidth: "none",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {/* Close Button */}

        {/* Tabs - Header */}
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 5,
            borderBottom: 1,
            borderColor: "divider",
            bgcolor: "#f5f5f5",
            flexShrink: 0,
          }}
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
        </Box>

        {/* Scrollable Content */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            p: 4,
            bgcolor: "#fff",
          }}
        >
          {renderContent()}
        </Box>

        {mode !== "view" && (
          <Box
            sx={{
              px: 4,
              pb: 4,
              pt: 2,
              textAlign: "right",
              bgcolor: "#fff",
              flexShrink: 0,
              borderTop: "1px solid #eee",
            }}
          >
            <Button
              onClick={
                mode === "create" ? handleCreateSubmit : handleUpdateSubmit
              }
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
        )}
      </Box>
    </Dialog>
  );
};

export default ProductModal;
