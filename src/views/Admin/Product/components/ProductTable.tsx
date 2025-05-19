import {
  Box,
  Button,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { CheckBox } from "@mui/icons-material";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import productApi from "src/services/api/Products/indext";
import { IProductFilter } from "src/Interfaces/IProduct";

const ProductTable = () => {
  // const [selected, setSelected] = useState<number[]>([]);

  const buildCleanFilter = (filter: IProductFilter) => {
    const cleaned: any = {
      pageNumber: filter.pageNumber ?? 1,
      pageSize: filter.pageSize ?? 10,
    };

    if (filter.keyword?.trim()) cleaned.keyword = filter.keyword.trim();
    if (filter.productCode?.trim())
      cleaned.productCode = filter.productCode.trim();
    if (filter.sortBy?.trim()) cleaned.sortBy = filter.sortBy.trim();
    if (filter.status !== undefined) cleaned.status = filter.status;
    if (filter.categoryId !== undefined) cleaned.categoryId = filter.categoryId;
    if (filter.brandId !== undefined) cleaned.brandId = filter.brandId;

    return cleaned;
  };

  const [filter, setFilter] = useState<IProductFilter>({
    pageNumber: 1,
    pageSize: 10,
    keyword: "",
    productCode: "",
    sortBy: "",
    status: undefined,
  });

  const { data: products } = useQuery({
    queryKey: ["products", filter],
    queryFn: async () => {
      const cleanedFilter = buildCleanFilter(filter);
      const response = await productApi.getPagingProduct(cleanedFilter);
      return response.data.items;
    },
  });

  console.log("🚀 ~ ProductTable2 ~ products:", products);

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        minHeight: "calc(100vh - 171px)",
        overflow: "auto",
        maxHeight: "calc(100vh - 198px)",
      }}
    >
      <Box
        sx={{
          padding: "6px 6px",
          borderBottom: "3px solid #ddd",
          height: "33px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <input
          type="text"
          placeholder="Tìm kiếm..."
          style={{
            width: "100%",
            maxWidth: "220px",
            height: "130%",
            fontSize: "13px",
            padding: "0px 8px",
            borderRadius: "4px",
            border: "2px solid #ccc",
          }}
        />

        <Button
          variant="contained"
          size="small"
          startIcon={
            <DeleteIcon
              sx={{ color: "white", fontSize: 16, marginRight: "-6px" }}
            />
          }
          sx={{
            marginLeft: "12px",
            textTransform: "none",
            fontSize: "13px",
            height: "24px",
            padding: "0px 8px",
            backgroundColor: "red",
            color: "white",
            "&:hover": {
              backgroundColor: "#cc0000",
            },
          }}
          // onClick={() => setConfirmModalOpen(true)}
        >
          Xoá (1)
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ overflowX: "auto", flexGrow: 1 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ height: 36 }}>
              <TableCell
                sx={{
                  height: "30px",
                  lineHeight: "28px",
                  padding: "4px 8px",
                  width: "20px",
                  borderRight: "1px solid rgb(240, 235, 235)",
                  borderBlock: "1px solid rgb(240, 235, 235)",
                }}
              >
                {/* <CheckBox
                  style={{ width: "20px", height: "20px" }}
                  checked={
                    selected.length > 0 && selected.length === products.length
                  }
                  indeterminate={
                    selected.length > 0 && selected.length < products.length
                  }
                  sx={{
                    color: "#999",
                    "&.Mui-checked": {
                      color: "red",
                    },
                  }}
                /> */}
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductTable;
