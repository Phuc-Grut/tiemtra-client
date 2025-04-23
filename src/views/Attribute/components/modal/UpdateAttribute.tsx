import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { IAddAttributeRequest, IAttribute } from "src/Interfaces/IAttribute";
import useToast from "src/components/Toast";
import attributeApi from "src/services/api/Attributes";

interface props {
  open: boolean;
  onClose: () => void;
  attribute: IAttribute | null;
}

const UpdateAttribute = ({ open, onClose, attribute }: props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);

  const { showSuccess, showError } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if(open && attribute){
        setName(attribute.name ?? "")
        setDescription(attribute.description ?? "")
    }
  }, [open, attribute])

  const invalidateAllAttributeData = () => {
    queryClient.invalidateQueries({
      predicate: (query) =>
        ["attributes"].includes(query.queryKey[0] as string),
    });
  };

  const mutation = useMutation({
    mutationFn: (data: IAddAttributeRequest) =>
      attributeApi.updateAttributeApi(attribute?.attributeId!, data),
    onSuccess: () => {
        invalidateAllAttributeData()
        onClose()
        showSuccess("Sửa thành công")
    }
  });

  const handleSubmit = async () => {
    if(!attribute?.attributeId) {
        showError('Xóa thất bại')
        return;
    }

    if(!name.trim()){
        setError(true)
        return;
    }

    try {
        await mutation.mutateAsync({
            attributeName: name,
            attributeDescription: description
        })
        setName("")
        setDescription("")
        onClose()
    } catch (err){
        console.error("lỗi", err)
        showError("Sửa thất bại")
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
      <DialogTitle>Sửa thuộc tính</DialogTitle>
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

export default UpdateAttribute;
