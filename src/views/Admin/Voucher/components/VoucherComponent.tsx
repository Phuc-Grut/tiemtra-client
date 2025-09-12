import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Pagination,
  TextField,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Voucher } from "src/Interfaces/IVoucher";
import VoucherTable from "./VoucherTable";
import VoucherDialog from "./VoucherDialog";
import VoucherDetailDialog from "./VoucherDetailDialog";
import VoucherConfirmDialog from "./VoucherConfirmDialog";
import VoucherApi from "src/services/api/Voucher";

const VoucherComponent = () => {
  const [loading, setLoading] = useState(false);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [status, setStatus] = useState<number | undefined>(undefined);
  const [keyword, setKeyword] = useState("");

  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await VoucherApi.getPagingVoucher({
        pageNumber,
        pageSize,
        status,
        keyword,
      });
      setVouchers(res.data.items);
      setTotalPages(res.data.totalPages ?? 1);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [pageNumber, status, keyword]);

  const handleAdd = () => {
    setSelectedVoucher(null);
    setIsAddEditOpen(true);
  };

  const handleEdit = (voucher: Voucher) => {
    setSelectedVoucher(voucher);
    console.log("Voucher ID", voucher);
    setIsAddEditOpen(true);
  };

  const handleChangeStatus = async (voucher: Voucher) => {
    try {
      await VoucherApi.updateVoucherStatus(voucher.voucherId, 1); // chuyển sang Public
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDetail = (voucher: Voucher) => {
    setSelectedVoucher(voucher);
    setIsDetailOpen(true);
  };

  const handleDelete = (voucher: Voucher) => {
    setSelectedVoucher(voucher);
    setIsConfirmOpen(true);
  };

  return (
    <Box>
      {/* Bộ lọc */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="Tìm kiếm"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            setPageNumber(1);
          }}
          size="small"
        />
        <TextField
          select
          label="Trạng thái"
          value={status ?? ""}
          onChange={(e) => {
            const val = e.target.value;
            setStatus(val === "" ? undefined : Number(val));
            setPageNumber(1);
          }}
          size="small"
          sx={{ width: 150 }}
        >
          <MenuItem value="">Tất cả</MenuItem>
          <MenuItem value={1}>Hoạt động</MenuItem>
          <MenuItem value={0}>Ngừng</MenuItem>
        </TextField>

        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
          Thêm Voucher
        </Button>
      </Box>

      {/* Bảng */}
      {loading ? (
        <CircularProgress />
      ) : (
        <VoucherTable
          vouchers={vouchers}
          onEdit={handleEdit}
          onDetail={handleDetail}
          onDelete={handleDelete}
          onChangeStatus={handleChangeStatus}
        />
      )}

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination
          count={totalPages}
          page={pageNumber}
          onChange={(_, val) => setPageNumber(val)}
          color="primary"
        />
      </Box>

      {/* Dialog CRUD */}
      <VoucherDialog
        open={isAddEditOpen}
        onClose={() => setIsAddEditOpen(false)}
        voucher={selectedVoucher}
        refresh={fetchData}
      />

      <VoucherDetailDialog
        open={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        voucher={selectedVoucher}
      />

      <VoucherConfirmDialog
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        voucher={selectedVoucher}
        refresh={fetchData}
      />
    </Box>
  );
};

export default VoucherComponent;
