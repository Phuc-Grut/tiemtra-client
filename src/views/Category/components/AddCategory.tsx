import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

interface Props {
  open: boolean;
  onClose: () => void;
  parentCategoryName?: string;
  parentCategoryId?: number;
}

const AddCategoryModal = ({ open, onClose, parentCategoryName, parentCategoryId }: Props) => {
  console.log("🚀 ~ AddCategoryModal ~ parentCategoryId:", parentCategoryId)
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (!name.trim()) {
      setError(true);
      return;
    }

    setError(false);

    // TODO: gọi API thêm danh mục ở đây
    console.log("Tên:", name, "Mô tả:", description);

    // Đóng modal
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Thêm danh mục</DialogTitle>
      <DialogContent>
        {parentCategoryName && (
          <TextField
            fullWidth
            label="Danh mục cha"
            value={parentCategoryName}
            margin="dense"
            InputProps={{
              readOnly: true,
              sx: { opacity: 0.6, cursor: "default", fontWeight: "bold" },
              endAdornment: <LockIcon fontSize="medium" color="secondary" />,
            }}
          />
        )}

        <TextField
          fullWidth
          label="Tên danh mục"
          margin="dense"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (error && e.target.value.trim()) {
              setError(false)
            }
          }}          
          error={error}
          helperText={error ? "Vui lòng nhập tên danh mục" : ""}
        />

        <TextField
          fullWidth
          label="Mô tả"
          multiline
          minRows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Thêm
        </Button>
        <Button variant="outlined" onClick={onClose}>
          Hủy
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCategoryModal;
