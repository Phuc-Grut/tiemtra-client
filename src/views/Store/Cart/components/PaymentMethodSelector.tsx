import React from "react";
import { Box, Typography, Stack, IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { PaymentMethod } from "src/Interfaces/IOrder";

type Props = {
  value: PaymentMethod;
  onChange: (value: PaymentMethod) => void;
  totalPrice?: number;
  orderCode?: string;
};

const PaymentMethodSelector = ({
  value,
  onChange,
  totalPrice,
  orderCode, // Tạm mặc định
}: Props) => {

  const shippingFee = 30000;
  const total = (totalPrice || 0) + shippingFee;
  const qrUrl = `https://img.vietqr.io/image/970423-07347135501-compact.png?amount=${total}&addInfo=${orderCode}`;

  return (
    <Box mt={2} padding={1}>
      <Typography variant="subtitle1" fontWeight="bold" mb={1}>
        Hình thức thanh toán
      </Typography>

      <Stack direction="column" spacing={1}>
        <Box
          display="flex"
          alignItems="center"
          sx={{ cursor: "pointer" }}
          onClick={() => onChange(PaymentMethod.COD)}
        >
          <IconButton disableRipple sx={{ p: 0, pr: 1 }}>
            {value === PaymentMethod.COD ? (
              <CheckCircleIcon color="success" fontSize="small" />
            ) : (
              <RadioButtonUncheckedIcon color="disabled" fontSize="small" />
            )}
          </IconButton>
          <Typography
            color={
              value === PaymentMethod.COD ? "text.primary" : "text.secondary"
            }
          >
            Thanh toán khi nhận hàng (COD)
          </Typography>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          sx={{ cursor: "pointer" }}
          onClick={() => onChange(PaymentMethod.BankTransfer)}
        >
          <IconButton disableRipple sx={{ p: 0, pr: 1 }}>
            {value === PaymentMethod.BankTransfer ? (
              <CheckCircleIcon color="success" fontSize="small" />
            ) : (
              <RadioButtonUncheckedIcon color="disabled" fontSize="small" />
            )}
          </IconButton>
          <Typography
            color={
              value === PaymentMethod.BankTransfer
                ? "text.primary"
                : "text.secondary"
            }
          >
            Chuyển khoản ngân hàng
          </Typography>
        </Box>
      </Stack>

      {/* Thông tin chuyển khoản nếu chọn BankTransfer */}
      {value === PaymentMethod.BankTransfer && totalPrice && (
        <Box mt={2} p={2} border="1px solid #ccc" borderRadius={2}>
          <Typography fontWeight="bold" mb={1}>
            Thông tin chuyển khoản
          </Typography>
          <Typography>
            Ngân hàng: <strong>TP Bank</strong>
          </Typography>
          <Typography>
            Số tài khoản: <strong>07347135501</strong>
          </Typography>
          <Typography>
            Chủ tài khoản: <strong>NGO HONG PHUC</strong>
          </Typography>
          <Typography>
            💰 Số tiền: <strong>{total.toLocaleString()}đ</strong>
          </Typography>
          <Typography>
            📝 Nội dung: <strong>{orderCode}</strong>
          </Typography>

          <Box mt={2}>
            <Typography fontWeight="bold" mb={1}>
              Quét mã để chuyển khoản:
            </Typography>
            <img
              src={qrUrl}
              alt="QR chuyển khoản"
              style={{ width: "100%", maxWidth: 300 }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default PaymentMethodSelector;
