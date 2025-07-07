import {
  Box,
  Button,
  MenuItem,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { IBrand, IBrandFilterRequest } from "src/Interfaces/IBrand";
import brandApi from "src/services/api/Brand";
import CustomPagination from "src/components/CustomPagination";
import GenericContextMenu from "src/components/GenericContextMenu";
import DataTableContainer from "src/components/DataTableContainer";
import { brandContextMenuItems } from "../contextMenu";

interface ColumnConfig<T> {
  key: string;
  label: string;
  width?: number;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
  align?: "left" | "center" | "right";
}

interface BrandTableProps {
  onEdit: (brandId: number) => void;
  onView: (brandId: number) => void;
}

const BrandTable: React.FC<BrandTableProps> = ({ onEdit, onView }) => {
  const [selected, setSelected] = useState<(string | number)[]>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | { mouseX: number; mouseY: number } | null>(null);
  const [contextItem, setContextItem] = useState<IBrand | null>(null);
  const [maxPages, setMaxPages] = useState<number>(1);

  const [filter, setFilter] = useState<IBrandFilterRequest>({
    pageNumber: 1,
    pageSize: 10,
    keyword: "",
    sortBy: "",
  });

  const { data: brands, isLoading, error } = useQuery({
    queryKey: ["get-paging-brand", filter],
    queryFn: async () => {
      const response = await brandApi.getPagingApi(filter);
      const realTotalPages = response.data.totalPages ?? 1;
      setMaxPages(realTotalPages);
      return response.data.items ?? [];
    },
  });

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

  const brandMenuActions = brandContextMenuItems.map((item) => ({
    ...item,
    onClick: (brand: IBrand) => {
      switch (item.id) {
        case "VIEW":
          onView(brand.brandId);
          break;
        case "EDIT":
          onEdit(brand.brandId);
          break;
        case "DELETE":
          console.log("delete", brand.brandId);
          break;
        default:
          break;
      }
    },
  }));

  const columns: ColumnConfig<IBrand>[] = [
    {
      key: "brandName",
      label: "Tên thương hiệu",
      width: 200,
    },
    {
      key: "description",
      label: "Mô tả",
      width: 300,
    },
    {
      key: "logo",
      label: "Logo",
      width: 100,
      render: (b: IBrand) => (
        <img
          src={b.logo || "https://via.placeholder.com/50"}
          alt="logo"
          style={{ width: 40, height: 40, borderRadius: 4 }}
        />
      ),
    },
    {
      key: "creatorName",
      label: "Người tạo",
      width: 150,
    },
    {
      key: "updaterName",
      label: "Người cập nhật",
      width: 150,
    },
    {
      key: "createdAt",
      label: "Ngày tạo",
      width: 150,
      render: (b: IBrand) => new Date(b.createdAt ?? '').toLocaleDateString("vi-VN"),
    },
    {
      key: "updatedAt",
      label: "Ngày cập nhật",
      width: 150,
      render: (b: IBrand) => new Date(b.updatedAt ?? '').toLocaleDateString("vi-VN"),
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
      <DataTableContainer<IBrand>
        data={brands}
        selected={selected}
        setSelected={setSelected}
        columns={columns}
        isLoading={isLoading}
        error={!!error}
        sortBy={filter.sortBy}
        toggleSort={toggleSort}
        getRowId={(b) => b.brandId}
        onRowClick={(b) => onView(b.brandId)}
        onContextMenu={(e, b) => {
          setContextItem(b);
          setAnchorEl({ mouseX: e.clientX, mouseY: e.clientY });
        }}
      />

      <Box mt={1} display="flex" justifyContent="center" alignItems="center" gap={2}>
        <CustomPagination
          pageNumber={filter.pageNumber}
          totalPages={maxPages}
          setPageNumber={(newPage) =>
            setFilter((prev) => ({ ...prev, pageNumber: newPage }))
          }
        />

        <Box display="flex" alignItems="center" gap={1}>
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
            sx={{ width: 80 }}
          >
            {[5, 10, 15, 20].map((option) => (
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
        items={brandMenuActions}
        contextItem={contextItem}
      />
    </Box>
  );
};

export default BrandTable;