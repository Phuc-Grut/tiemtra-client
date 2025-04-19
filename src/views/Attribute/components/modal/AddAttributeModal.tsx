import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import useToast from "src/components/Toast";
import { IAddAttributeRequest } from "src/Interfaces/IAttribute";
import attributeApi from "src/services/api/Attributes";

interface Props {
  open: boolean;
  onClose: () => void;
}

const AddAttributeModal = ({ open, onClose }: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const { showSuccess, showError } = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: IAddAttributeRequest) => attributeApi.addAttributeApi(data),
    onSuccess: () => {
      onClose();
      // invalidateAllCategoryData();
      queryClient.invalidateQueries({ queryKey: ["attributes"] });
      showSuccess("Thêm thành công!");
    },
  });

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError(true);
      return;
    }
  
    setError(false);
  
    try {
  
      await mutation.mutateAsync({
        attributeName: name,
        attributeDescription: description,
      });
  
      setName("");
      setDescription("");
      onClose();
    } catch (err) {
      console.error("Lỗi khi thêm danh mục:", err);
      showError("Thêm thất bại!!");
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
      <DialogTitle>Thêm thuộc tính</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Tên thuộc tính"
          margin="dense"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (error && e.target.value.trim()) {
              setError(false);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              handleSubmit();
            }
          }}
          error={error}
          helperText={error ? "Vui lòng nhập tên thuộc tính" : ""}
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

export default AddAttributeModal;
