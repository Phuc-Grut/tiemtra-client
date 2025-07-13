import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import brandApi from "src/services/api/Brand";
import useToast from "src/components/Toast";
import { IAddBrandRequest } from "src/Interfaces/IBrand";

interface Props {
  open: boolean;
  onClose: () => void;
}

const AddBrandModal: React.FC<Props> = ({ open, onClose }) => {
  const [brandName, setBrandName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { showSuccess, showError } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      let logoUrl = "";
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        const uploadRes = await brandApi.uploadBrandImage(formData);
        logoUrl = uploadRes.data;
      }

      const payload: IAddBrandRequest = {
        brandName,
        description,
        logoUrl,
      };

      return brandApi.createBrand(payload);
    },
    onSuccess: () => {
      showSuccess("Thêm thương hiệu thành công!");
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      onClose();
      setBrandName("");
      setDescription("");
      setImageFile(null);
    },
    onError: () => showError("Thêm thương hiệu thất bại!"),
  });

  const handleSubmit = () => {
    if (!brandName.trim()) {
      showError("Tên thương hiệu không được để trống.");
      return;
    }
    mutation.mutate();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Thêm thương hiệu</DialogTitle>
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
          Upload ảnh logo
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
          Thêm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBrandModal;