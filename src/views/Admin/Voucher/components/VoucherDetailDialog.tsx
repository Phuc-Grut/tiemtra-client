import {
  Dialog, DialogTitle, DialogContent, Typography
} from "@mui/material";
import { Voucher } from "src/Interfaces/IVoucher";

interface Props {
  open: boolean;
  onClose: () => void;
  voucher: Voucher | null;
}

const VoucherDetailDialog = ({ open, onClose, voucher }: Props) => {
  if (!voucher) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Chi tiết Voucher</DialogTitle>
      <DialogContent>
        <Typography>Mã: {voucher.voucherCode}</Typography>
        <Typography>Tên: {voucher.voucherName}</Typography>
        <Typography>Mô tả: {voucher.description}</Typography>
        <Typography>Giảm giá: {voucher.discountPercentage}%</Typography>
        <Typography>Tổng số lượng: {voucher.quantity}</Typography>
        <Typography>Đã dùng: {voucher.usedquantity}</Typography>
        <Typography>Ngày hết hạn: {voucher.endDate}</Typography>
      </DialogContent>
    </Dialog>
  );
};

export default VoucherDetailDialog;
