import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { IVoucher, IVoucherFilter } from "src/Interfaces/IVoucher";
import voucherApi from "src/services/api/Voucher";
import { voucherContextMenuItems } from "../contextMenu";
import { ColumnConfig } from "src/Interfaces/Table";
import formatVietnamTime from "src/utils/formatVietnamTime";
import getVoucherStatusText from "src/utils/getVoucherStatusText";
import DeleteIcon from "@mui/icons-material/Delete";
import DataTableContainer from "src/components/DataTableContainer";
import CustomPagination from "src/components/CustomPagination";
import GenericContextMenu from "src/components/GenericContextMenu";
import VoucherDetailDialog from "./VoucherDetailDialog";

const VoucherTable = () => {
  const buildCleanFilter = (filter: IVoucherFilter) => {
    const cleaned: any = {
      pageNumber: filter.pageNumber ?? 1,
      pageSize: filter.pageSize ?? 10,
    };
    if (filter.keyword?.trim()) cleaned.keyword = filter.keyword.trim();
    if (filter.status !== undefined) cleaned.status = filter.status;

    return cleaned;
  };

  const [anchorEl, setAnchorEl] = useState<
    HTMLElement | { mouseX: number; mouseY: number } | null
  >(null);
  const [maxPages, setMaxPages] = useState<number>(1);

  const [filter, setFilter] = useState<IVoucherFilter>({
    pageNumber: 1,
    pageSize: 10,
    status: undefined,
    keyword: "",
  });

  const {
    data: vouchers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["get-paging-vouchers", filter],
    queryFn: async () => {
      const cleanedFilter = buildCleanFilter(filter);
      const response = await voucherApi.getPagingVoucher(cleanedFilter);
      const realTotalPages = response.data.totalPages;
      setMaxPages(realTotalPages);

      return response.data.items ?? [];
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  const [voucherId, setVoucherId] = useState("");
  const [selected, setSelected] = useState<(string | number)[]>([]);
  
  const [contextItem, setContextItem] = useState<IVoucher | null>(null);
  const [cancelOpen, setCancelOpen] = useState(false);

  const [voucherModalOpen, setVoucherModalOpen] = useState(false);
  const [voucherModalMode, setVoucherModalMode] = useState<"view" | "edit">(
    "view"
  );

  const voucherMenuActions = voucherContextMenuItems.map((item) => ({
    ...item,
    onClick: (v: IVoucher) => {
      switch (item.id) {
        case "VIEW":
          setVoucherModalOpen(true);
          setVoucherModalMode("view");
          setVoucherId(v.voucherId);
          break;
        // case "CHANGE_ORDER_STATUS":
        //   console.log("Chuyển trạng thái:", v.voucherId);
        //   setChangeVoucherStatusModal(true);
        //   setSelecteVoucher(v);
        //   break;

        case "EDIT":
          setVoucherModalOpen(true);
          setVoucherModalMode("edit");
          setVoucherId(v.voucherId);
          break;
        case "DELETE_ORDER":
          setVoucherId(v.voucherId);
          setCancelOpen(true);
          break;
        default:
        // console.log("Chọn menu:", item.id, o);
      }
    },
  }));

  const columns: ColumnConfig<IVoucher>[] = [
    {
      key: "voucherCode",
      label: "Mã voucher",
      width: 120,
    },
    {
      key: "voucherName",
      label: "Tên Voucher",
      width: 160,
      render: (item) => (
        <Box>
          <Typography fontWeight="bold" fontSize={12}>
            {item.voucherName}
          </Typography>
        </Box>
      ),
    },

    {
      key: "discountPercentage",
      label: "Giảm giá",
      width: 150,
      render: (item) => (
        <Box>
          <Typography fontSize={14}>{item.discountPercentage}</Typography>
        </Box>
      ),
    },

    {
      key: "endDate",
      label: "Ngày hết hạn",
      width: 280,
      render: (item) => formatVietnamTime(item.endDate),
    },

    {
      key: "status",
      label: "Trạng thái",
      width: 120,
      render: (item) => getVoucherStatusText(item.status ?? -1),
    },
  ];

  const handleVoucherStatusChange = (e: SelectChangeEvent) => {
    const value = e.target.value;
    setFilter((prev) => ({
      ...prev,
      status: value === "" ? undefined : parseInt(value),
      pageNumber: 1,
    }));
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
          padding: "6px",
          borderBottom: "3px solid #ddd",
          height: "33px",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <input
          type="text"
          placeholder="Tìm kiếm..."
          style={{
            width: "100%",
            maxWidth: "200px",
            height: "130%",
            fontSize: "13px",
            padding: "0px 8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        <FormControl
          size="small"
          sx={{
            width: "180px",
            height: "130%",
            overflow: "hidden",
          }}
        >
          <Select
            value={filter.status !== undefined ? String(filter.status) : ""}
            onChange={handleVoucherStatusChange}
            displayEmpty
            sx={{
              height: "24px",
              fontSize: "14px",
              padding: "0px 8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              backgroundColor: "white",
              boxSizing: "border-box",
              "& fieldset": {
                border: "none",
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  fontSize: "14px",
                  maxHeight: "50vh",
                  overflowY: "auto",
                },
              },
            }}
          >
            <MenuItem value="">Trạng thái</MenuItem>
            <MenuItem value={0}>Chờ áp dụng</MenuItem>
            <MenuItem value={1}>Đang hoạt động</MenuItem>
          </Select>
        </FormControl>

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
              ml: "auto",
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
          >
            Xoá ({selected.length})
          </Button>
        )}
      </Box>

      <DataTableContainer<IVoucher>
        data={vouchers ?? []}
        selected={selected ?? []}
        setSelected={setSelected}
        columns={columns}
        isLoading={isLoading}
        error={!!error}
        // sortBy={filter.sortBy}
        // toggleSort={toggleSort}
        getRowId={(v) => v.voucherId}
        onRowClick={(v) => {
          setVoucherModalOpen(true);
          setVoucherModalMode("view");
          setVoucherId(v.voucherId);
        }}
        onContextMenu={(e, o) => {
          setContextItem(o);
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
        items={voucherMenuActions}
        contextItem={contextItem}
      />

      <VoucherDetailDialog
        open={voucherModalOpen}
        mode={voucherModalMode}
        voucherId={voucherId}
        onClose={() => {
          setVoucherModalOpen(false);
          setVoucherId("");
          setSelected([]);
        }}
      />
    </Box>
  );
};

export default VoucherTable;
