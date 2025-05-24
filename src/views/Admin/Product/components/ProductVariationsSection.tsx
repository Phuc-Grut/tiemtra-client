import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  IconButton,
  Button,
  Paper,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { CreateProductRequest } from "src/Interfaces/IProduct";
import { useEffect } from "react";

interface Variation {
  typeName: string;
  price?: number;
  stock?: number;
}

interface props {
  formData: CreateProductRequest;
  setFormData: React.Dispatch<React.SetStateAction<CreateProductRequest>>;
}

const ProductVariationsSection = ({ formData, setFormData }: props) => {
  const handleAddVariation = () => {
    setFormData((prev) => {
      const newVariations = [
        ...(prev.productVariations ?? []),
        { typeName: "", price: null, stock: null },
      ];

      return {
        ...prev,
        productVariations: newVariations,
        hasVariations: newVariations.length > 0,
      };
    });
  };

  const handleChange = (
    index: number,
    field: keyof Variation,
    value: string
  ) => {
    const updated = [...(formData.productVariations ?? [])];

    updated[index] = {
      ...updated[index],
      [field]: field === "price" || field === "stock" ? Number(value) : value,
    };

    setFormData((prev) => ({
      ...prev,
      productVariations: updated,
    }));
  };

  const handleDelete = (index: number) => {
    const updated = [...(formData.productVariations ?? [])];
    updated.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      productVariations: updated,
      stock: null,
      price: null
    }));
  };

  useEffect(() => {
    const variations = formData.productVariations ?? [];

    if (variations.length === 0) {
      return;
    }

    const stocks = variations
      .map((v) => v.stock)
      .filter((s): s is number => typeof s === "number" && !isNaN(s));

    const totalStock =
      stocks.length > 0 ? stocks.reduce((a, b) => a + b, 0) : null;

    setFormData((prev) => ({
      ...prev,
      price: 0,
      stock: totalStock,
    }));
  }, [formData.productVariations, setFormData]);

  return (
    <Box sx={{ mt: 4, width: "90%" }}>
      <TableContainer
        component={Paper}
        elevation={1}
        sx={{
          maxWidth: "100%",
          width: { xs: "100%", sm: "100%", md: "100%" },
          maxHeight: {
            xs: "200px",
            sm: "250px",
            md: "220px",
          },
          overflowY: "auto",
        }}
      >
        <Table
          size="small"
          sx={{
            minWidth: 500,
            "& td, & th": {
              padding: "4px 8px",
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell sx={Styles.tableCell}>Loại sản phẩm</TableCell>
              <TableCell sx={Styles.tableCell}>Giá (VND)</TableCell>
              <TableCell sx={Styles.tableCell}>Tồn kho</TableCell>
              <TableCell align="center" sx={Styles.tableCell}>
                Hành động
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(formData.productVariations ?? []).map((variation, index) => (
              <TableRow key={index}>
                <TableCell sx={Styles.tableCellBody}>
                  <TextField
                    variant="standard"
                    placeholder="Loại sản phẩm"
                    value={variation.typeName}
                    onChange={(e) =>
                      handleChange(index, "typeName", e.target.value)
                    }
                    InputProps={{
                      disableUnderline: true,
                    }}
                  />
                </TableCell>
                <TableCell sx={Styles.tableCellBody}>
                  <TextField
                    variant="standard"
                    type="number"
                    placeholder="Giá"
                    value={variation.price ?? ""}
                    onChange={(e) =>
                      handleChange(index, "price", e.target.value)
                    }
                    InputProps={{
                      disableUnderline: true,
                    }}
                  />
                </TableCell>
                <TableCell sx={Styles.tableCellBody}>
                  <TextField
                    variant="standard"
                    type="number"
                    placeholder="Tồn kho"
                    value={variation.stock}
                    onChange={(e) =>
                      handleChange(index, "stock", e.target.value)
                    }
                    InputProps={{
                      disableUnderline: true,
                    }}
                  />
                </TableCell>
                <TableCell align="center" sx={Styles.tableCellBody}>
                  <IconButton onClick={() => handleDelete(index)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell align="left" colSpan={4}>
                <Button onClick={handleAddVariation} size="small">
                  Thêm
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductVariationsSection;

const Styles = {
  tableCell: {
    fontWeight: "bold",
    color: "black",
    borderRight: "1px solid rgb(240, 235, 235)",
    borderBlock: "1px solid rgb(240, 235, 235)",
    height: "30px",
    lineHeight: "28px",
    padding: "4px 8px",
    backgroundColor: "#fff",
    position: "sticky",
    top: 0,
    zIndex: 2,
  },
  tableCellBody: {
    borderRight: "1px solid rgb(236, 234, 234)",
  },
};
