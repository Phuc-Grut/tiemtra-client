import {
  Box,
  Button,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import productApi from "src/services/api/Products/indext";
import { IProduct, IProductFilter } from "src/Interfaces/IProduct";
import getProductStatusText from "src/utils/getProductStatusText";

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

  const [maxPages, setMaxPages] = useState<number>(1);

  const [filter, setFilter] = useState<IProductFilter>({
    pageNumber: 1,
    pageSize: 8,
    keyword: "",
    productCode: "",
    sortBy: "",
    status: undefined,
  });

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", filter],
    queryFn: async () => {
      const cleanedFilter = buildCleanFilter(filter);
      const response = await productApi.getPagingProduct(cleanedFilter);
      const realTotalPages = response.data.totalPages ?? 1;
      setMaxPages(realTotalPages);
      console.log("🚀 ~ queryFn: ~ realTotalPages:", realTotalPages);
      return response.data.items ?? [];
    },
  });

  console.log("🚀 ~ ProductTable2 ~ products:", products);
  const [selected, setSelected] = useState<string[]>([]);
  const [contextItem, setContextItem] = useState<IProduct | null>(null);
  const [selectedProduct, setselectedProduct] = useState<IProduct | null>(null);

  const [anchorEl, setAnchorEl] = useState<
    HTMLElement | { mouseX: number; mouseY: number } | null
  >(null);

  const handleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

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
        {selected.length > 0 && (
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
        )}
      </Box>

      <Box sx={{ flexGrow: 1, overflow: "auto" }}>
        <TableContainer
          component={Paper}
          sx={{
            flexGrow: 1,
            overflow: "auto",
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ height: 36 }}>
                <TableCell
                  sx={{
                    height: "10px",
                    lineHeight: "28px",
                    padding: "4px 8px",
                    width: "20px",
                    borderRight: "1px solid rgb(240, 235, 235)",
                    borderBlock: "1px solid rgb(240, 235, 235)",
                  }}
                >
                  <Checkbox
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
                    onChange={() => {
                      if (isLoading || products.length === 0) return;

                      const isAllSelected = selected.length === products.length;
                      const isIndeterminate =
                        selected.length > 0 &&
                        selected.length < products.length;

                      if (isAllSelected || isIndeterminate) {
                        setSelected([]);
                      } else {
                        setSelected(products.map((p: IProduct) => p.productId));
                      }
                    }}
                  />
                </TableCell>
                <TableCell
                  sx={{
                    ...Styles.tableCell,
                    fontWeight: "bold",
                    color: "black",
                    height: "30px",
                    lineHeight: "28px",
                    padding: "4px 8px",
                    width: 150,
                  }}
                >
                  Ảnh
                </TableCell>
                <TableCell sx={{ ...Styles.tableCell, width: 120 }}>
                  Mã sản phẩm
                </TableCell>
                <TableCell sx={{ ...Styles.tableCell, width: 150 }}>
                  Tên sản phẩm
                </TableCell>
                <TableCell sx={{ ...Styles.tableCell, width: 90 }}>
                  Giá bán
                </TableCell>
                <TableCell sx={{ ...Styles.tableCell, width: 90 }}>
                  Tồn kho
                </TableCell>
                <TableCell sx={{ ...Styles.tableCell, width: 90 }}>
                  Đã bán
                </TableCell>
                <TableCell sx={{ ...Styles.tableCell, width: 120 }}>
                  Thương hiệu
                </TableCell>
                <TableCell sx={{ ...Styles.tableCell, width: 120 }}>
                  Trạng thái
                </TableCell>
                <TableCell sx={{ ...Styles.tableCell, width: 250 }}>Ghi chú</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Đang tải dữ liệu
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={6} sx={{ padding: "10px" }}>
                    Danh sách trống!!
                  </TableCell>
                </TableRow>
              ) : products && products.length > 0 ? (
                products.map((p: IProduct, index: number) => (
                  <TableRow
                    key={p.productId}
                    hover
                    sx={{ cursor: "pointer" }}
                    onContextMenu={(e) => {
                      e.preventDefault();

                      setContextItem(p);
                      setselectedProduct(p);
                      setAnchorEl({ mouseX: e.clientX, mouseY: e.clientY });
                    }}
                    //   onClick={() => {
                    //     setSelectedAttribute(attr);
                    //     setEditModalOpen(true);
                    //   }}
                  >
                    <TableCell
                      sx={{
                        borderRight: "1px solid rgb(236, 234, 234)",
                        lineHeight: "28px",
                        padding: "4px 8px",
                      }}
                    >
                      <Checkbox
                        checked={selected.includes(p.productId)}
                        onChange={() => handleSelect(p.productId)}
                        onClick={(e) => e.stopPropagation()}
                        sx={{
                          color: "#999",
                          "&.Mui-checked": {
                            color: "red",
                          },
                        }}
                        style={{ width: "14px", height: "14px" }}
                      />
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "100%",
                        maxHeight: 90,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRight: "1px solid rgb(240, 235, 235)",
                      }}
                    >
                      <img
                        src={
                          p.privewImageUrl ||
                          "https://via.placeholder.com/40?text=No+Image"
                        }
                        alt="Ảnh sản phẩm"
                        style={{
                          width: "95%",
                          height: 85,
                          objectFit: "cover",
                          borderRadius: 2,
                          border: "1px solid #eee",
                          boxShadow: "0 0 3px rgba(0, 0, 0, 0.1)",
                          backgroundColor: "#f9f9f9",
                        }}
                      />
                    </TableCell>
                    <TableCell sx={Styles.tableCellBody}>
                      {p.productCode}
                    </TableCell>
                    <TableCell sx={Styles.tableCellBody}>
                      {p.productName}
                    </TableCell>
                    <TableCell sx={Styles.tableCellBody}>{p.price}</TableCell>
                    <TableCell sx={Styles.tableCellBody}>{p.stock}</TableCell>
                    <TableCell sx={Styles.tableCellBody}>
                      {p.totalSold}
                    </TableCell>
                    <TableCell sx={Styles.tableCellBody}>
                      {p.brandName}
                    </TableCell>
                    <TableCell sx={Styles.tableCellBody}>
                      {getProductStatusText(p.productStatus ?? -1)}
                    </TableCell>
                    <TableCell sx={Styles.tableCellBody}>{p.note}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Không có dữ liệu
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default ProductTable;

const Styles = {
  tableCell: {
    fontWeight: "bold",
    color: "black",
    borderRight: "1px solid rgb(240, 235, 235)",
    borderBlock: "1px solid rgb(240, 235, 235)",
    height: "30px",
    lineHeight: "28px",
    padding: "4px 8px",
  },
  tableCellBody: {
    borderRight: "1px solid rgb(236, 234, 234)",
  },
};
