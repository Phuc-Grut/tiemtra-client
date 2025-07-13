import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { IOrder, IOrderFilter } from "src/Interfaces/IOrder";
import { ColumnConfig } from "src/Interfaces/Table";
import orderApi from "src/services/api/Order";
import formatVietnamTime from "src/utils/formatVietnamTime";
import getOrderStatusText from "src/utils/getOrderStatusText";
import { orderContextMenuItems } from "../contextMenu";
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
import DeleteIcon from "@mui/icons-material/Delete";
import DataTableContainer from "src/components/DataTableContainer";
import GenericContextMenu from "src/components/GenericContextMenu";
import CustomPagination from "src/components/CustomPagination";
import NoteCell from "src/components/NoteCell";
import { getPaymentMethodChip } from "src/utils/getPaymentMethodChip";
import { getPaymentStatusChip } from "src/utils/getPaymentStatusChip";
import ModalConfirm from "src/components/ModalConfirm";
import useToast from "src/components/Toast";

const OrderTable = () => {
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

  const [anchorEl, setAnchorEl] = useState<
    HTMLElement | { mouseX: number; mouseY: number } | null
  >(null);
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useToast();
  const [maxPages, setMaxPages] = useState<number>(1);

  const [filter, setFilter] = useState<IOrderFilter>({
    pageNumber: 1,
    pageSize: 10,
    orderCode: "",
    customerCode: "",
    orderStatus: undefined,
    paymentMethod: undefined,
    PaymentStatus: undefined,
    sortBy: "",
  });

  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["get-paging-orders", filter],
    queryFn: async () => {
      const cleanedFilter = buildCleanFilter(filter);
      const response = await orderApi.getPagingOrder(cleanedFilter);
      const realTotalPages = response.data.totalPages;
      setMaxPages(realTotalPages);

      return response.data.items ?? [];
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  const [confirmOrderModalOpen, setConfirmOrderModalOpen] = useState(false);

  const [orderId, setOrderId] = useState("");
  console.log("🚀 ~ OrderTable ~ orderId:", orderId);
  const [selected, setSelected] = useState<(string | number)[]>([]);
  const [contextItem, setContextItem] = useState<IOrder | null>(null);

  const handleOrderStatusChange = (e: SelectChangeEvent) => {
    const value = e.target.value;
    setFilter((prev) => ({
      ...prev,
      orderStatus: value === "" ? undefined : parseInt(value),
      pageNumber: 1,
    }));
  };

  const orderMenuActions = orderContextMenuItems.map((item) => ({
    ...item,
    onClick: (o: IOrder) => {
      switch (item.id) {
        case "VIEW":
          // setOrderModalOpen(true);
          setOrderId(o.orderId);
          console.log("Xem đơn hàng:", o.orderId);
          break;

        case "CONFIRM_ORDER":
          setConfirmOrderModalOpen(true);
          setOrderId(o.orderId);
          console.log("Xác nhận đơn hàng:", o.orderId);
          break;

        case "EDIT":
          // setOrderModalOpen(true);
          setOrderId(o.orderId);
          // setProductModalMode("edit");
          break;
        case "DELETE":
          console.log("delete mục:", o.orderId);
          // setSelected([p.productId]);
          // setConfirmModalOpen(true);
          break;
        default:
          console.log("Chọn menu:", item.id, o);
      }
    },
  }));

  const renderPrice = (o: IOrder): string =>
    o.totalAmount && o.totalAmount > 0
      ? o.totalAmount.toLocaleString() + " đ"
      : "";

  const columns: ColumnConfig<IOrder>[] = [
    {
      key: "orderCode",
      label: "Mã đơn hàng",
      width: 120,
    },
    {
      key: "customer",
      label: "Khách hàng",
      width: 160,
      render: (item) => (
        <Box>
          <Typography fontWeight="bold" fontSize={12}>
            {item.customerCode}
          </Typography>
          <Typography fontSize={14} color="text.secondary">
            {item.customerName}
          </Typography>
        </Box>
      ),
    },

    {
      key: "receiver",
      label: "Người nhận",
      width: 150,
      render: (item) => (
        <Box>
          <Typography fontSize={14}>{item.receivertName}</Typography>
          <Typography fontSize={14} color="text.secondary">
            {item.receiverPhone}
          </Typography>
        </Box>
      ),
    },

    {
      key: "receiverAddress",
      label: "Địa chỉ giao hàng",
      width: 280,
    },

    {
      key: "totalAmount",
      label: "Tổng tiền",
      width: 150,
      sortable: true,
      render: (item) => renderPrice(item),
    },

    {
      key: "orderStatus",
      label: "Trạng thái",
      width: 120,
      render: (item) => getOrderStatusText(item.orderStatus ?? -1),
    },

    {
      key: "paymentMethod",
      label: "Phương thức thanh toán",
      width: 220,
      render: (item) => getPaymentMethodChip(item.paymentMethod ?? -1),
    },

    {
      key: "paymentStatus",
      label: "Trạng thái thanh toán",
      width: 220,
      render: (item) => getPaymentStatusChip(item.paymentStatus ?? -1),
    },
    {
      key: "note",
      label: "Ghi chú",
      width: 200,
      render: (item) => <NoteCell value={item?.note} />,
    },
    {
      key: "createdAt",
      label: "Thời gian tạo",
      render: (item) => formatVietnamTime(item.createAt),
    },
  ];

  const handleConfirmOrder = async (orderId: string) => {
  try {
    const res = await orderApi.comfirmOrder(orderId);

    if (!res.data.success) {
      showError(res.data.message || "Đã có lỗi xảy ra");
      return;
    }

    showSuccess(res.data.message || "Xác nhận đơn hàng thành công");

    queryClient.invalidateQueries({
      queryKey: ["get-paging-orders"],
    });

    setConfirmOrderModalOpen(false);
  } catch (error: any) {
    const apiMessage = error?.response?.data?.message || "Lỗi kết nối đến máy chủ";
    showError(apiMessage);
  }
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
            value={
              filter.orderStatus !== undefined ? String(filter.orderStatus) : ""
            }
            onChange={handleOrderStatusChange}
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
            <MenuItem value={0}>Chờ xác nhận</MenuItem>
            <MenuItem value={1}>Đã xác nhận</MenuItem>
            <MenuItem value={2}>Đang giao hàng</MenuItem>
            <MenuItem value={3}>Đã giao hàng</MenuItem>
            <MenuItem value={4}>Giao thất bại</MenuItem>
            <MenuItem value={5}>Shop huỷ</MenuItem>
            <MenuItem value={6}>Người mua huỷ</MenuItem>
            <MenuItem value={7}>Đã hoàn tiền</MenuItem>
          </Select>
        </FormControl>

        <FormControl
          size="small"
          sx={{
            width: "300px",
            height: "130%",
            overflow: "hidden",
          }}
        >
          <Select
            value={
              filter.orderCode !== undefined ? String(filter.orderCode) : ""
            }
            // onChange={handleOrderStatusChange}
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
            <MenuItem value="">Khách Hàng</MenuItem>
            {/* <MenuItem value={0}>Chờ xác nhận</MenuItem>
            <MenuItem value={1}>Đã xác nhận</MenuItem>
            <MenuItem value={2}>Đang giao hàng</MenuItem>
            <MenuItem value={3}>Đã giao hàng</MenuItem>
            <MenuItem value={4}>Giao thất bại</MenuItem>
            <MenuItem value={5}>Shop huỷ</MenuItem>
            <MenuItem value={6}>Người mua huỷ</MenuItem>
            <MenuItem value={7}>Đã hoàn tiền</MenuItem> */}
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

      <DataTableContainer<IOrder>
        data={orders}
        selected={selected}
        setSelected={setSelected}
        columns={columns}
        isLoading={isLoading}
        error={!!error}
        sortBy={filter.sortBy}
        // toggleSort={toggleSort}
        getRowId={(o) => o.orderId}
        onRowClick={(o) => {
          //   setModalOpen(true);
          //   setProductId(p.productId);
          //   setProductModalMode("view");
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
        items={orderMenuActions}
        contextItem={contextItem}
      />

      <ModalConfirm
        open={confirmOrderModalOpen}
        onClose={() => {
          setConfirmOrderModalOpen(false);
          setOrderId("");
        }}
        onConfirm={() => handleConfirmOrder(orderId)}
        showConfirmButton={true}
        title="Xác nhận đơn hàng"
        message={"Bạn có muốn xác nhân đơn hàng này"}
      />
    </Box>
  );
};

export default OrderTable;
