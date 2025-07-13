import React, { useState } from "react";
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
import DeleteIcon from "@mui/icons-material/Delete";

import brandApi from "src/services/api/Brand";
import { IBrand } from "src/Interfaces/IBrand";
import formatVietnamTime from "src/utils/formatVietnamTime";
import CustomPagination from "src/components/CustomPagination";
import useToast from "src/components/Toast";
import ModalConfirm from "src/components/ModalConfirm";
import GenericContextMenu from "src/components/GenericContextMenu";
import UpdateBrandModal from "src/views/Admin/Brand/components/modal/UpdateBrand";
import { brandContextMenuItems } from "../contextMenu";

const BrandTable = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useToast();

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [maxPages, setMaxPages] = useState(1);
  const [selected, setSelected] = useState<number[]>([]);
  const [contextItem, setContextItem] = useState<IBrand | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | { mouseX: number; mouseY: number } | null>(null);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<IBrand | null>(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState<string[]>([]);
  const [showConfirmButton, setShowConfirmButton] = useState(false);
  const [pendingDeleteIds, setPendingDeleteIds] = useState<number[]>([]);

  const {
    data: brands = [],
    isLoading,
  } = useQuery({
    queryKey: ["brands", pageNumber, pageSize],
    queryFn: async () => {
      const response = await brandApi.getPagingApi({ pageNumber, pageSize });
      const total = response.data.totalPages || 1;
      setMaxPages(total);
      return response.data.items || [];
    },
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  const handleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = async (ids: number[] = selected) => {
    if (ids.length === 0) return;
    try {
      const res = await brandApi.checkCanDeleteManyBrands(ids);
      if (!res.data.canDeleteAll) {
        setConfirmModalOpen(true);
        setConfirmMessage([
          `Có ${res.data.cannotDeleteCount} thương hiệu không thể xoá:`,
          ...res.data.blockers.$values.map((b: { message: string }) => b.message),
        ]);
        setShowConfirmButton(false);
      } else {
        setConfirmModalOpen(true);
        setConfirmMessage([
          "Sau khi xóa, liên kết giữa thương hiệu và sản phẩm sẽ bị mất. Xác nhận xoá?",
        ]);
        setPendingDeleteIds(ids);
        setShowConfirmButton(true);
      }
    } catch {
      showError("Xoá thất bại!");
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await brandApi.deleteManyBrands(pendingDeleteIds);
      if (res.data.success) {
        showSuccess("Xoá thành công!");
        setSelected([]);
        queryClient.invalidateQueries({ queryKey: ["brands"] });
      } else {
        showError("Xoá thất bại!");
      }
    } catch {
      showError("Lỗi khi xoá!");
    } finally {
      setConfirmModalOpen(false);
    }
  };

  const brandMenuActions = brandContextMenuItems.map((item) => ({
    ...item,
    onClick: (brand: IBrand) => {
      switch (item.id) {
        case "EDIT":
          setSelectedBrand(brand);
          setEditModalOpen(true);
          break;
        case "DELETE":
          handleDeleteSelected([brand.brandId]);
          break;
        default:
          console.log("Action:", item.id);
      }
    },
  }));

  return (
    <Box sx={{ p: 1, backgroundColor: "#fff", borderRadius: 2, boxShadow: 1 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <input
          type="text"
          placeholder="Tìm kiếm thương hiệu..."
          style={{ width: 220, fontSize: 13, padding: "4px 8px", borderRadius: 4, border: "1px solid #ccc" }}
        />

        {selected.length > 0 && (
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon sx={{ fontSize: 16 }} />}
            size="small"
            onClick={() => handleDeleteSelected()}
          >
            Xoá ({selected.length})
          </Button>
        )}
      </Box>

      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selected.length === brands.length && brands.length > 0}
                  indeterminate={selected.length > 0 && selected.length < brands.length}
                  onChange={() =>
                    setSelected(
                      selected.length === brands.length ? [] : brands.map((b: { brandId: any; }) => b.brandId)
                    )
                  }
                />
              </TableCell>
              <TableCell>Logo</TableCell>
              <TableCell>Tên thương hiệu</TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell>Người tạo</TableCell>
              <TableCell>Cập nhật</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={6}>Đang tải...</TableCell></TableRow>
            ) : brands.length === 0 ? (
              <TableRow><TableCell colSpan={6}>Không có dữ liệu</TableCell></TableRow>
            ) : (
              brands.map((brand : IBrand) => (
                <TableRow
                  key={brand.brandId}
                  hover
                  onContextMenu={(e) => {
                    e.preventDefault();
                    setAnchorEl({ mouseX: e.clientX, mouseY: e.clientY });
                    setContextItem(brand);
                  }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selected.includes(brand.brandId)}
                      onChange={() => handleSelect(brand.brandId)}
                    />
                  </TableCell>
                  <TableCell>
                    {brand.logoUrl ? (
                      <img
                        src={brand.logoUrl}
                        alt={brand.brandName}
                        style={{ width: 40, height: 40, borderRadius: 4, objectFit: "cover" }}
                      />
                    ) : "Không có ảnh"}
                  </TableCell>
                  <TableCell>{brand.brandName}</TableCell>
                  <TableCell>{brand.description || "Không có mô tả"}</TableCell>
                  <TableCell>{brand.creatorName}</TableCell>
                 
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box mt={1} display="flex" justifyContent="center" alignItems="center" gap={2}>
        <CustomPagination
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          totalPages={maxPages}
        />
        <TextField
          select
          size="small"
          variant="standard"
          value={pageSize}
          onChange={(e) => {
            setPageSize(parseInt(e.target.value));
            setPageNumber(1);
          }}
        >
          {[5, 10, 15, 20].map((size) => (
            <MenuItem key={size} value={size}>{size}</MenuItem>
          ))}
        </TextField>
      </Box>

      <GenericContextMenu
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        items={brandMenuActions}
        contextItem={contextItem}
      />

      <UpdateBrandModal
        open={editModalOpen}
        brand={selectedBrand}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedBrand(null);
        }}
      />

      <ModalConfirm
        open={confirmModalOpen}
        message={confirmMessage}
        onClose={() => {
          setConfirmModalOpen(false);
          setPendingDeleteIds([]);
          setSelected([]);
        }}
        onConfirm={handleConfirmDelete}
        showConfirmButton={showConfirmButton}
      />
    </Box>
  );
};

export default BrandTable;