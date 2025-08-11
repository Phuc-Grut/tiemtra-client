// OrderDetail.tsx
import {
  Box,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Typography,
  IconButton,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import orderApi from "src/services/api/Order";
import OrderInfoSection from "./OrderInfoSection";
import OrderItemTable from "./OrderItemTable";
import OrderSummary from "./OrderSummary";
import { IOrderDetail } from "src/Interfaces/IOrder";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  open: boolean;
  onClose: () => void;
  orderId?: string;
}

const OrderDetail = ({ open, onClose, orderId }: Props) => {
    
  const { data: order, isLoading } = useQuery<IOrderDetail>({
    queryKey: ["order-detail", orderId],
    queryFn: () => orderApi.getById(orderId!).then((res) => res.data),
    enabled: !!orderId,
  });

  if (isLoading || !order) {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Đang tải đơn hàng...</DialogTitle>
        <DialogContent>
          <CircularProgress />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: 3,
          minHeight: "600px",
        },
      }}
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pr: 1 }}>
        <Typography variant="h6" fontWeight={600}>
          Đơn hàng: {order?.orderCode || "..."}
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {isLoading || !order ? (
          <Box textAlign="center" py={4}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <OrderInfoSection order={order} />
            <Divider sx={{ my: 2 }} />
            <OrderItemTable items={order.orderItems ?? []} />
            <Divider sx={{ my: 2 }} />
            <OrderSummary
              totalItems={order.totalOrderItems ?? 0}
              totalAmount={order.totalAmount ?? 0}
              shippingFee={order.shippingFee ?? 0}
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetail;
