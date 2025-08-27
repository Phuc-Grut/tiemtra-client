// src/views/Account/tabs/OrdersTab.tsx
import * as React from "react";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import getOrderStatusText from "src/utils/getOrderStatusText";
import formatVietnamTime from "src/utils/formatVietnamTime";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { IOrder, IOrderFilter, OrderStatus } from "src/Interfaces/IOrder";
import orderApi from "src/services/api/Order";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import OrderDetail from "src/views/Admin/Order/components/OrderDetail";
import CancelOrderButton from "./CancelOrderButton";

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
  const [filter, setFilter] = useState<IOrderFilter>({
    pageNumber: 1,
    pageSize: 10,
    orderCode: "",
    customerCode: "KH8965",
    orderStatus: undefined,
    paymentMethod: undefined,
    PaymentStatus: undefined,
    sortBy: "",
  });

  const buildCleanFilter = (filter: IOrderFilter) => {
    const cleaned: any = {
      pageNumber: filter.pageNumber ?? 1,
      pageSize: filter.pageSize ?? 10,
    };
    if (filter.orderCode?.trim()) cleaned.orderCode = filter.orderCode.trim();
    if (filter.sortBy?.trim()) cleaned.sortBy = filter.sortBy.trim();
    if (filter.orderStatus !== undefined)
      cleaned.orderStatus = filter.orderStatus;
    if (filter.paymentMethod !== undefined)
      cleaned.paymentMethod = filter.paymentMethod;
    if (filter.PaymentStatus !== undefined)
      cleaned.PaymentStatus = filter.PaymentStatus;

    return cleaned;
  };

  const [maxPages, setMaxPages] = useState<number>(1);

  const rawUser = localStorage.getItem("user");
  const user = rawUser ? JSON.parse(rawUser) : null;
  console.log("🚀 ~ OrdersTab ~ user:", user);
  const userId = user?.userId as string | undefined;

  const [orderDetailModal, setOrderDetailModal] = useState(false);
  const [orderId, setOrderId] = useState("");

  const { data: orders = [], refetch } = useQuery<IOrder[]>({
    queryKey: ["orders-by-user", userId, filter],
    enabled: !!userId,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const cleaned = buildCleanFilter(filter);
      const res = await orderApi.getByUserId(userId!, cleaned);
      setMaxPages(res.data.totalPages ?? 1);
      return res.data.items ?? [];
    },
  });

  const totalOrders = orders.length;

  const delivered = orders.filter(
    (o) => o.orderStatus === OrderStatus.Delivered
  ).length;

  const totalSpend = orders.reduce<number>(
    (s, o) =>
      s +
      (o.orderStatus === OrderStatus.CancelledByShop ||
      o.orderStatus === OrderStatus.CancelledByUser ||
      o.orderStatus === OrderStatus.Refunded
        ? 0
        : Number(o.totalAmount ?? 0) + Number(o.shippingFee ?? 0)),
    0
  );

  const isCancellable = (status: number) => status === 10;

  const columns: GridColDef<IOrder>[] = [
    { field: "orderCode", headerName: "Mã đơn", flex: 1, minWidth: 120 },

    {
      field: "createAt",
      headerName: "Ngày",
      flex: 1,
      minWidth: 160,
      renderCell: (p) => formatVietnamTime(p.row.createAt) as any,
    },

    {
      field: "grandTotal",
      headerName: "Tổng tiền",
      flex: 1,
      minWidth: 140,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row }) => (
        <Box sx={{ width: "100%", textAlign: "center", fontWeight: 600 }}>
          {formatVND(
            Number(row?.totalAmount ?? 0) + Number(row?.shippingFee ?? 0)
          )}
        </Box>
      ),
    },
    {
      field: "orderStatus",
      headerName: "Trạng thái",
      flex: 1,
      minWidth: 170,
      renderCell: (p) => getOrderStatusText(p.row.orderStatus) as any,
      sortable: false,
    },

    {
      field: "actions",
      headerName: "Thao tác",
      minWidth: 140,
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (p) => (
        <Box sx={{ display: "flex", gap: 1, marginTop: 2 }}>
          {/* Nút xem chi tiết */}
          <Tooltip title="Xem chi tiết">
            <IconButton
              size="small"
              color="primary"
              onClick={() => {
                setOrderDetailModal(true);
                setOrderId(p.row.orderId);
              }}
            >
              <OpenInNewIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          {/* Nút hủy đơn */}
          <CancelOrderButton
            orderId={p.row.orderId}
            onSuccess={refetch} // reload lại list sau khi hủy
            disabled={!isCancellable(p.row.orderStatus)} // disable nếu trạng thái ko cho hủy
          />
        </Box>
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
          rows={orders}
          getRowId={(r) => r.orderId}
          columns={columns}
          disableRowSelectionOnClick
          density="comfortable" // compact/comfortable/standard
          hideFooterSelectedRowCount
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 5 } },
            sorting: { sortModel: [{ field: "createAt", sort: "desc" }] },
          }}
          pageSizeOptions={[5, 10, 20]}
          sx={{
            // khung & nền
            border: 0,
            borderRadius: 2,
            boxShadow: 3,
            bgcolor: "background.paper",

            // header
            "& .MuiDataGrid-columnHeaders": {
              position: "sticky",
              top: 0,
              zIndex: 1,
              bgcolor: "grey.50",
              borderBottom: "1px solid",
              borderColor: "divider",
              fontWeight: 700,
            },

            // ô & hàng
            "& .MuiDataGrid-cell": {
              borderBottom: "1px dashed",
              borderColor: "divider",
              fontSize: 14,
            },
            "& .MuiDataGrid-row": {
              transition: "background-color .2s ease",
              "&:hover": { bgcolor: "grey.50" },
            },

            // zebra striping
            "& .MuiDataGrid-virtualScrollerRenderZone .MuiDataGrid-row:nth-of-type(2n)":
              {
                bgcolor: "grey.50",
                "&:hover": { bgcolor: "grey.100" },
              },

            // cột tiền: canh phải & font đậm nhẹ
            '& .MuiDataGrid-cell[data-field="totalAmount"]': {
              fontWeight: 600,
              textAlign: "right",
              pr: 1,
            },
            '& .MuiDataGrid-columnHeader[data-field="totalAmount"]': {
              justifyContent: "flex-end",
              "& .MuiDataGrid-columnHeaderTitleContainer": {
                flexDirection: "row-reverse",
              },
            },

            // cột trạng thái: căn giữa theo chiều dọc
            '& .MuiDataGrid-cell[data-field="orderStatus"]': {
              alignItems: "center",
            },

            // toolbar / footer
            "& .MuiDataGrid-footerContainer": {
              borderTop: "1px solid",
              borderColor: "divider",
              bgcolor: "grey.50",
            },

            // ẩn đường kẻ dọc thô
            "& .MuiDataGrid-iconSeparator": { display: "none" },
          }}
        />
      </Box>
      <OrderDetail
        onClose={() => setOrderDetailModal(false)}
        open={orderDetailModal}
        orderId={orderId}
      />
    </Paper>
  );
};

export default OrdersTab;
