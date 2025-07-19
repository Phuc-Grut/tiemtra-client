import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IBrand, IUpdateBrandRequest } from "src/Interfaces/IBrand";
import brandApi from "src/services/api/Brand";
import useToast from "src/components/Toast";

interface Props {
  open: boolean;
  onClose: () => void;
  brand: IBrand | null;
}

const UpdateBrandModal: React.FC<Props> = ({ open, onClose, brand }) => {
  const [brandName, setBrandName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { showSuccess, showError } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (brand) {
      setBrandName(brand.brandName || "");
      setDescription(brand.description || "");
    }
  }, [brand]);

  const mutation = useMutation({
    mutationFn: async () => {
      let logoUrl = brand?.logoUrl || "";
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        const uploadRes = await brandApi.uploadBrandImage(formData);
        logoUrl = uploadRes.data;
      }

      const payload: IUpdateBrandRequest = {
        brandName,
        description,
        logoUrl,
      };

      return brandApi.updateBrand(brand!.brandId, payload);

    },
    onSuccess: () => {
      showSuccess("Cập nhật thương hiệu thành công!");
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      onClose();
    },
    onError: () => showError("Cập nhật thất bại!"),
  });

  const handleSubmit = () => {
    if (!brandName.trim() || !brand) {
      showError("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    mutation.mutate();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Cập nhật thương hiệu</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
        <TextField
          label="Tên thương hiệu"
          fullWidth
          size="small"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
        />
        <TextField
          label="Mô tả"
          fullWidth
          size="small"
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button variant="outlined" component="label">
          Thay ảnh logo
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setImageFile(file);
            }}
          />
        </Button>
        {imageFile && <span style={{ fontSize: 12 }}>{imageFile.name}</span>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={mutation.isPending}>
          Cập nhật
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateBrandModal;