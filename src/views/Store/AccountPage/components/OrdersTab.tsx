// src/views/Account/tabs/OrdersTab.tsx
import * as React from "react";
import {
  Avatar,
  Box,
  Divider,
  Paper,
  Stack,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useAuth } from "src/views/Auth/hook";
import getOrderStatusText from "src/utils/getOrderStatusText";
import formatVietnamTime from "src/utils/formatVietnamTime";

type OrderRow = {
  id: string; // row id (bắt buộc cho DataGrid)
  code: string; // mã đơn
  date: string; // ISO string hoặc yyyy-MM-dd
  total: number; // VND
  status: "Đã giao" | "Đang giao" | "Đã hủy" | string;
};

const formatVND = (n: number) =>
  n.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

const OrdersTab: React.FC<{
  rowsProp?: OrderRow[];
  onViewDetail?: (orderCode: string) => void;
}> = ({ rowsProp, onViewDetail }) => {
  const { user } = useAuth();

  // TODO: thay bằng data thật từ API
  const demoRows = React.useMemo<OrderRow[]>(
    () => [
      {
        id: "1",
        code: "DH001",
        date: "2025-08-18",
        total: 99000,
        status: "Đã hủy",
      },
      {
        id: "2",
        code: "DH002",
        date: "2025-08-10",
        total: 185000,
        status: "Đang giao",
      },
      {
        id: "3",
        code: "DH003",
        date: "2025-08-01",
        total: 320000,
        status: "Đã giao",
      },
      {
        id: "4",
        code: "DH004",
        date: "2025-08-20",
        total: 125000,
        status: "Đã giao",
      },
      {
        id: "5",
        code: "DH005",
        date: "2025-08-21",
        total: 225000,
        status: "Đang giao",
      },
    ],
    []
  );

  const rows = rowsProp ?? demoRows;

  // Tổng quan
  const totalOrders = rows.length;
  const delivered = rows.filter((r) => r.status === "Đã giao").length;
  const totalSpend = rows.reduce(
    (s, r) => s + (r.status !== "Đã hủy" ? r.total : 0),
    0
  );

  // đảm bảo columns khai báo kiểu
  const columns: GridColDef<OrderRow>[] = [
    {
      field: "code",
      headerName: "Mã đơn",
      flex: 1,
      minWidth: 120,
      sortable: true,
    },
    {
      field: "date",
      headerName: "Ngày",
      flex: 1,
      minWidth: 160,
      sortable: true,
      // ✅ v6: lấy giá trị ngày từ nhiều field có thể có
      valueGetter: (_value, row) =>
        row.date ?? (row as any).orderDate ?? (row as any).createdAt,
      // hiển thị bằng helper dayjs của bạn
      valueFormatter: ({ value }) => formatVietnamTime(value as any),
      // sort theo time
      sortComparator: (a, b) =>
        new Date(String(a)).getTime() - new Date(String(b)).getTime(),
    },
    {
      field: "total",
      headerName: "Tổng tiền",
      flex: 1,
      minWidth: 140,
      type: "number",
      align: "right",
      headerAlign: "right",
      // ✅ v6: row là tham số thứ 2
      valueGetter: (_value, row) => {
        const raw =
          (row as any).total ??
          (row as any).totalAmount ??
          (row as any).grandTotal ??
          (row as any).totalPrice;
        if (typeof raw === "number") return raw;
        const n = Number(String(raw ?? "").replace(/[^\d.-]/g, ""));
        return Number.isNaN(n) ? 0 : n;
      },
      valueFormatter: ({ value }) =>
        (Number(value) || 0).toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        }),
    },
    {
      field: "status",
      headerName: "Trạng thái",
      flex: 1,
      minWidth: 170,
      sortable: true,
      renderCell: (params) => {
        const statusNum =
          typeof params.value === "number"
            ? params.value
            : Number((params.row as any).status);
        return getOrderStatusText(statusNum);
      },
    },
    {
      field: "actions",
      headerName: "Thao tác",
      minWidth: 120,
      align: "right",
      headerAlign: "right",
      sortable: false,
      filterable: false,
      renderCell: (p) => (
        <Tooltip title="Xem chi tiết">
          <IconButton
            size="small"
            color="primary"
            onClick={() => onViewDetail?.(p.row.code)}
          >
            <OpenInNewIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, borderRadius: 3 }}>
      {/* Header: avatar + tổng quan */}
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
        <Avatar
          src={user?.avatar ?? undefined}
          sx={{ width: 56, height: 56, bgcolor: "success.main" }}
        >
          {(user?.fullName || user?.email || "U").slice(0, 1).toUpperCase()}
        </Avatar>

        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1" fontWeight={700}>
            Xin chào, {user?.fullName || user?.email || "khách"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Đây là lịch sử đơn hàng của bạn
          </Typography>
        </Box>

        <Stack direction="row" spacing={2}>
          <Box textAlign="right">
            <Typography variant="caption" color="text.secondary">
              Tổng số đơn
            </Typography>
            <Typography variant="h6" fontWeight={800}>
              {totalOrders}
            </Typography>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box textAlign="right">
            <Typography variant="caption" color="text.secondary">
              Đã giao
            </Typography>
            <Typography variant="h6" fontWeight={800}>
              {delivered}
            </Typography>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box textAlign="right">
            <Typography variant="caption" color="text.secondary">
              Tổng chi tiêu
            </Typography>
            <Typography variant="h6" fontWeight={800}>
              {formatVND(totalSpend)}
            </Typography>
          </Box>
        </Stack>
      </Stack>

      {/* DataGrid */}
      <Box
        sx={{
          "& .MuiDataGrid-columnHeaders": { fontWeight: 700 },
          borderRadius: 2,
        }}
      >
        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 5 } },
            sorting: { sortModel: [{ field: "date", sort: "desc" }] },
            filter: { filterModel: { items: [] } },
          }}
          pageSizeOptions={[5, 10, 20]}
        />
      </Box>
    </Paper>
  );
};

export default OrdersTab;
