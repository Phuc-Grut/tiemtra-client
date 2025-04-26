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
  } from "@mui/material";
import { Attribute, Category } from "src/Interfaces/test";
  
  interface CategoryAttributesSectionProps {
    categories: Category[];
    selectedCategory: string;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
    attributes: Attribute[];
  }
  
  const CategoryAttributesSection = ({
    categories,
    selectedCategory,
    setSelectedCategory,
    attributes,
  }: CategoryAttributesSectionProps) => {
    const handleCategoryChange = (e: SelectChangeEvent<string>) => {
      const { value } = e.target;
      setSelectedCategory(value as string);
    };
  
    return (
      <Box
        sx={{
          width: "300px",
          display: "flex",
          flexDirection: "column",
          gap: 4,
          ml: 9
        }}
      >
        {/* Danh mục */}
        <Box sx={{ ml: 0 }}>
          <Typography variant="body1" sx={{ fontWeight: 500, color: "#333", mb: 1 }}>
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
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
  
        {/* Thuộc tính (dạng bảng) */}
        <Box sx={{ flex: 1, overflowY: "auto" }}>
          <Typography variant="body1" sx={{ fontWeight: 500, color: "#333", mb: 1 }}>
            Thuộc tính
          </Typography>
          <TableContainer component={Paper} sx={{ maxHeight: "300px" }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, bgcolor: "#f5f5f5", width: "70%" }}>
                    Thuộc tính
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, bgcolor: "#f5f5f5" }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attributes.map((attr) => (
                  <TableRow key={attr.id}>
                    <TableCell>
                      {attr.name}: {attr.value}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    );
  };
  
  export default CategoryAttributesSection;