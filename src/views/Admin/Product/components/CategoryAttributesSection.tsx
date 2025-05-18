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
import { IAttribute } from "src/Interfaces/IAttribute";
import { CreateProductRequest } from "src/Interfaces/IProduct";

export interface CategoryDropdown {
  categoryId?: number;
  categoryName?: string;
}

interface CategoryAttributesSectionProps {
  categories?: CategoryDropdown[];
  selectedCategory?: number;
  setSelectedCategory?: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
  attributes?: IAttribute[];
  setFormData?: React.Dispatch<React.SetStateAction<CreateProductRequest>>;
  formData: CreateProductRequest;
}

const CategoryAttributesSection = ({
  categories,
  setSelectedCategory,
  selectedCategory,
  attributes,
  setFormData,
  formData,
}: CategoryAttributesSectionProps) => {
  const [attributeValues, setAttributeValues] = useState<string[]>([]);

  const handleCategoryChange = (e: SelectChangeEvent) => {
    const value = Number(e.target.value);
    if (setSelectedCategory) {
      setSelectedCategory(value);
    }
  };

  const handleAttributeValueChange = (index: number, value: string) => {
    const newValues = [...attributeValues];
    newValues[index] = value;
    setAttributeValues(newValues);

    if (setFormData && attributes) {
      const newProductAttributes = attributes.map((attr, idx) => ({
        attributeId: attr.attributeId,
        value: newValues[idx] || "",
      }));

      setFormData((prev) => ({
        ...prev,
        productAttributes: newProductAttributes,
      }));
    }
  };

  return (
    <Box
      sx={{
        width: "85%",
        display: "flex",
        flexDirection: "column",
        gap: 4,
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
            value={selectedCategory?.toString() ?? ""}
            onChange={handleCategoryChange}
            sx={{ bgcolor: "#fff" }}
          >
            <MenuItem value="">
              <em>Chọn danh mục</em>
            </MenuItem>
            {categories?.map((category) => (
              <MenuItem
                key={category.categoryId}
                value={category?.categoryId?.toString()}
              >
                {category.categoryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Thuộc tính */}
      {selectedCategory && attributes && attributes?.length > 0 && (
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 500,
              color: "#333",
              mb: 1,
              overflow: "auto",
              maxHeight: "80%",
            }}
          >
            Thuộc tính
          </Typography>
          <TableContainer
            component={Paper}
            sx={{
              maxHeight: 360,
              overflowY: "auto",
              border: "1px solid #eee",
            }}
          >
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{ fontWeight: 600, bgcolor: "#f5f5f5", width: "50%" }}
                  >
                    Thuộc tính
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Thông tin</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attributes?.map((attr, index) => (
                  <TableRow key={attr.attributeId}>
                    <TableCell>{attr.name}</TableCell>
                    <TableCell>
                      <TextField
                        variant="standard"
                        size="small"
                        placeholder="Nhập thông tin..."
                        fullWidth
                        value={
                          formData.productAttributes?.find(
                            (x) => x.attributeId === attr.attributeId
                          )?.value || ""
                        }
                        onChange={(e) =>
                          handleAttributeValueChange(index, e.target.value)
                        }
                        InputProps={{
                          disableUnderline: true,
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
