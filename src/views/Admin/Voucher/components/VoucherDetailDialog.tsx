import React, { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  Grid,
  Button,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import dayjs from "dayjs";
import { IVoucher, VoucherStatus } from "src/Interfaces/IVoucher";
import voucherApi from "src/services/api/Voucher";
import { useQueryClient } from "@tanstack/react-query";
import useToast from "src/components/Toast";

type Mode = "create" | "edit" | "view";

interface Props {
  open: boolean;
  onClose: () => void;
  voucherId?: string;
  mode: Mode;
  onSuccess?: () => void;
}

type FormState = {
  voucherName: string;
  description: string;
  quantity: number | "";
  discountPercentage: number | "";
  endDate: string; // yyyy-MM-ddTHH:mm
  usedQuantity?: number | "";
  voucherStatus?: VoucherStatus;
};

const STATUS = {
  Pending: 0,
  Publish: 1,
  Expired: 2,
  UsedUp: 3,
  Inactive: 4,
  Deleted: 5,
} as const;

const emptyForm: FormState = {
  voucherName: "",
  description: "",
  quantity: "",
  discountPercentage: "",
  endDate: dayjs().add(7, "day").startOf("day").format("YYYY-MM-DDTHH:mm"),
  usedQuantity: "",
  voucherStatus: VoucherStatus.Pending,
};

const toLocalInputValue = (iso?: string) =>
  iso ? dayjs(iso).format("YYYY-MM-DDTHH:mm") : "";

const toServerIso = (localDT: string) =>
  localDT ? dayjs(localDT).toISOString() : "";

const VoucherDetailDialog = ({
  open,
  onClose,
  voucherId,
  mode,
  onSuccess,
}: Props) => {
  const isView = mode === "view";
  const isCreate = mode === "create";
  const isEdit = mode === "edit";

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const queryClient = useQueryClient();

  const { showSuccess, showError } = useToast();

  // Fetch data for edit/view
  useEffect(() => {
    let mounted = true;
    setError(null);

    if (open && !isCreate && voucherId) {
      setLoading(true);
      voucherApi
        .getVoucherById(voucherId)
        .then((res: { data: IVoucher }) => {
          if (!mounted) return;
          const v: IVoucher = res.data;
          console.log("🚀 ~ VoucherDetailDialog ~ v:", v);
          setForm({
            voucherName: v.voucherName ?? "",
            description: v.description ?? "",
            quantity: (v.quantity as any) ?? "",
            discountPercentage: (v.discountPercentage as any) ?? "",
            endDate: toLocalInputValue(v.endDate as any),
            usedQuantity: v.usedQuantity,
            voucherStatus: v.status,
          });
        })
        .catch((e: { response: { data: { message: any } } }) => {
          if (!mounted) return;
          setError(e?.response?.data?.message || "Không tải được voucher.");
          showError("Đã có lỗi khi lấy thông tin");
        })
        .finally(() => mounted && setLoading(false));
    } else if (open && isCreate) {
      setForm(emptyForm);
    }

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, voucherId, mode]);

  const readOnly = useMemo(() => isView, [isView]);

  const handleChange =
    (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      // number fields
      if (key === "quantity" || key === "discountPercentage") {
        setForm((f) => ({ ...f, [key]: val === "" ? "" : Number(val) }));
      } else {
        setForm((f) => ({ ...f, [key]: val }));
      }
    };

  const validate = (): string | null => {
    if (!form.voucherName?.trim()) return "Vui lòng nhập tên voucher.";
    if (
      form.quantity === "" ||
      Number.isNaN(form.quantity) ||
      (form.quantity as number) < 0
    )
      return "Số lượng phải là số không âm.";
    if (
      form.discountPercentage === "" ||
      Number.isNaN(form.discountPercentage) ||
      (form.discountPercentage as number) < 0 ||
      (form.discountPercentage as number) > 100
    )
      return "Phần trăm giảm phải từ 0–100.";
    if (!form.endDate) return "Vui lòng chọn ngày hết hạn.";
    if (dayjs(form.endDate).isBefore(dayjs()))
      return "Ngày hết hạn phải ở tương lai.";
    if ((form.voucherStatus ?? STATUS.Pending) === STATUS.Publish) {
      if (dayjs(form.endDate).isBefore(dayjs()))
        return "Không thể bật 'Đang hoạt động' khi đã hết hạn.";
      if ((Number(form.quantity) ?? 0) - (Number(form.usedQuantity) ?? 0) <= 0)
        return "Không thể bật 'Đang hoạt động' khi đã hết lượt.";
    }
    return null;
  };

  const handleSubmit = async () => {
    const msg = validate();
    if (msg) {
      setError(msg);
      return;
    }
    setError(null);
    setSaving(true);
    try {
      const payload = {
        voucherName: form.voucherName.trim(),
        description: form.description?.trim() ?? "",
        quantity: Number(form.quantity),
        discountPercentage: Number(form.discountPercentage),
        endDate: toServerIso(form.endDate),
        voucherStatus: form.voucherStatus,
      };

      if (isCreate) {
        await voucherApi.createVoucher(payload);
        queryClient.invalidateQueries({ queryKey: ["get-paging-vouchers"] });
        showSuccess("Tạo thành công");
      } else if (isEdit && voucherId) {
        await voucherApi.updateVoucher(voucherId, payload);
        queryClient.invalidateQueries({ queryKey: ["get-paging-vouchers"] });
        showSuccess("Sửa thành công");
      }
      onSuccess?.();
      onClose();
    } catch (e: any) {
      setError(e?.response?.data?.message || "Lưu voucher thất bại.");
      showError(" Lưu thất bại ");
    } finally {
      setSaving(false);
    }
  };

  const statusOptionsEdit = [
    { value: VoucherStatus.Pending, label: "Chờ áp dụng" },
    { value: VoucherStatus.Publish, label: "Đang hoạt động" },
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {isCreate
          ? "Tạo Voucher"
          : isEdit
          ? "Cập nhật Voucher"
          : "Chi tiết Voucher"}
      </DialogTitle>

      <DialogContent dividers>
        {loading ? (
          <Grid container justifyContent="center" py={4}>
            <CircularProgress />
          </Grid>
        ) : (
          <>
            {error && (
              <Typography color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}

            {isView && (
              <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
                * Chế độ xem — không thể chỉnh sửa.
              </Typography>
            )}

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Tên voucher"
                  fullWidth
                  value={form.voucherName}
                  onChange={handleChange("voucherName")}
                  InputProps={{ readOnly }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Mô tả"
                  fullWidth
                  multiline
                  minRows={2}
                  value={form.description}
                  onChange={handleChange("description")}
                  InputProps={{ readOnly }}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  label="Số lượng"
                  type="number"
                  fullWidth
                  value={form.quantity}
                  onChange={handleChange("quantity")}
                  inputProps={{ min: 0, step: 1 }}
                  InputProps={{ readOnly }}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  label="Giảm giá (%)"
                  type="number"
                  fullWidth
                  value={form.discountPercentage}
                  onChange={handleChange("discountPercentage")}
                  inputProps={{ min: 0, max: 100, step: 1 }}
                  InputProps={{ readOnly }}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  label="Đã dùng"
                  type="number"
                  fullWidth
                  value={form.usedQuantity ?? 0}
                  disabled
                  inputProps={{ min: 0, step: 1 }}
                  sx={{ bgcolor: "#f9f9f9" }}
                  variant="outlined"
                />
              </Grid>
              {mode === "edit" && (
                <Grid item xs={5}>
                  <TextField
                    select
                    fullWidth
                    label="Trạng thái"
                    value={form.voucherStatus ?? VoucherStatus.Pending}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        voucherStatus: Number(e.target.value) as VoucherStatus, // <-- Đúng key
                      }))
                    }
                  >
                    {statusOptionsEdit.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              )}

              <Grid item xs={7}>
                <TextField
                  label="Ngày hết hạn"
                  type="datetime-local"
                  fullWidth
                  value={form.endDate}
                  onChange={handleChange("endDate")}
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  InputProps={{ readOnly }}
                  sx={{
                    "& .MuiInputBase-root": {
                      borderRadius: 2,
                      border: "1px solid #1976d2", // màu xanh dương
                    },
                    "& input": {
                      padding: "10px",
                    },
                    "&:hover .MuiInputBase-root": {
                      borderColor: "#1565c0",
                    },
                    "& .Mui-focused": {
                      borderColor: "#42a5f5",
                    },
                  }}
                />
              </Grid>
            </Grid>
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={saving}>
          Đóng
        </Button>
        {!isView && (
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={saving || loading}
          >
            {saving ? (
              <CircularProgress size={20} />
            ) : isCreate ? (
              "Tạo voucher"
            ) : (
              "Cập nhật"
            )}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default VoucherDetailDialog;
