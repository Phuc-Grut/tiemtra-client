import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import categoryApi from "src/services/api/Category";
import { ICategory } from "src/Interfaces/ICategory";
import formatVietnamTime from "src/utils/formatVietnamTime";
import CustomPagination from "src/components/CustomPagination";
import {
  Box,
  Button,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import AttributeTable from "../../Attribute/components/AttributeTable";

interface CategoryTableProps {
  onTypeChange?: (type: string) => void;
}

const CategoryTable = ({ onTypeChange }: CategoryTableProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [pageNumber, setPageNumber] = useState(1);
  const [maxPages, setMaxPages] = useState<number>(1);
  const [pageSize, setPageSize] = useState(10);

  const pathWithoutQuery = location.pathname.split("?")[0];
  const relativePath = pathWithoutQuery.replace(/^\/category\/?/, "");

  const pathIds = relativePath.split("/").filter((id) => id.trim() !== "");

  const isDetail = pathIds.length > 0;
  const currentCategoryId = pathIds[pathIds.length - 1];

  const {
    data: categories,
    isLoading,
    // error,
  } = useQuery({
    queryKey: ["categories", pageNumber, pageSize],
    queryFn: async () => {
      const response = await categoryApi.getPagingApi({ pageNumber, pageSize });

      const realTotalPages = response.data.totalPages ?? 1;
      setMaxPages(realTotalPages);

      return response.data.data.$values;
    },
    enabled: !isDetail && pageNumber > 0,
    placeholderData: (previousData: any) => previousData,
  });

  const { data: categoryDetail } = useQuery({
    queryKey: ["category", currentCategoryId, pageNumber, pageSize],
    queryFn: () =>
      categoryApi.getByIdApi({
        categoryId: Number(currentCategoryId),
        pageNumber: 1,
        pageSize: 10,
      }),
    enabled: !!currentCategoryId && !isNaN(Number(currentCategoryId)),
    select: (res) => {
      const type = res.data?.type ?? "Unknown";
      onTypeChange?.(type);
      const items = res.data?.data?.items?.$values ?? [];
      console.log("🚀 ~ CategoryTable ~ type:", type);
      const totalItems = res.data?.data?.totalItems ?? 0;
      const pageSize = res.data?.data?.pageSize ?? 10;

      return { type, items, totalItems, pageSize };
    },
  });

  if (isDetail && categoryDetail?.type === "Attributes") {
    return (
      <AttributeTable
        rows={categoryDetail.items}
        pageNumber={pageNumber}
        pageSize={pageSize}
        setPageNumber={setPageNumber}
        setPageSize={setPageSize}
        maxPages={Math.ceil(categoryDetail.totalItems / pageSize)}
      />
    );
  }

  if (isLoading) {
    return (
      <p style={{ textAlign: "center", fontWeight: "bold" }}>Đang tải...</p>
    );
  }
  const rows = isDetail ? categoryDetail?.items ?? [] : categories ?? [];
  console.log("🚀 ~ CategoryTable ~ rows:", rows.length);

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        minHeight: "calc(100vh - 178px)",
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

        {/* Nút thêm thuộc tính */}
        {rows.length === 0 && (
          <Button
            variant="contained"
            size="small"
            sx={{
              marginLeft: "12px",
              textTransform: "none",
              fontSize: "13px",
              height: "24px",
              minWidth: "unset",
              padding: "0px 10px",
              backgroundColor: "#ffa500",
            }}
            onClick={() => console.log("Thêm thuộc tính")}
          >
            + Thêm thuộc tính
          </Button>
        )}
      </Box>

      <TableContainer component={Paper} sx={{ overflowX: "auto", flexGrow: 1 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ height: 36 }}>
              <TableCell
                sx={{
                  width: "50px",
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "black",
                  borderRight: "1px solid rgb(156, 154, 154)",
                  borderBlock: "1px solid rgb(156, 154, 154)",
                  height: "30px",
                  lineHeight: "28px",
                  padding: "4px 8px",
                }}
              >
                STT
              </TableCell>
              <TableCell sx={Styles.tableCell}>Mã danh mục</TableCell>
              <TableCell sx={Styles.tableCell}>Tên Danh Mục</TableCell>
              <TableCell sx={Styles.tableCell}>Mô tả</TableCell>
              <TableCell sx={Styles.tableCell}>Người tạo</TableCell>
              <TableCell sx={Styles.tableCell}>Cập nhật</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((category: ICategory, index: number) => (
                <TableRow
                  key={category.categoryId}
                  hover
                  sx={{ cursor: isDetail ? "default" : "pointer" }}
                  onClick={() => {
                    setPageNumber(1);
                    setPageSize(10);

                    // Gộp đường dẫn mới
                    const nextPath = `/category/${[
                      ...pathIds,
                      category.categoryId,
                    ].join("/")}`;
                    navigate(nextPath);
                  }}
                >
                  <TableCell
                    sx={{
                      textAlign: "center",
                      borderRight: "1px solid rgb(236, 234, 234)",
                    }}
                  >
                    {((pageNumber ?? 1) - 1) * (pageSize ?? 10) + index + 1}
                  </TableCell>
                  <TableCell sx={Styles.tableCellBody}>
                    {category.categoryId}
                  </TableCell>
                  <TableCell sx={Styles.tableCellBody}>
                    {category.categoryName}
                  </TableCell>
                  <TableCell sx={Styles.tableCellBody}>
                    {category.description || "Không có mô tả"}
                  </TableCell>
                  <TableCell sx={Styles.tableCellBody}>
                    {category?.creator?.fullName || "Không có dữ liệu"}
                  </TableCell>
                  <TableCell sx={Styles.tableCellBody}>
                    {formatVietnamTime(category.updatedAt)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} sx={{ padding: "10px" }}>
                  Danh sách trống!!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        mt={0}
        display="flex"
        justifyContent="center"
        alignItems="center"
        paddingBottom={0.5}
        gap={2}
      >
        <CustomPagination
          pageNumber={pageNumber}
          setPageNumber={(newPage) => {
            setPageNumber(newPage);
            const newPath = `/category/${pathIds.join("/")}?page=${newPage}`;
            navigate(newPath);
          }}
          totalPages={maxPages}
        />

        <Box display="flex" alignItems="center" gap={1} maxHeight={25}>
          <TextField
            select
            value={pageSize}
            onChange={(e) => {
              setPageSize(parseInt(e.target.value));
              setPageNumber(1);
            }}
            size="small"
            variant="standard"
            sx={{
              width: 80,
              maxheight: "25px",
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
    </Box>
  );
};

export default CategoryTable;

const Styles = {
  tableCell: {
    fontWeight: "bold",
    color: "black",
    borderRight: "1px solid rgb(156, 154, 154)",
    borderBlock: "1px solid rgb(156, 154, 154)",
    height: "30px",
    lineHeight: "28px",
    padding: "4px 8px",
  },
  tableCellBody: {
    borderRight: "1px solid rgb(236, 234, 234)",
  },
};
