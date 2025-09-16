import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  TextField,
  MenuItem,
  Button,
  Alert,
} from "@mui/material";
import { Voucher } from "src/Interfaces/IVoucher";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import VoucherApi from "src/services/api/Voucher";
import useToast from "src/components/Toast";

dayjs.extend(utc);
dayjs.extend(timezone);

interface VoucherListProps {
  orderTotal: number;
  onVoucherApplied: (discountAmount: number, finalAmount: number, voucherCode: string) => void; // Thêm voucherCode parameter
  onVoucherRemoved: () => void;
}

const VoucherList = ({ orderTotal, onVoucherApplied, onVoucherRemoved }: VoucherListProps) => {
  const { showError, showSuccess } = useToast();
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(false);
  const [applying, setApplying] = useState(false);
  const [selectedVoucherId, setSelectedVoucherId] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState<{
    voucherCode: string;
    discountAmount: number;
    finalAmount: number;
  } | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await VoucherApi.getPublicVouchers();
      setVouchers(res.data);
      console.log("=== FETCHED VOUCHERS ===");
      console.log("Vouchers:", res.data);
      console.log("Voucher IDs:", res.data.map(v => v.voucherId)); // Sửa từ v.id thành v.voucherId
    } catch (error) {
      console.error("Error fetching vouchers:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleApplyVoucher = async (voucherId: string) => {
    if (!voucherId) {
      console.log("No voucher ID provided");
      return;
    }

    const selectedVoucher = vouchers.find((v) => v.voucherId === voucherId); // Sửa từ v.id thành v.voucherId
    if (!selectedVoucher) {
      console.log("Voucher not found for ID:", voucherId);
      showError("Voucher không hợp lệ");
      return;
    }

    setApplying(true);
    try {
      console.log("=== APPLYING VOUCHER ===");
      console.log("Voucher code:", selectedVoucher.voucherCode);
      console.log("Order total:", orderTotal);
      
      const res = await VoucherApi.applyVoucher({
        voucherCode: selectedVoucher.voucherCode,
        orderTotal: orderTotal,
      });

      console.log("=== VOUCHER RESPONSE ===");
      console.log("Response:", res.data);

      if (res.data.isValid) {
        console.log("=== VOUCHER APPLIED SUCCESSFULLY ===");
        setAppliedVoucher({
          voucherCode: selectedVoucher.voucherCode,
          discountAmount: res.data.discountAmount,
          finalAmount: res.data.finalAmount,
        });
        onVoucherApplied(res.data.discountAmount, res.data.finalAmount, selectedVoucher.voucherCode); // Truyền voucherCode
        showSuccess(res.data.message);
      } else {
        console.log("=== VOUCHER INVALID ===");
        showError(res.data.message);
        setSelectedVoucherId(""); // Reset selection if invalid
      }
    } catch (error: any) {
      console.log("=== VOUCHER ERROR ===");
      console.error("Voucher apply error:", error);
      showError(error.response?.data?.message || "Có lỗi xảy ra khi áp dụng voucher");
      setSelectedVoucherId(""); // Reset selection on error
    } finally {
      setApplying(false);
    }
  };

  const handleVoucherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const voucherId = event.target.value;
    console.log("=== VOUCHER CHANGE EVENT ===");
    console.log("Event type:", event.type);
    console.log("Event target:", event.target);
    console.log("Event target value:", event.target.value);
    console.log("Voucher ID:", voucherId);
    console.log("Type of voucher ID:", typeof voucherId);
    
    setSelectedVoucherId(voucherId);
    
    if (voucherId && voucherId !== "") {
      console.log("Applying voucher with ID:", voucherId);
      handleApplyVoucher(voucherId);
    } else {
      console.log("Removing voucher (empty selection)");
      handleRemoveVoucher();
    }
  };

  const handleRemoveVoucher = () => {
    console.log("=== REMOVING VOUCHER ===");
    setAppliedVoucher(null);
    setSelectedVoucherId("");
    onVoucherRemoved();
    showSuccess("Đã xóa voucher");
  };

  console.log("=== VOUCHER STATE ===");
  console.log("Selected voucher ID:", selectedVoucherId);
  console.log("Applied voucher:", appliedVoucher);
  console.log("Applying:", applying);
  console.log("Available vouchers:", vouchers.length);

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
          {loading ? (
            <CircularProgress />
          ) : (
            <TextField
              select
              fullWidth
              size="small"
              value={selectedVoucherId}
              onChange={handleVoucherChange}
              placeholder="Chọn voucher"
              disabled={applying}
            >
              <MenuItem value="">
                <em>Chọn voucher</em>
              </MenuItem>
              {vouchers.map((v) => {
                console.log("Rendering voucher:", v.voucherId, v.voucherName); // Sửa từ v.id thành v.voucherId
                return (
                  <MenuItem key={v.voucherId} value={v.voucherId}> {/* Sửa từ v.id thành v.voucherId */}
                    {v.voucherName} - Giảm {v.discountPercentage}% (hết hạn:{" "}
                    {dayjs.utc(v.endDate).tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY")}
                    )
                  </MenuItem>
                );
              })}
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