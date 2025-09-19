import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  TextField,
  MenuItem,
  Button,
  Alert,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import VoucherApi from "src/services/api/Voucher";
import useToast from "src/components/Toast";
import { Voucher } from "src/Interfaces/IVoucher";

dayjs.extend(utc);
dayjs.extend(timezone);

interface VoucherListProps {
  orderTotal: number;
  onVoucherApplied: (
    discountAmount: number,
    finalAmount: number,
    voucherCode: string
  ) => void;
  onVoucherRemoved: () => void;
}

interface ApplyVoucherResponse {
  isValid: boolean;
  discountAmount: number;
  finalAmount: number;
  message: string;
}

const VoucherList = ({
  orderTotal,
  onVoucherApplied,
  onVoucherRemoved,
}: VoucherListProps) => {
  const { showError, showSuccess } = useToast();
  const qc = useQueryClient();

  const [selectedVoucherId, setSelectedVoucherId] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState<{
    voucherCode: string;
    discountAmount: number;
    finalAmount: number;
  } | null>(null);

  // 1) Lấy danh sách public vouchers
  const {
    data: vouchers = [],
    isLoading: loadingVouchers,
    isError: loadVouchersError,
  } = useQuery<Voucher[]>({
    queryKey: ["public-vouchers"],
    queryFn: async () => {
      const res = await VoucherApi.getPublicVouchers();
      return res.data as Voucher[];
    },
  });

  const selectedVoucher = useMemo(
    () => vouchers.find((v) => v.voucherId === selectedVoucherId) ?? null,
    [vouchers, selectedVoucherId]
  );

  const {
    data: voucherResult,
    isFetching: applying,
    isError: applyError,
    error: applyErr,
  } = useQuery<ApplyVoucherResponse>({
    queryKey: ["voucher-apply", selectedVoucher?.voucherCode, orderTotal],
    queryFn: async () => {
      const res = await VoucherApi.applyVoucher({
        voucherCode: selectedVoucher!.voucherCode,
        orderTotal,
      });
      return res.data as ApplyVoucherResponse;
    },
    enabled: !!selectedVoucher?.voucherCode && orderTotal > 0,
    retry: 1,
  });

  useEffect(() => {
    if (!voucherResult) return;
    if (voucherResult.isValid && selectedVoucher?.voucherCode) {
      setAppliedVoucher({
        voucherCode: selectedVoucher.voucherCode,
        discountAmount: voucherResult.discountAmount,
        finalAmount: voucherResult.finalAmount,
      });
      onVoucherApplied(
        voucherResult.discountAmount,
        voucherResult.finalAmount,
        selectedVoucher.voucherCode
      );
      showSuccess(voucherResult.message);
    } else if (!voucherResult.isValid) {
      showError(voucherResult.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voucherResult, selectedVoucher?.voucherCode]);

  // 4) Xử lý lỗi apply
  useEffect(() => {
    if (applyError) {
      const err = applyErr as any;
      showError(
        err?.response?.data?.message || "Có lỗi xảy ra khi áp dụng voucher"
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applyError, applyErr]);

  // 5) Chọn / bỏ chọn voucher
  const handleVoucherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const voucherId = e.target.value as string;
    setSelectedVoucherId(voucherId);
    if (!voucherId) handleRemoveVoucher();
  };

  const handleRemoveVoucher = () => {
    setAppliedVoucher(null);
    setSelectedVoucherId("");
    onVoucherRemoved();
    // dọn cache apply để sạch sẽ
    qc.removeQueries({ queryKey: ["voucher-apply"] });
    showSuccess("Đã xóa voucher");
  };

  // UI
  return (
    <Box mt={3}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Áp dụng Voucher
      </Typography>

      {appliedVoucher ? (
        <Box>
          <Alert severity="success" sx={{ mb: 2 }}>
            <Typography variant="body2">
              Voucher {appliedVoucher.voucherCode} đã được áp dụng
            </Typography>
            <Typography variant="body2">
              Giảm: {appliedVoucher.discountAmount.toLocaleString()}₫
            </Typography>
            <Typography variant="body2">
              Tổng tiền sau giảm: {appliedVoucher.finalAmount.toLocaleString()}₫
            </Typography>
          </Alert>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={handleRemoveVoucher}
            fullWidth
          >
            Xóa Voucher
          </Button>
        </Box>
      ) : (
        <Box>
          {loadingVouchers ? (
            <CircularProgress />
          ) : loadVouchersError ? (
            <Alert severity="error">Không tải được danh sách voucher</Alert>
          ) : (
            <TextField
              select
              fullWidth
              size="small"
              value={selectedVoucherId}
              onChange={handleVoucherChange} // OK
              placeholder="Chọn voucher"
              disabled={applying}
            >
              <MenuItem value="">
                <em>Chọn voucher</em>
              </MenuItem>
              {vouchers.map((v) => (
                <MenuItem key={v.voucherId} value={v.voucherId}>
                  {v.voucherName} - Giảm {v.discountPercentage}% (hết hạn:{" "}
                  {dayjs
                    .utc(v.endDate)
                    .tz("Asia/Ho_Chi_Minh")
                    .format("DD/MM/YYYY")}
                  )
                </MenuItem>
              ))}
            </TextField>
          )}

          {applying && (
            <Box display="flex" justifyContent="center" mt={2}>
              <CircularProgress size={20} />
              <Typography variant="body2" ml={1}>
                Đang áp dụng voucher...
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default VoucherList;
