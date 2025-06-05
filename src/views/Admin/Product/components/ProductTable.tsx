import {
  Box,
  Button,
  MenuItem,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import productApi from "src/services/api/Products/indext";
import {
  IProduct,
  IProductFilter,
  ProductVariation,
} from "src/Interfaces/IProduct";
import getProductStatusText from "src/utils/getProductStatusText";
import CustomPagination from "src/components/CustomPagination";
import { productContextMenuItems } from "../contextMenu";
import GenericContextMenu from "src/components/GenericContextMenu";
import ProductModal from "./modals/ProductModal";
import DataTableContainer from "src/components/DataTableContainer";

interface ColumnConfig<T> {
  key: string;
  label: string;
  width?: number;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
  align?: "left" | "center" | "right";
}

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
    pageSize: 10,
    keyword: "",
    productCode: "",
    sortBy: "",
    status: undefined,
  });

  const [productModalOpen, setProductModalOpen] = useState(false);
  const [productModalMode, setProductModalMode] = useState<"view" | "edit">(
    "view"
  );

  const [selected, setSelected] = useState<(string | number)[]>([]);

  const [contextItem, setContextItem] = useState<IProduct | null>(null);

  const [productId, setProductId] = useState("");

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["get-paging-product", filter],
    queryFn: async () => {
      const cleanedFilter = buildCleanFilter(filter);
      const response = await productApi.getPagingProduct(cleanedFilter);
      const realTotalPages = response.data.totalPages ?? 1;
      setMaxPages(realTotalPages);
      return response.data.items ?? [];
    },
  });

  const [anchorEl, setAnchorEl] = useState<
    HTMLElement | { mouseX: number; mouseY: number } | null
  >(null);

  // const handleSelect = (id: string) => {
  //   setSelected((prev) =>
  //     prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
  //   );
  // };

  const toggleSort = (field: string) => {
    setFilter((prev) => {
      const currentSort = prev.sortBy ?? "";
      const isAsc = currentSort === `${field}-asc`;
      const isDesc = currentSort === `${field}-desc`;

      let nextSortBy = "";

      if (!isAsc && !isDesc) nextSortBy = `${field}-asc`;
      else if (isAsc) nextSortBy = `${field}-desc`;
      else if (isDesc) nextSortBy = "";

      return {
        ...prev,
        sortBy: nextSortBy,
        pageNumber: 1,
      };
    });
  };

  const productMenuActions = productContextMenuItems.map((item) => ({
    ...item,
    onClick: (p: IProduct) => {
      switch (item.id) {
        case "VIEW":
          setProductModalOpen(true);
          setProductId(p.productId);
          setProductModalMode("view");
          break;
        case "EDIT":
          setProductModalOpen(true);
          setProductId(p.productId);
          setProductModalMode("edit");
          break;
        case "DELETE":
          console.log("delete mục:", p.productId);
          // setSelected([p.productId]);
          // setConfirmModalOpen(true);
          break;
        default:
          console.log("Chọn menu:", item.id, p);
      }
    },
  }));

  const renderPrice = (p: IProduct): string => {
    if (p.price && p.price > 0) {
      return p.price.toLocaleString() + "đ";
    }

    const variations = Array.isArray(p.productVariations)
      ? p.productVariations
      : [];

    const prices = variations
      .map((v: ProductVariation) => v.price)
      .filter((price): price is number => typeof price === "number");

    if (prices.length === 0) return "—";

    const min = Math.min(...prices);
    const max = Math.max(...prices);

    return min === max
      ? `${min.toLocaleString()}đ`
      : ` ${min.toLocaleString()}đ - ${max.toLocaleString()}đ`;
  };

  const columns: ColumnConfig<IProduct>[] = [
    {
      key: "image",
      label: "Ảnh",
      width: 150,
      render: (p: IProduct) => (
        <div
          style={{
            width: "95%",
            height: 85,
            backgroundColor: "#f9f9f9",
            border: "1px solid #eee",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 3px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
          }}
        >
          <img
            src={p.privewImageUrl || ""}
            alt="Ảnh sản phẩm"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            // onError={(e) => {
            //   e.currentTarget.src =
            //     "https://via.placeholder.com/80x80?text=No+Image";
            // }}
          />
        </div>
      ),
    },

    { key: "productCode", label: "Mã sản phẩm", width: 120 },
    { key: "productName", label: "Tên sản phẩm", width: 150 },
    {
      key: "price",
      label: "Giá bán",
      width: 150,
      sortable: true,
      render: (p) => renderPrice(p),
    },
    { key: "stock", label: "Tồn kho", width: 90, sortable: true },
    { key: "totalSold", label: "Đã bán", width: 90, sortable: true },
    { key: "brandName", label: "Thương hiệu", width: 120 },
    {
      key: "productStatus",
      label: "Trạng thái",
      width: 120,
      render: (p) => getProductStatusText(p.productStatus ?? -1),
    },
    { key: "note", label: "Ghi chú", width: 250 },
  ];

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
            Xoá ({selected.length})
          </Button>
        )}
      </Box>

      {/* <TableContainer component={Paper} sx={{ overflowX: "auto", flexGrow: 1 }}>
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
                      selected.length > 0 && selected.length < products.length;

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

              <TableCell
                sx={{
                  ...Styles.tableCell,
                  width: 150,
                  cursor: "pointer",
                  userSelect: "none",
                }}
                onClick={() => toggleSort("price")}
              >
                Giá bán{" "}
                {filter.sortBy?.startsWith("price") ? (
                  filter.sortBy.endsWith("asc") ? (
                    <ArrowUpwardIcon sx={{ fontSize: 14, ml: 0.3 }} />
                  ) : (
                    <ArrowDownwardIcon sx={{ fontSize: 14, ml: 0.3 }} />
                  )
                ) : (
                  <FilterAltOutlinedIcon
                    sx={{
                      fontSize: 16,
                      verticalAlign: "middle",
                      ml: 0.5,
                      color: "#aaa",
                    }}
                  />
                )}
              </TableCell>

              <TableCell
                sx={{
                  ...Styles.tableCell,
                  width: 90,
                  cursor: "pointer",
                  userSelect: "none",
                }}
                onClick={() => toggleSort("stock")}
              >
                Tồn kho{" "}
                {filter.sortBy?.startsWith("stock") ? (
                  filter.sortBy.endsWith("asc") ? (
                    <ArrowUpwardIcon sx={{ fontSize: 14, ml: 0.3 }} />
                  ) : (
                    <ArrowDownwardIcon sx={{ fontSize: 14, ml: 0.3 }} />
                  )
                ) : (
                  <FilterAltOutlinedIcon
                    sx={{
                      fontSize: 16,
                      verticalAlign: "middle",
                      ml: 0.5,
                      color: "#aaa",
                    }}
                  />
                )}
              </TableCell>
              <TableCell
                sx={{
                  ...Styles.tableCell,
                  width: 90,
                  cursor: "pointer",
                  userSelect: "none",
                }}
                onClick={() => toggleSort("sold")}
              >
                Đã bán{" "}
                {filter.sortBy?.startsWith("sold") ? (
                  filter.sortBy.endsWith("asc") ? (
                    <ArrowUpwardIcon sx={{ fontSize: 14, ml: 0.3 }} />
                  ) : (
                    <ArrowDownwardIcon sx={{ fontSize: 14, ml: 0.3 }} />
                  )
                ) : (
                  <FilterAltOutlinedIcon
                    sx={{
                      fontSize: 16,
                      verticalAlign: "middle",
                      ml: 0.5,
                      color: "#aaa",
                    }}
                  />
                )}
              </TableCell>
              <TableCell sx={{ ...Styles.tableCell, width: 120 }}>
                Thương hiệu
              </TableCell>
              <TableCell sx={{ ...Styles.tableCell, width: 120 }}>
                Trạng thái
              </TableCell>
              <TableCell sx={{ ...Styles.tableCell, width: 250 }}>
                Ghi chú
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  Đang tải dữ liệu...
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
                  onClick={() => {
                    setProductModalOpen(true);
                    setProductId(p.productId);
                    setProductModalMode("view");
                  }}
                  onContextMenu={(e) => {
                    e.preventDefault();

                    setContextItem(p);
                    setAnchorEl({ mouseX: e.clientX, mouseY: e.clientY });
                  }}
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
                  <TableCell sx={Styles.tableCellBody}>
                    {renderPrice(p)}
                  </TableCell>
                  <TableCell sx={Styles.tableCellBody}>{p.stock}</TableCell>
                  <TableCell sx={Styles.tableCellBody}>{p.totalSold}</TableCell>
                  <TableCell sx={Styles.tableCellBody}>{p.brandName}</TableCell>
                  <TableCell sx={Styles.tableCellBody}>
                    {getProductStatusText(p.productStatus ?? -1)}
                  </TableCell>
                  <TableCell sx={Styles.tableCellBody}>{p.note}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} sx={{ padding: "10px" }}>
                  Danh sách trống!!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer> */}

      <DataTableContainer<IProduct>
        data={products}
        selected={selected}
        setSelected={setSelected}
        columns={columns}
        isLoading={isLoading}
        error={!!error}
        sortBy={filter.sortBy}
        toggleSort={toggleSort}
        getRowId={(p) => p.productId}
        onRowClick={(p) => {
          setProductModalOpen(true);
          setProductId(p.productId);
          setProductModalMode("view");
        }}
        onContextMenu={(e, p) => {
          setContextItem(p);
          setAnchorEl({ mouseX: e.clientX, mouseY: e.clientY });
        }}
      />

      <Box
        mt={0}
        display="flex"
        justifyContent="center"
        alignItems="center"
        paddingBottom={0.5}
        gap={2}
      >
        <CustomPagination
          pageNumber={filter.pageNumber}
          totalPages={maxPages}
          setPageNumber={(newPage) =>
            setFilter((prev) => ({ ...prev, pageNumber: newPage }))
          }
        />

        <Box display="flex" alignItems="center" gap={1} maxHeight={25}>
          <TextField
            select
            value={filter.pageSize}
            onChange={(e) => {
              const newSize = parseInt(e.target.value);
              setFilter((prev) => ({
                ...prev,
                pageSize: newSize,
                pageNumber: 1,
              }));
            }}
            size="small"
            variant="standard"
            sx={{
              width: 80,
              maxHeight: "25px",
            }}
          >
            {[1, 5, 10, 15, 20].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <Box fontSize="12px" color="#555">
            Bản ghi/trang
          </Box>
        </Box>
      </Box>

      <GenericContextMenu
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        items={productMenuActions}
        contextItem={contextItem}
      />

      <ProductModal
        open={productModalOpen}
        mode={productModalMode}
        productId={productId}
        onClose={() => {
          setProductModalOpen(false);
          setProductId("");
          setSelected([]);
        }}
      />
    </Box>
  );
};

export default ProductTable;

// const Styles = {
//   tableCell: {
//     fontWeight: "bold",
//     color: "black",
//     borderRight: "1px solid rgb(240, 235, 235)",
//     borderBlock: "1px solid rgb(240, 235, 235)",
//     height: "30px",
//     lineHeight: "28px",
//     padding: "4px 8px",
//   },
//   tableCellBody: {
//     borderRight: "1px solid rgb(236, 234, 234)",
//   },
// };
