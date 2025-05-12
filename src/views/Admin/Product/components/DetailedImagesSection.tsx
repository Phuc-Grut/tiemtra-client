import {
  Box,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ChangeEvent } from "react";

interface DetailedImagesSectionProps {
  detailedImages: File[];
  setDetailedImages: React.Dispatch<React.SetStateAction<File[]>>;
}

const DetailedImagesSection = ({
  detailedImages,
  setDetailedImages,
}: DetailedImagesSectionProps) => {
  const handleDetailedImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setDetailedImages((prev) => [...prev, ...files]);
  };

  const handleRemoveImage = (index: number) => {
    setDetailedImages((prev) => prev.filter((_, i) => i !== index));
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
        onChange={handleDetailedImagesChange}
        style={{ padding: "8px 0" }}
      />

      <Grid container spacing={2}>
        {detailedImages.map((image, index) => (
          <Grid item xs={4} sm={3} md={2} key={index}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                paddingTop: "100%", // square
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
