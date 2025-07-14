import {
  Box,
  Button,
  Checkbox,
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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { IAttribute } from "src/Interfaces/IAttribute";
import attributeApi from "src/services/api/Attributes";
import formatVietnamTime from "src/utils/formatVietnamTime";
import DeleteIcon from "@mui/icons-material/Delete";
import { atrrinuteContextMenuItems } from "../contextMenu";
import GenericContextMenu from "src/components/GenericContextMenu";
import CustomPagination from "src/components/CustomPagination";
import { useNavigate } from "react-router-dom";
import UpdateAttribute from "./modal/UpdateAttribute";
import ModalConfirm from "src/components/ModalConfirm";
import useToast from "src/components/Toast";

const AttributeTable = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const queryClient = useQueryClient();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [maxPages, setMaxPages] = useState<number>(1);

  const [selected, setSelected] = useState<number[]>([]);
  const handleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const [selectedAttribute, setSelectedAttribute] = useState<IAttribute | null>(
    null
  );
  const [anchorEl, setAnchorEl] = useState<
    HTMLElement | { mouseX: number; mouseY: number } | null
  >(null);
  const [contextItem, setContextItem] = useState<IAttribute | null>(null);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const {
    data: attributes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["attributes", pageNumber, pageSize],
    queryFn: async () => {
      const response = await attributeApi.getPagingApi({
        pageNumber,
        pageSize,
      });
      const realTotalPages = response.data.totalPages ?? 1;
      setMaxPages(realTotalPages);
      return response.data.items ?? [];
    },
    retry: false,
  });

  const invalidateAllCategoryData = () => {
    queryClient.invalidateQueries({
      predicate: (query) =>
        ["attributes"].includes(query.queryKey[0] as string),
    });
  };

  const handleConfirmDelete = async (attributeIds: number[] = selected) => {
    if (attributeIds.length === 0) {
      showError("Xóa thất bại");
      setConfirmModalOpen(false);
      setSelected([]);
      setSelectedAttribute(null);
      return;
    }

    try {
      const res = await attributeApi.deleteAttributeApi(attributeIds);
      if (res.data.success) {
        showSuccess("Xoá thành công!");
        invalidateAllCategoryData();
        setConfirmModalOpen(false);
        setSelected([]);
        setSelectedAttribute(null);
      } else {
        showError("Xoá thất bại!");
      }
    } catch (error) {
      console.error("Error checking delete:", error);
      showError("Xoá thất bại!");
    }
  };

  const attributeMenuActions = atrrinuteContextMenuItems.map((item) => ({
    ...item,
    onClick: (att: IAttribute) => {
      switch (item.id) {
        case "EDIT":
          // console.log("Sửa mục:", att);
          setSelectedAttribute(att);
          setEditModalOpen(true);
          break;
        case "DELETE":
          setSelected([att?.attributeId]);
          setConfirmModalOpen(true);
          break;
        default:
          // console.log("Chọn menu:", item.id, att);
      }
    },
  }));

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
            onClick={() => setConfirmModalOpen(true)}
          >
            Xoá ({selected.length})
          </Button>
        )}
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
                <Checkbox
                  style={{ width: "20px", height: "20px" }}
                  checked={
                    selected.length > 0 && selected.length === attributes.length
                  }
                  indeterminate={
                    selected.length > 0 && selected.length < attributes.length
                  }
                  sx={{
                    color: "#999",
                    "&.Mui-checked": {
                      color: "red",
                    },
                  }}
                  onChange={() => {
                    if (isLoading || attributes.length === 0) return;

                    const isAllSelected = selected.length === attributes.length;
                    const isIndeterminate =
                      selected.length > 0 &&
                      selected.length < attributes.length;

                    if (isAllSelected || isIndeterminate) {
                      setSelected([]);
                    } else {
                      setSelected(
                        attributes.map((a: IAttribute) => a.attributeId)
                      );
                    }
                  }}
                />
              </TableCell>
              <TableCell sx={Styles.tableCell}>Mã thuộc tính</TableCell>
              <TableCell sx={Styles.tableCell}>Tên thuộc tính</TableCell>
              <TableCell sx={Styles.tableCell}>Mô tả</TableCell>
              <TableCell sx={Styles.tableCell}>Người tạo</TableCell>
              <TableCell sx={Styles.tableCell}>Cập nhật</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Đang tải dữ liệu...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={6} sx={{ padding: "10px" }}>
                  Danh sách trống!!
                </TableCell>
              </TableRow>
            ) : attributes && attributes.length > 0 ? (
              attributes.map((attr: IAttribute, index: number) => (
                <TableRow
                  key={attr.attributeId}
                  hover
                  sx={{ cursor: "pointer" }}
                  onContextMenu={(e) => {
                    e.preventDefault();

                    setContextItem(attr);
                    setSelectedAttribute(attr);
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
                      checked={selected.includes(attr.attributeId)}
                      onChange={() => handleSelect(attr.attributeId)}
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
                  <TableCell sx={Styles.tableCellBody}>
                    {attr.attributeId}
                  </TableCell>
                  <TableCell sx={Styles.tableCellBody}>{attr.name}</TableCell>
                  <TableCell sx={Styles.tableCellBody}>
                    {attr.description}
                  </TableCell>
                  <TableCell sx={Styles.tableCellBody}>
                    {attr.creatorName}
                  </TableCell>
                  <TableCell sx={Styles.tableCellBody}>
                    {formatVietnamTime(attr.updatedAt || attr.createAt)}
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
            const newPath = `/admin/attribute/?page=${newPage}`;
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
      <GenericContextMenu
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        items={attributeMenuActions}
        contextItem={contextItem}
      />

      <UpdateAttribute
        open={editModalOpen}
        onClose={() => {
          setSelectedAttribute(null);
          setEditModalOpen(false);
        }}
        attribute={selectedAttribute}
      />

      <ModalConfirm
        open={confirmModalOpen}
        onClose={() => {
          setConfirmModalOpen(false);
          setSelected([]);
          setSelectedAttribute(null);
        }}
        onConfirm={() => handleConfirmDelete()}
        showConfirmButton={true}
        message={
          "Sau khi xóa, liên kết giữa thuộc tính và danh mục, sản phẩm sẽ bị mất, bạn có xác nhận xóa"
        }
      />
    </Box>
  );
};

export default AttributeTable;

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
