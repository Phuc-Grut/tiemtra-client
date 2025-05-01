import {
  Box,
  Typography,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Attribute, Category } from "src/Interfaces/test"; // Import đúng interface bạn có nhé

// Dữ liệu fake để test
const fakeCategories: Category[] = [
  { id: 1, name: "Đồ uống" },
  { id: 2, name: "Thực phẩm" },
  { id: 3, name: "Đồ gia dụng" },
];

const fakeAttributes: { [categoryId: number]: Attribute[] } = {
  1: [
    { id: 1, name: "Thể tích", value: "" },
    { id: 5, name: "Hạn sử dụng", value: "" },
    { id: 5, name: "Hạn sử dụng", value: "" },
    { id: 5, name: "Hạn sử dụng", value: "" },
    { id: 5, name: "Hạn sử dụng", value: "" },
    { id: 5, name: "Hạn sử dụng", value: "" },
    { id: 5, name: "Hạn sử dụng", value: "" },
    { id: 5, name: "Hạn sử dụng", value: "" },
    { id: 5, name: "Hạn sử dụng", value: "" },
    { id: 5, name: "Hạn sử dụngggg", value: "" },
  ],
  2: [
    { id: 1, name: "Trọng lượng", value: "" },
    { id: 5, name: "Hạn sử dụng", value: "" },
  ],
  3: [
    { id: 2, name: "Kích thước", value: "" },
    { id: 3, name: "Màu sắc", value: "" },
    { id: 4, name: "Chất liệu", value: "" },
  ],
};

interface CategoryAttributesSectionProps {
  categories?: Category[];
  selectedCategory?: string;
  setSelectedCategory?: React.Dispatch<React.SetStateAction<string>>;
  attributes?: Attribute[];
}

const CategoryAttributesSection = ({
  categories,
}: CategoryAttributesSectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [attributes, setAttributes] = useState<Attribute[]>([]);

  const handleCategoryChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setSelectedCategory(value);

    // Load fake attributes theo category
    const newAttrs = fakeAttributes[parseInt(value)] || [];
    setAttributes(newAttrs);
  };

  const handleAttributeValueChange = (index: number, value: string) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[index] = {
      ...updatedAttributes[index],
      value,
    };
    setAttributes(updatedAttributes);
  };

  return (
    <Box
      sx={{
        width: { xs: "30%", md: "30%" },
        display: "flex",
        flexDirection: "column",
        gap: 4,
        ml: { xs: 0, md: 9 },
      }}
    >
      {/* Danh mục */}
      <Box>
        <Typography
          variant="body1"
          sx={{ fontWeight: 500, color: "#333", mb: 1 }}
        >
          Danh mục
        </Typography>
        <FormControl fullWidth variant="outlined" size="small">
          <InputLabel>Danh mục</InputLabel>
          <Select
            label="Danh mục"
            value={selectedCategory}
            onChange={handleCategoryChange}
            sx={{ bgcolor: "#fff" }}
          >
            <MenuItem value="">
              <em>Chọn danh mục</em>
            </MenuItem>
            {fakeCategories.map((category) => (
              <MenuItem key={category.id} value={category.id.toString()}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Thuộc tính */}
      {selectedCategory && attributes.length > 0 && (
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="body1"
            sx={{ fontWeight: 500, color: "#333", mb: 1 }}
          >
            Thuộc tính
          </Typography>
          <TableContainer
            component={Paper}
            sx={{ maxHeight: "75%", overflowY: "auto" }}
          >
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{ fontWeight: 600, bgcolor: "#f5f5f5", width: "40%" }}
                  >
                    Thuộc tính
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Giá trị</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attributes.map((attr, index) => (
                  <TableRow key={attr.id}>
                    <TableCell>{attr.name}</TableCell>
                    <TableCell>
                      <TextField
                        variant="standard"
                        size="small"
                        placeholder="Nhập giá trị..."
                        fullWidth
                        value={attr.value || ""}
                        onChange={(e) =>
                          handleAttributeValueChange(index, e.target.value)
                        }
                        InputProps={{
                          disableUnderline: true, // ✨ Tắt underline luôn cho mượt
                          sx: {
                            fontSize: "14px",
                            lineHeight: "27px",
                            paddingY: "2px",
                          },
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default CategoryAttributesSection;
