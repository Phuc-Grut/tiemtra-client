import { Box, Typography, IconButton, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ChangeEvent, useRef, useState } from "react";
import { CreateProductRequest } from "src/Interfaces/IProduct";
import productApi from "src/services/api/Products/indext";
import useToast from "src/components/Toast";

interface Props {
  formData: CreateProductRequest;
  setFormData: React.Dispatch<React.SetStateAction<CreateProductRequest>>;
}

const DetailedImagesSection = ({ formData, setFormData }: Props) => {
  const MAX_FILE_SIZE = 200 * 1024;
  const [detailedImages, setDetailedImages] = useState<File[]>([]);
  const { showSuccess, showError } = useToast();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      showError("Vui lòng chọn ảnh dưới 200KB");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      return;
    }

    try {
      const res = await productApi.uploadImage(file);
      const fileUrl = res.data.fileUrl;

      setDetailedImages((prev) => [...prev, file]);
      setFormData((prev) => ({
        ...prev,
        productImageUrls: [...prev.productImageUrls, fileUrl],
      }));

      showSuccess("Tải ảnh thành công");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      showError("Tải ảnh thất bại");
      console.error("Upload ảnh thất bại:", err);
    }
  };

  const handleRemoveImage = (index: number) => {
    setDetailedImages((prev) => prev.filter((_, i) => i !== index));

    setFormData((prev) => ({
      ...prev,
      productImageUrls: prev.productImageUrls.filter((_, i) => i !== index),
    }));
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: 500, color: "#333" }}>
        Ảnh chi tiết
      </Typography>

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        style={{ padding: "8px 0" }}
      />

      <Grid container spacing={2}>
        {detailedImages.map((image, index) => (
          <Grid item xs={4} sm={3} md={2} key={index}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                paddingTop: "100%",
                borderRadius: 1,
                overflow: "hidden",
                border: "1px solid #ddd",
              }}
            >
              <img
                src={URL.createObjectURL(image)}
                alt={`detailed-${index}`}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <IconButton
                size="small"
                onClick={() => handleRemoveImage(index)}
                sx={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  backgroundColor: "#fff",
                  "&:hover": { backgroundColor: "#eee" },
                }}
              >
                <DeleteIcon fontSize="small" sx={{ color: "#d32f2f" }} />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DetailedImagesSection;
