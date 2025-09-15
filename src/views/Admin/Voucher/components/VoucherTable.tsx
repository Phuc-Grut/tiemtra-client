import { useState } from "react";
import { IVoucher, IVoucherFilter } from "src/Interfaces/IVoucher";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useToast from "src/components/Toast";
import voucherApi from "src/services/api/Voucher";
import { Box, FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { ColumnConfig } from "src/Interfaces/Table";

const VoucherTable = () => {
  const buildCleanFilter = (filter: IVoucherFilter) => {
    const cleaned: any = {
      pageNumber: filter.pageNumber ?? 1,
      pageSize: filter.pageSize ?? 10,
    };
    if (filter.keyword?.trim()) cleaned.orderCode = filter.keyword.trim();

    if (filter.status !== undefined) {
      cleaned.status = filter.status;
    }

    return cleaned;
  };

  const [anchorEl, setAnchorEl] = useState<
    HTMLElement | { mouseX: number; mouseY: number } | null
  >(null);

  const queryClient = useQueryClient();
  const { showSuccess, showError } = useToast();
  const [maxPages, setMaxPages] = useState<number>(1);

  const [filter, setFilter] = useState<IVoucherFilter>({
    pageNumber: 1,
    pageSize: 10,
    status: undefined,
  });

  const {
    data: vouchers,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["get-paging-orders", filter],
    queryFn: async () => {
      const cleanedFilter = buildCleanFilter(filter);
      const response = await voucherApi.getPagingVoucher(cleanedFilter);
      const realTotalPages = response.data.totalPages;
      setMaxPages(realTotalPages);

      return response.data.items ?? [];
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
  console.log("🚀 ~ VoucherTable ~ vouchers:", vouchers);

  const colums: ColumnConfig<IVoucher>[] = [
    {
      key: "voucherCode",
      label: "Mã Voucher",
      width: 120,
    },
    {
      key: "voucherName",
      label: "Tên Voucher",
      width: 120,
    },
    {
      key: "Quantity",
      label: "Số lượng",
      width: 120,
    },
  ];

  const handleVoucherStatusChange = (e: SelectChangeEvent) => {
    const value = e.target.value;
    setFilter((prev) => ({
      ...prev,
      orderStatus: value === "" ? undefined : parseInt(value),
      pageNumber: 1,
    }));
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        minHeight: "calc(100vh - 171px)",
        overflow: "auto",
        maxHeight: "calc(100vh - 198px)",
      }}
    >
      <Box
        sx={{
          padding: "6px",
          borderBottom: "3px solid #ddd",
          height: "33px",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <input
          type="text"
          placeholder="Tìm kiếm..."
          style={{
            width: "100%",
            maxWidth: "200px",
            height: "130%",
            fontSize: "13px",
            padding: "0px 8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        <FormControl
          size="small"
          sx={{
            width: "180px",
            height: "130%",
            overflow: "hidden",
          }}
        >
          <Select
            value={filter.status !== undefined ? String(filter.status) : ""}
            onChange={handleVoucherStatusChange}
            displayEmpty
            sx={{
              height: "24px",
              fontSize: "14px",
              padding: "0px 8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              backgroundColor: "white",
              boxSizing: "border-box",
              "& fieldset": {
                border: "none",
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  fontSize: "14px",
                  maxHeight: "50vh",
                  overflowY: "auto",
                },
              },
            }}
          >
            <MenuItem value="">Trạng thái</MenuItem>
            <MenuItem value={0}>Chờ xác nhận</MenuItem>
            <MenuItem value={1}>Đã xác nhận</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default VoucherTable;
