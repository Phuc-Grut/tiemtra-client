import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { IOrder, IOrderFilter } from "src/Interfaces/IOrder";
import { ColumnConfig } from "src/Interfaces/Table";
import orderApi from "src/services/api/Order";
import formatVietnamTime from "src/utils/formatVietnamTime";
import getOrderStatusText from "src/utils/getOrderStatusText";
import { orderContextMenuItems } from "../contextMenu";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DataTableContainer from "src/components/DataTableContainer";
import GenericContextMenu from "src/components/GenericContextMenu";
import CustomPagination from "src/components/CustomPagination";
import NoteCell from "src/components/NoteCell";

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

  console.log("🚀 ~ OrderTable ~ orders:", orders);

  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [selected, setSelected] = useState<(string | number)[]>([]);
  const [contextItem, setContextItem] = useState<IOrder | null>(null);

  const orderMenuActions = orderContextMenuItems.map((item) => ({
    ...item,
    onClick: (o: IOrder) => {
      switch (item.id) {
        case "VIEW":
          setOrderModalOpen(true);
          setOrderId(o.orderId);
          break;
        case "EDIT":
          setOrderModalOpen(true);
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
      width: 120,
      render: (item) => (
        <Box>
          <Typography fontWeight="bold">{item.customerCode}</Typography>
          <Typography fontSize={12} color="text.secondary">
            {item.customerName}
          </Typography>
        </Box>
      ),
    },
    {
      key: "receiver",
      label: "Người nhận",
      width: 120,
      render: (item) => (
        <Box>
          <Typography fontWeight="bold">{item.receivertName}</Typography>
          <Typography fontSize={12} color="text.secondary">
            {item.receiverPhone}
          </Typography>
        </Box>
      ),
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
      render: (item) => getOrderStatusText(item.paymentMethod ?? -1),
    },

    {
      key: "paymentStatus",
      label: "Trạng thái thanh toán",
      width: 220,
      render: (item) => getOrderStatusText(item.paymentMethod ?? -1),
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
      render: (item) => formatVietnamTime(item.updateAt || item.createAt),
    },
  ];

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
            // onClick={() => setConfirmModalOpen(true)}
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
        items={orderContextMenuItems}
        contextItem={contextItem}
      />
    </Box>
  );
};

export default OrderTable;
