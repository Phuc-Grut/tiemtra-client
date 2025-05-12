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
import { useState } from "react";

interface Variation {
  typeName: string;
  price: string;
  stock: string;
}

const ProductVariationsSection = () => {
  const [variations, setVariations] = useState<Variation[]>([]);

  const handleAddVariation = () => {
    setVariations([...variations, { typeName: "", price: "", stock: "" }]);
  };

  const handleChange = (
    index: number,
    field: keyof Variation,
    value: string
  ) => {
    const updated = [...variations];
    updated[index][field] = value;
    setVariations(updated);
  };

  const handleDelete = (index: number) => {
    const updated = [...variations];
    updated.splice(index, 1);
    setVariations(updated);
  };

  return (
    <Box sx={{ mt: 4, width: "80%" }}>
      <TableContainer
        component={Paper}
        elevation={1}
        sx={{
          maxWidth: "100%",
          width: { xs: "100%", sm: "100%", md: "100%" },
          maxHeight: {
            xs: "200px", // Mobile
            sm: "250px", // Tablet
            md: "220px", // Desktop
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
            {variations.map((variation, index) => (
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
                    value={variation.price}
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
              <TableCell align="left">
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
    backgroundColor: "#fff", // để tránh bị mờ
    position: "sticky",
    top: 0,
    zIndex: 2,
  },
  tableCellBody: {
    borderRight: "1px solid rgb(236, 234, 234)",
  },
};
