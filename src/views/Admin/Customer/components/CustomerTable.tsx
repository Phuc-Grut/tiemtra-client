import { Box, MenuItem, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import CustomPagination from "src/components/CustomPagination";
import DataTableContainer from "src/components/DataTableContainer";
import GenericContextMenu from "src/components/GenericContextMenu";
import { ICustomer, ICustomerFilter } from "src/Interfaces/ICustomer";
import { ColumnConfig } from "src/Interfaces/Table";
import customerApi from "src/services/api/Customer";
import { customerContextMenuItems } from "../customerContextMenuItems";

const CustomerTable = () => {
  const buildCleanFilter = (filter: ICustomerFilter) => {
    const cleaned: any = {
      pageNumber: filter.pageNumber ?? 1,
      pageSize: filter.pageSize ?? 10,
    };
    if (filter.customerCode?.trim())
      cleaned.customerCode = filter.customerCode.trim();
    if (filter.customerName?.trim())
      cleaned.customerName = filter.customerName.trim();
    if (filter.phoneNumber?.trim())
      cleaned.phoneNumber = filter.phoneNumber.trim();
    if (filter.sortBy?.trim()) cleaned.sortBy = filter.sortBy.trim();

    return cleaned;
  };

  const [filter, setFilter] = useState<ICustomerFilter>({
    pageNumber: 1,
    pageSize: 10,
    customerCode: "",
    customerName: "",
    customerId: "",
    phoneNumber: "",
    sortBy: "",
  });

  const [anchorEl, setAnchorEl] = useState<
    HTMLElement | { mouseX: number; mouseY: number } | null
  >(null);
  const [contextItem, setContextItem] = useState<ICustomer | null>(null);
  const [selected, setSelected] = useState<(string | number)[]>([]);

  const columns: ColumnConfig<ICustomer>[] = [
    {
      key: "image",
      label: "Ảnh",
      width: 150,
      render: (c: ICustomer) => (
        <div
          style={{
            width: "95%",
            height: 95,
            backgroundColor: "#f9f9f9",
            border: "1px solid #eee",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 3px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
          }}
        >
          <img
            src={c.avatar || ""}
            alt="Ảnh khách hàng"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            // onError={(e) => {
            //   e.currentTarget.src =
            //     "https://via.placeholder.com/80x80?text=No+Image";
            // }}
          />
        </div>
      ),
    },
    {
      key: "customerCode",
      label: "Mã khách hàng",
      width: 120,
    },
    { key: "customerName", label: "Tên khách hàng", width: 120 },
    { key: "phoneNumber", label: "Số điện thoại", width: 120 },
    { key: "address", label: "Địa chỉ", width: 150 },
    { key: "orderSuccessful", label: "Đơn thành công", width: 120 },
  ];

  const [maxPages, setMaxPages] = useState<number>(1);

  const {
    data: customers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["get-paging-orders", filter],
    queryFn: async () => {
      const cleanedFilter = buildCleanFilter(filter);
      const response = await customerApi.getPagingCustomer(cleanedFilter);
      const realTotalPages = response.data.totalPages;
      setMaxPages(realTotalPages);

      return response.data.items ?? [];
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  const customerMenuActions = customerContextMenuItems.map((item) => ({
    ...item,
    onClick: (c: ICustomer) => {
      switch (item.id) {
        case "VIEW_ORDER":
          //   setOrderDetailModal(true);
          //   setOrderId(o.orderId);
          break;

        default:
        // console.log("Chọn menu:", item.id, o);
      }
    },
  }));

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
      </Box>

      <DataTableContainer<ICustomer>
        data={customers}
        selected={selected}
        setSelected={setSelected}
        columns={columns}
        isLoading={isLoading}
        error={!!error}
        sortBy={filter.sortBy}
        // toggleSort={toggleSort}
        getRowId={(c) => c.customerId}
        onRowClick={(o) => {
          //   setModalOpen(true);
          //   setProductId(p.productId);
          //   setProductModalMode("view");
        }}
        onContextMenu={(e, o) => {
          setContextItem(o);
          setAnchorEl({ mouseX: e.clientX, mouseY: e.clientY });
        }}
      />

      <Box
        mt={0}
        display="flex"
        justifyContent="center"
        alignItems="center"
        paddingBottom={0.5}
        gap={2}
      >
        <CustomPagination
          pageNumber={filter.pageNumber}
          totalPages={maxPages}
          setPageNumber={(newPage) =>
            setFilter((prev) => ({ ...prev, pageNumber: newPage }))
          }
        />

        <Box display="flex" alignItems="center" gap={1} maxHeight={25}>
          <TextField
            select
            value={filter.pageSize}
            onChange={(e) => {
              const newSize = parseInt(e.target.value);
              setFilter((prev) => ({
                ...prev,
                pageSize: newSize,
                pageNumber: 1,
              }));
            }}
            size="small"
            variant="standard"
            sx={{
              width: 80,
              maxHeight: "25px",
            }}
          >
            {[1, 5, 10, 15, 20].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <Box fontSize="12px" color="#555">
            Bản ghi/trang
          </Box>
        </Box>
      </Box>

      <GenericContextMenu
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        items={customerMenuActions}
        contextItem={contextItem}
      />
    </Box>
  );
};

export default CustomerTable;
