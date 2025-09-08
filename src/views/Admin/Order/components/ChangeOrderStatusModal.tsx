import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import useToast from "src/components/Toast";
import { OrderStatus } from "src/Interfaces/IOrder";
import orderApi from "src/services/api/Order";
import { getStatusDisplayName } from "src/utils/getStatusDisplayName";
import { getValidTransitions } from "src/utils/statusValidator";

type Props = {
  open: boolean;
  onClose: () => void;
  order: {
    orderId: string;
    orderCode: string;
    orderStatus: OrderStatus;
  } | null;
  onSuccess?: () => void;
};

const ChangeOrderStatusModal = ({ open, onClose, order, onSuccess }: Props) => {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | "">("");
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useToast();
  const queryClient = useQueryClient();

  if (!order) return <></>;

  const validTransitions = getValidTransitions(order.orderStatus);
  const hasNoTransition = validTransitions.length === 0;

  const handleChangeStatus = async () => {
    if (!order) return;

    if (selectedStatus === "") {
      showError("Vui lòng chọn trạng thái mới");
      return;
    }

    try {
      setLoading(true);

      if (
        order.orderStatus === OrderStatus.Pending &&
        selectedStatus === OrderStatus.Confirmed
      ) {
        const res = await orderApi.comfirmOrder(order.orderId);
        if (!res.data.success) {
          showError(res.data.message || "Chuyển trạng thái thất bại");
          return;
        }
        showSuccess(res.data.message || "Chuyển trạng thái thành công");
      } else {
        const res = await orderApi.changeOrderStatus(order.orderId, selectedStatus as OrderStatus);
        if (!res.data.success) {
          showError(res.data.message || "Chuyển trạng thái thất bại");
          return;
        }
        showSuccess(res.data.message || "Chuyển trạng thái thành công");
      }

      setSelectedStatus("");
      queryClient.invalidateQueries({ queryKey: ["get-paging-orders"] });
      onClose();
      onSuccess?.();
    } catch (error: any) {
      showError(error?.response?.data?.message || "Lỗi cập nhật trạng thái");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Chuyển trạng thái đơn hàng</DialogTitle>

      <DialogContent sx={{ minWidth: 400 }}>
        <Typography gutterBottom>
          <strong>Mã đơn hàng:</strong> {order.orderCode}
        </Typography>
        <Typography gutterBottom>
          <strong>Trạng thái hiện tại:</strong> {getStatusDisplayName(order.orderStatus)}
        </Typography>

        {/* Nếu có transition thì hiển thị Select, ngược lại hiển thị thông báo */}
        {!hasNoTransition ? (
          <FormControl fullWidth margin="normal">
            <InputLabel id="status-label">Trạng thái mới</InputLabel>
            <Select
              labelId="status-label"
              value={selectedStatus}
              label="Trạng thái mới"
              onChange={(e) => setSelectedStatus(e.target.value as OrderStatus)}
            >
              {validTransitions.map((status) => (
                <MenuItem key={status} value={status}>
                  {getStatusDisplayName(status)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <Typography sx={{ mt: 2 }} color="text.secondary">
            Trạng thái hiện tại không thể thay đổi.
          </Typography>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button
          variant="contained"
          onClick={handleChangeStatus}
          disabled={
            loading ||
            hasNoTransition ||                 // Không có transition thì tắt nút
            selectedStatus === "" ||           // Chưa chọn trạng thái
            selectedStatus === order.orderStatus // Phòng thủ
          }
        >
          Cập nhật
        </Button>
      </DialogActions>
    </Dialog>
  );
};


export default ChangeOrderStatusModal;
