import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import { IAddBrandRequest, IBrand } from "src/Interfaces/IBrand";
import brandApi from "src/services/api/Brand";

interface BrandModalProps {
  open: boolean;
  onClose: () => void;
  brandId?: number;
  mode: "view" | "edit" | "create";
}

const BrandModal = ({ open, onClose, brandId, mode }: BrandModalProps) => {
  const isViewMode = mode === "view";
  const isEditMode = mode === "edit";
  const isCreateMode = mode === "create";

  const [form, setForm] = useState<IAddBrandRequest>({
    brandName: "",
    description: "",
    logo: "",
  });

  const [metadata, setMetadata] = useState<Partial<IBrand>>({});

  useEffect(() => {
    if ((isEditMode || isViewMode) && brandId) {
      brandApi.getByIdApi({ id: brandId }).then((res) => {
        const brand: IBrand = res.data;
        setForm({
          brandName: brand.brandName || "",
          description: brand.description || "",
          logo: brand.logo || "",
        });
        setMetadata({
          creatorName: brand.creatorName,
          updaterName: brand.updaterName,
          createdAt: brand.createdAt,
          updatedAt: brand.updatedAt,
        });
      });
    } else if (isCreateMode) {
      setForm({ brandName: "", description: "", logo: "" });
      setMetadata({});
    }
  }, [brandId, mode]);

  const handleChange = (field: keyof IAddBrandRequest, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (isCreateMode) {
        await brandApi.addBrandApi(form);
      } else if (isEditMode && brandId) {
        await brandApi.updateBrandApi(brandId, form);
      }
      onClose();
    } catch (error) {
      console.error("Error submitting brand:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {isCreateMode
          ? "Thêm thương hiệu"
          : isViewMode
          ? "Chi tiết thương hiệu"
          : "Chỉnh sửa thương hiệu"}
      </DialogTitle>

      <DialogContent dividers>
        <TextField
          fullWidth
          label="Tên thương hiệu"
          value={form.brandName}
          onChange={(e) => handleChange("brandName", e.target.value)}
          margin="normal"
          disabled={isViewMode}
        />
        <TextField
          fullWidth
          label="Mô tả"
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
          margin="normal"
          disabled={isViewMode}
          multiline
          minRows={3}
        />
        <TextField
          fullWidth
          label="Logo URL"
          value={form.logo}
          onChange={(e) => handleChange("logo", e.target.value)}
          margin="normal"
          disabled={isViewMode}
        />

        {isViewMode && (
          <Box mt={2}>
            <Typography variant="body2">
              <strong>Người tạo:</strong> {metadata.creatorName || "Không rõ"}
            </Typography>
            <Typography variant="body2">
              <strong>Ngày tạo:</strong>{" "}
              {metadata.createdAt
                ? new Date(metadata.createdAt).toLocaleString()
                : "Không rõ"}
            </Typography>
            <Typography variant="body2">
              <strong>Người sửa cuối:</strong> {metadata.updaterName || "Không rõ"}
            </Typography>
            <Typography variant="body2">
              <strong>Ngày cập nhật:</strong>{" "}
              {metadata.updatedAt
                ? new Date(metadata.updatedAt).toLocaleString()
                : "Không rõ"}
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        {!isViewMode && (
          <Button onClick={handleSubmit} variant="contained">
            Lưu
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default BrandModal;