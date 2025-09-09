import {
  Dialog, DialogTitle, DialogActions, Button
} from "@mui/material";
import { Voucher } from "src/Interfaces/IVoucher";
import VoucherApi from "src/services/api/Voucher";

interface Props {
  open: boolean;
  onClose: () => void;
  voucher: Voucher | null;
  refresh: () => void;
}

const VoucherConfirmDialog = ({ open, onClose, voucher, refresh }: Props) => {
  const handleDelete = async () => {
    if (!voucher) return;
    try {
      await VoucherApi.updateVoucherStatus(voucher.id, 0);
      refresh();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Bạn có chắc muốn xoá voucher này?</DialogTitle>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Xóa
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VoucherConfirmDialog;
