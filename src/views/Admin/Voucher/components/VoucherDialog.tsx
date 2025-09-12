import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Voucher } from "src/Interfaces/IVoucher";
import VoucherApi from "src/services/api/Voucher";

interface Props {
  open: boolean;
  onClose: () => void;
  voucher: Voucher | null;
  refresh: () => void;
}

const VoucherDialog = ({ open, onClose, voucher, refresh }: Props) => {
  const [form, setForm] = useState({
    voucherName: "",
    description: "",
    quantity: 0,
    discountPercentage: 0,
    endDate: "",
  });

  useEffect(() => {
    if (voucher) {
      setForm({
        voucherName: voucher.voucherName,
        description: voucher.description,
        quantity: voucher.quantity,
        discountPercentage: voucher.discountPercentage,
        endDate: voucher.endDate,
      });
    } else {
      setForm({
        voucherName: "",
        description: "",
        quantity: 0,
        discountPercentage: 0,
        endDate: "",
      });
    }
  }, [voucher]);

  const handleSave = async () => {
    try {
      if (voucher) {
        await VoucherApi.updateVoucher(voucher.voucherId, form);
      } else {
        await VoucherApi.createVoucher(form);
      }
      refresh();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {voucher ? "Chỉnh sửa Voucher" : "Thêm Voucher"}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Tên voucher"
          fullWidth
          margin="dense"
          value={form.voucherName}
          onChange={(e) => setForm({ ...form, voucherName: e.target.value })}
        />
        <TextField
          label="Mô tả"
          fullWidth
          margin="dense"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <TextField
          label="Số lượng"
          type="number"
          fullWidth
          margin="dense"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: +e.target.value })}
        />
        <TextField
          label="Phần trăm giảm (%)"
          type="number"
          fullWidth
          margin="dense"
          value={form.discountPercentage}
          onChange={(e) =>
            setForm({ ...form, discountPercentage: +e.target.value })
          }
        />
        <TextField
          label="Ngày hết hạn"
          type="datetime-local"
          fullWidth
          margin="dense"
          InputLabelProps={{ shrink: true }}
          value={form.endDate}
          onChange={(e) => setForm({ ...form, endDate: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button variant="contained" onClick={handleSave}>
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VoucherDialog;
