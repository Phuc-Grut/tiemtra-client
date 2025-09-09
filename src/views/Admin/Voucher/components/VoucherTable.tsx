import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  Chip,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { Voucher } from "src/Interfaces/IVoucher";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

interface Props {
  vouchers: Voucher[];
  onEdit: (v: Voucher) => void;
  onDetail: (v: Voucher) => void;
  onDelete: (v: Voucher) => void;
  onChangeStatus: (v: Voucher) => void;
}

dayjs.extend(utc);
dayjs.extend(timezone);

const VoucherTable = ({
  vouchers,
  onEdit,
  onDetail,
  onDelete,
  onChangeStatus,
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    voucher: Voucher
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedVoucher(voucher);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedVoucher(null);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Mã</TableCell>
            <TableCell>Tên</TableCell>
            <TableCell>Giảm giá</TableCell>
            <TableCell>Ngày hết hạn</TableCell>
            <TableCell>Trạng thái</TableCell>
            <TableCell>Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vouchers.map((v) => (
            <TableRow key={v.id}>
              <TableCell>{v.voucherCode}</TableCell>
              <TableCell>{v.voucherName}</TableCell>
              <TableCell>{v.discountPercentage}%</TableCell>
              <TableCell>
                {dayjs
                  .utc(v.endDate)
                  .tz("Asia/Ho_Chi_Minh")
                  .format("YYYY-MM-DD HH:mm:ss")}
              </TableCell>
              <TableCell>
                {v.status === 1 ? (
                  <Chip label="Public" color="success" size="small" />
                ) : (
                  <Chip label="Pending" color="warning" size="small" />
                )}
              </TableCell>
              <TableCell>
                <IconButton onClick={(e) => handleMenuOpen(e, v)}>
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Dropdown menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            if (selectedVoucher) onDetail(selectedVoucher);
            handleMenuClose();
          }}
        >
          Xem chi tiết
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (selectedVoucher) onEdit(selectedVoucher);
            handleMenuClose();
          }}
        >
          Chỉnh sửa
        </MenuItem>

        {/* Chưa có Xóa voucher được */}
        <MenuItem
          onClick={() => {
            if (selectedVoucher) onDelete(selectedVoucher);
            handleMenuClose();
          }}
          sx={{ color: "error.main" }}
        >
          Xóa
        </MenuItem>

        
        {selectedVoucher?.status === 0 && (
          <MenuItem
            onClick={() => {
              if (selectedVoucher) onChangeStatus(selectedVoucher);
              handleMenuClose();
            }}
            sx={{ color: "success.main" }}
          >
            Mở voucher
          </MenuItem>
        )}
      </Menu>
    </TableContainer>
  );
};

export default VoucherTable;
