import React, { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Paper,
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
import UpdateBrandModal from "./modal/UpdateBrand";
import { brandContextMenuItems } from "../contextMenu";
import DataTableContainer from "src/components/DataTableContainer";

const BrandTable = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useToast();

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [maxPages, setMaxPages] = useState(1);

  const [selected, setSelected] = useState<number[]>([]);
  const [anchorEl, setAnchorEl] = useState<{ mouseX: number; mouseY: number } | null>(null);
  const [contextItem, setContextItem] = useState<IBrand | null>(null);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<IBrand | null>(null);

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState<string[]>([]);
  const [showConfirmButton, setShowConfirmButton] = useState(false);
  const [pendingDeleteIds, setPendingDeleteIds] = useState<number[]>([]);

  const { data: brands = [], isLoading } = useQuery({
    queryKey: ["brands", pageNumber, pageSize],
    queryFn: async () => {
      const res = await brandApi.getPagingApi({ pageNumber, pageSize });
      setMaxPages(res.data.totalPages || 1);
      return res.data.items || [];
    },
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  const handleDeleteSelected = async (ids: number[] = selected) => {
    if (!ids.length) return;
    try {
      const res = await brandApi.checkCanDeleteManyBrands(ids);
      if (!res.data.canDeleteAll) {
        setConfirmModalOpen(true);
        setConfirmMessage([
          `Có ${res.data.cannotDeleteCount} thương hiệu không thể xoá:`,
          ...res.data.blockers.$values.map((b: any) => b.message),
        ]);
        setShowConfirmButton(false);
      } else {
        setConfirmModalOpen(true);
        setConfirmMessage(["Sau khi xóa, liên kết giữa thương hiệu và sản phẩm sẽ bị mất. Xác nhận xoá?"]);
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

  const contextActions = brandContextMenuItems.map((action) => ({
    ...action,
    onClick: (brand: IBrand) => {
      switch (action.id) {
        case "EDIT":
          setSelectedBrand(brand);
          setEditModalOpen(true);
          break;
        case "DELETE":
          handleDeleteSelected([brand.brandId]);
          break;
        default:
          break;
      }
    },
  }));

  const columns = [
    {
      key: "logoUrl",
      label: "Logo",
      width: 80,
      render: (item: IBrand) =>
        item.logoUrl ? (
          <img
            src={item.logoUrl}
            alt={item.brandName}
            style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 4 }}
          />
        ) : (
          "Không có ảnh"
        ),
    },
    { key: "brandName", label: "Tên thương hiệu", sortable: true },
    { key: "description", label: "Mô tả" },
    { key: "creatorName", label: "Người tạo" },
    {
      key: "updatedAt",
      label: "Cập nhật",
      render: (item: IBrand) => formatVietnamTime(item.updatedAt as string),
    },
  ];

  return (
    <Box sx={{ p: 2, bgcolor: "#fff", borderRadius: 2, boxShadow: 1 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          placeholder="Tìm kiếm thương hiệu..."
          size="small"
          variant="outlined"
          sx={{ width: 240 }}
        />
        {selected.length > 0 && (
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            size="small"
            onClick={() => handleDeleteSelected()}
          >
            Xoá ({selected.length})
          </Button>
        )}
      </Box>

      <DataTableContainer
        data={brands}
        selected={selected}
        setSelected={(ids) => setSelected(ids as number[])}
        columns={columns}
        isLoading={isLoading}
        error={brands.length === 0}
        onContextMenu={(e, item) => {
          setAnchorEl({ mouseX: e.clientX, mouseY: e.clientY });
          setContextItem(item);
        }}
        getRowId={(item: IBrand) => item.brandId}
      />

      <Box mt={2} display="flex" justifyContent="center" alignItems="center" gap={2}>
        <CustomPagination
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          totalPages={maxPages}
        />
        <TextField
          select
          size="small"
          value={pageSize}
          onChange={(e) => {
            setPageSize(parseInt(e.target.value));
            setPageNumber(1);
          }}
          variant="outlined"
        >
          {[5, 10, 15, 20].map((size) => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <GenericContextMenu
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        items={contextActions}
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
