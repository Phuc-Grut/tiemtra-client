import {
  Box,
  TextField,
  Select,
  MenuItem,
  Typography,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { ChangeEvent } from "react";
import { Brand } from "src/Interfaces/test";

interface ProductFormSectionProps {
  formData: {
    productCode: string;
    productName: string;
    previewImage: File | null;
    price: string;
    stock: string;
    origin: string;
    description: string;
    brandId: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      productCode: string;
      productName: string;
      previewImage: File | null;
      price: string;
      stock: string;
      origin: string;
      description: string;
      brandId: string;
    }>
  >;
  brands: Brand[];
}

const ProductFormSection = ({
  formData,
  setFormData,
  brands,
}: ProductFormSectionProps) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { value: unknown }>
  ) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const { name, value } = target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, previewImage: file }));
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        maxWidth: { xs: "100%", md: "600px" },
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600, color: "#333" }}>
        Thông tin sản phẩm
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
        }}
      >
        <TextField
          label="Mã sản phẩm"
          name="productCode"
          value={formData.productCode}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          size="small"
          sx={{ bgcolor: "#fff" }}
        />
        <TextField
          label="Tên sản phẩm"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          size="small"
          sx={{ bgcolor: "#fff" }}
        />
        <TextField
          label="Giá (VND)"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          size="small"
          sx={{ bgcolor: "#fff" }}
        />
        <TextField
          label="Số lượng tồn kho"
          name="stock"
          type="number"
          value={formData.stock}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          size="small"
          sx={{ bgcolor: "#fff" }}
        />
        <TextField
          label="Xuất xứ"
          name="origin"
          value={formData.origin}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          size="small"
          sx={{ bgcolor: "#fff" }}
        />
        <FormControl fullWidth variant="outlined" size="small">
          <InputLabel>Thương hiệu</InputLabel>
          <Select
            label="Thương hiệu"
            name="brandId"
            value={formData.brandId}
            onChange={handleSelectChange}
            sx={{ bgcolor: "#fff" }}
          >
            <MenuItem value="">
              <em>Chọn thương hiệu</em>
            </MenuItem>
            {brands.map((brand) => (
              <MenuItem key={brand.id} value={brand.id.toString()}>
                {brand.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ gridColumn: { xs: "span 1", md: "span 2" } }}>
          <Typography variant="body2" sx={{ mb: 1, color: "#666" }}>
            Ảnh xem trước
          </Typography>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ width: "100%", padding: "8px 0" }}
          />
          {formData.previewImage && (
            <Box sx={{ mt: 1 }}>
              <img
                src={URL.createObjectURL(formData.previewImage)}
                alt="Preview"
                style={{
                  width: "180px", // Chiều rộng ảnh là 150px
                  height: "180px", // Chiều cao ảnh là 150px (đảm bảo hình vuông)
                  objectFit: "cover",
                  marginBottom: "8px",
                }}
              />
              <Typography variant="body2" sx={{ color: "#508815" }}>
                Đã chọn: {formData.previewImage.name}
              </Typography>
            </Box>
          )}
        </Box>
        <Box sx={{ gridColumn: { xs: "span 1", md: "span 2" } }}>
          <TextField
            label="Mô tả sản phẩm"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            size="small"
            multiline
            rows={8}
            sx={{ bgcolor: "#fff" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ProductFormSection;
