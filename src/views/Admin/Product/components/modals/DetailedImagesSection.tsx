import { Box, Typography, List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ChangeEvent } from "react";

interface DetailedImagesSectionProps {
  detailedImages: File[];
  setDetailedImages: React.Dispatch<React.SetStateAction<File[]>>;
}

const DetailedImagesSection = ({ detailedImages, setDetailedImages }: DetailedImagesSectionProps) => {
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
        width: "250px",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        overflowY: "auto",
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
        style={{ width: "100%", padding: "8px 0" }}
      />
      <List dense>
        {detailedImages.map((image, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <IconButton edge="end" onClick={() => handleRemoveImage(index)}>
                <DeleteIcon sx={{ color: "#d32f2f" }} />
              </IconButton>
            }
          >
            <ListItemText
              primary={image.name}
              primaryTypographyProps={{ fontSize: 14, color: "#333" }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default DetailedImagesSection;