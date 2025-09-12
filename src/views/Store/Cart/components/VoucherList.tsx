import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  TextField,
  MenuItem,
} from "@mui/material";
import { Voucher } from "src/Interfaces/IVoucher";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import VoucherApi from "src/services/api/Voucher";

dayjs.extend(utc);
dayjs.extend(timezone);

const VoucherPublicList = () => {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedVoucherId, setSelectedVoucherId] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await VoucherApi.getPublicVouchers();
      setVouchers(res.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (id: string) => {
    setSelectedVoucherId(id);
    const voucher = vouchers.find((v) => v.id === id);
    console.log("Voucher đã chọn:", voucher);
  };

  return (
    <Box mt={3}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Áp dụng Voucher
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <TextField
          select
          fullWidth
          size="small"
          value={selectedVoucherId}
          onChange={(e) => handleChange(e.target.value)}
          // displayEmpty
          placeholder="chọn voucher"
        >
          {vouchers.map((v) => (
            <MenuItem key={v.id} value={v.id}>
              {v.voucherName} - Giảm {v.discountPercentage}% (hết hạn sau:{" "}
              {dayjs.utc(v.endDate).tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY")}
              )
            </MenuItem>
          ))}
        </TextField>
      )}
    </Box>
  );
};

export default VoucherPublicList;
