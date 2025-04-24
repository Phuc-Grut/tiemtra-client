import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IAddCategoryRequest, ICategory } from "src/Interfaces/ICategory";
import categoryApi from "src/services/api/Category";
import useToast from "src/components/Toast";

interface Props {
  open: boolean;
  onClose: () => void;
  parentCategoryName?: string | null;
  parentCategoryId?: number;
  category: ICategory | null;
}

const UpdateCategoryModal = ({
  open,
  onClose,
  category,
  parentCategoryName,
}: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const { showSuccess, showError } = useToast();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (open && category) {
      setName(category.categoryName ?? "");
      setDescription(category.description ?? "");
    }
  }, [open, category]);

  const invalidateAllCategoryData = () => {
    queryClient.invalidateQueries({
      predicate: (query) =>
        ["category", "categories"].includes(query.queryKey[0] as string),
    });
  };

  const mutation = useMutation({
    mutationFn: (data: IAddCategoryRequest) =>
      categoryApi.updateCategoryApi(category?.categoryId!, data),
    onSuccess: () => {
      invalidateAllCategoryData();
      onClose();
      showSuccess("Sửa thành công!");
    },
  });

  const handleSubmit = async () => {
    if (!category?.categoryId) return;
    if (!name.trim()) {
      setError(true);
      return;
    }

    setError(false);
    try {
      await mutation.mutateAsync({
        categoryName: name,
        description: description,
      });

      setName("");
      setDescription("");
      onClose();
    } catch (err) {
      console.error("Lỗi khi sửa danh mục:", err);
      showError("Sửa thất bại!!");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      PaperProps={{
        sx: {
          top: "50%",
          transform: "translateY(-70%)",
          position: "absolute",
        },
      }}
    >
      <DialogTitle>Sửa danh mục</DialogTitle>
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
              setError(false);
            }
          }}
          error={error}
          helperText={error ? "Vui lòng nhập tên danh mục" : ""}
        />

        <TextField
          fullWidth
          label="Mô tả"
          multiline
          minRows={4}
          margin="dense"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmit();
            }
          }}
          sx={{ backgroundColor: "#FFA726", color: "white" }}
        >
          Sửa
        </Button>
        <Button variant="outlined" onClick={onClose}>
          Hủy
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateCategoryModal;
