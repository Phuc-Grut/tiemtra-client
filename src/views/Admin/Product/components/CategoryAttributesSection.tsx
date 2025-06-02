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
  Dialog,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
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
  mode?: string;
}

const CategoryAttributesSection = ({
  categories,
  setSelectedCategory,
  selectedCategory,
  attributes,
  setFormData,
  formData,
  mode,
}: CategoryAttributesSectionProps) => {
  const [attributeValues, setAttributeValues] = useState<string[]>([]);
  const isReadOnly = mode === "view";

  //  đồng bộ attributeValues với formData.productAttributes
  useEffect(() => {
    if (formData?.productAttributes && attributes) {
      const values = attributes.map((attr) => {
        const match = formData.productAttributes?.find(
          (x) => x.attributeId === attr.attributeId
        );
        return match?.value || "";
      });
      setAttributeValues(values);
    }
  }, [formData, attributes]);


  // cập nhật formData.productAttributes khi danh mục thay đổi
  useEffect(() => {
    const isCategoryChanged =
      selectedCategory && selectedCategory !== formData?.categoryId;

    if (attributes && setFormData && isCategoryChanged) {
      const newProductAttributes = attributes.map((attr) => ({
        attributeId: attr.attributeId,
        value: "",
      }));

      setFormData((prev) => ({
        ...prev,
        productAttributes: newProductAttributes,
      }));

      setAttributeValues(attributes.map(() => ""));
    }
  }, [attributes, selectedCategory, formData?.categoryId, setFormData]);

  useEffect(() => {
    if (formData?.categoryId && setSelectedCategory) {
      setSelectedCategory(formData.categoryId);
    }
  }, [formData, setSelectedCategory]);

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

  const [editingAttr, setEditingAttr] = useState<{
    index: number;
    value: string;
    name: string;
  } | null>(null);

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
            disabled={isReadOnly}
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
                        placeholder={isReadOnly ? " " : "Nhập thông tin..."}
                        fullWidth
                        value={attributeValues[index] || ""}
                        onClick={() =>
                          setEditingAttr({
                            index,
                            value: attributeValues[index],
                            name: attr.name,
                          })
                        }
                        // disabled={isReadOnly}
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

          <Dialog
            open={!!editingAttr}
            onClose={() => setEditingAttr(null)}
            maxWidth="sm"
            fullWidth
          >
            <Box p={3}>
              <Typography variant="h6" gutterBottom>
                {editingAttr?.name}
              </Typography>
              <TextField
                multiline
                rows={4}
                fullWidth
                autoFocus
                value={editingAttr?.value ?? ""}
                InputProps={{ readOnly: isReadOnly }}
                onChange={(e) =>
                  setEditingAttr((prev) =>
                    prev ? { ...prev, value: e.target.value } : prev
                  )
                }
              />
              <Box mt={2} textAlign="right">
                <Button onClick={() => setEditingAttr(null)} sx={{ mr: 1 }}>
                  Hủy
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    if (editingAttr) {
                      handleAttributeValueChange(
                        editingAttr.index,
                        editingAttr.value
                      );
                      setEditingAttr(null);
                    }
                  }}
                  disabled={isReadOnly}
                >
                  Lưu
                </Button>
              </Box>
            </Box>
          </Dialog>
        </Box>
      )}
    </Box>
  );
};

export default CategoryAttributesSection;
