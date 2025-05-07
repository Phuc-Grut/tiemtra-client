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
import { useState } from "react";
import CustomPagination from "src/components/CustomPagination";
import { IAttribute } from "src/Interfaces/IAttribute";
import formatVietnamTime from "src/utils/formatVietnamTime";
import AddAttributeToCategory from "./modal/AddAttributeToCategory";

const AttributeTable = ({
  rows,
  categoryId,
  pageNumber,
  pageSize,
  setPageSize,
  setPageNumber,
  maxPages,
  reload
}: {
  rows: IAttribute[];
  categoryId?: number
  pageNumber: number;
  pageSize: number;
  setPageSize: (size: number) => void;
  setPageNumber: (page: number) => void;
  maxPages: number;
  reload?: () => void;
}) => {
  const [openAddAttribute, setOpenAddAttribute] = useState(false);

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
          sx={{
            marginLeft: "12px",
            textTransform: "none",
            fontSize: "13px",
            height: "24px",
            minWidth: "unset",
            padding: "0px 10px",
            backgroundColor: "#ffa500",
          }}
          onClick={() => setOpenAddAttribute(true)}
        >
          + Thêm thuộc tính
        </Button>
      </Box>

      <AddAttributeToCategory
        open={openAddAttribute}
        categoryId={Number(categoryId)}
        onClose={() => setOpenAddAttribute(false)}
        onUpdated={reload}
      />

      <TableContainer component={Paper} sx={{ overflowX: "auto", flexGrow: 1 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
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
              <TableCell sx={Styles.tableCell}>Mã thuộc tính</TableCell>
              <TableCell sx={Styles.tableCell}>Tên thuộc tính</TableCell>
              <TableCell sx={Styles.tableCell}>Mô tả</TableCell>
              <TableCell sx={Styles.tableCell}>Người tạo</TableCell>
              <TableCell sx={Styles.tableCell}>Cập nhật</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((attr: IAttribute, index: number) => (
                <TableRow key={attr.attributeId} hover>
                  <TableCell sx={Styles.tableCellBody}>
                    {(pageNumber - 1) * pageSize + index + 1}
                  </TableCell>
                  <TableCell sx={Styles.tableCellBody}>
                    {attr.attributeId}
                  </TableCell>
                  <TableCell sx={Styles.tableCellBody}>{attr.name}</TableCell>
                  <TableCell sx={Styles.tableCellBody}>
                    {attr.description || "Không có mô tả"}
                  </TableCell>
                  <TableCell sx={Styles.tableCellBody}>
                    {attr.updaterName || attr.creatorName || "Không có dữ liệu"}
                  </TableCell>
                  <TableCell sx={Styles.tableCellBody}>
                    {formatVietnamTime(attr.updatedAt)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} sx={{ padding: "10px" }}>
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
          setPageNumber={setPageNumber}
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

export default AttributeTable;

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
