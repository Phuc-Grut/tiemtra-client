import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import { IBrand } from "src/Interfaces/IBrand";
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

  const [brandName, setBrandName] = useState("");
  const [description, setDescription] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    if ((isEditMode || isViewMode) && brandId) {
      brandApi.getByIdApi({ id: brandId }).then((res) => {
        const brand: IBrand = res.data;
        setBrandName(brand.brandName);
        setDescription(brand.description || "");
        setPreviewUrl(brand.logo || "");
      });
    } else if (isCreateMode) {
      setBrandName("");
      setDescription("");
      setLogoFile(null);
      setPreviewUrl("");
    }
  }, [brandId, mode]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("brandName", brandName);
      formData.append("description", description);
      if (logoFile) formData.append("logoFile", logoFile);

      if (isCreateMode) {
        await brandApi.addBrandApi(formData);
      } else if (isEditMode && brandId) {
        await brandApi.updateBrandApi(brandId, formData);
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
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          margin="normal"
          disabled={isViewMode}
        />
        <TextField
          fullWidth
          label="Mô tả"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          multiline
          minRows={3}
          disabled={isViewMode}
        />
        {!isViewMode && (
          <Box mt={2}>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </Box>
        )}
        {previewUrl && (
          <Box mt={2}>
            <img
              src={previewUrl}
              alt="Logo Preview"
              style={{ width: 80, height: 80, borderRadius: 4 }}
            />
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