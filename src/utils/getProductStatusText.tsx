import { ProductStatus } from "src/Interfaces/IProduct";

import { Chip } from "@mui/material";

export const getProductStatusText = (status: number) => {
  switch (status) {
    case ProductStatus.Draft:
      return (
        <Chip
          label="Nháp"
          size="small"
          sx={{
            backgroundColor: "#e0e0e0", // xám nhạt
            color: "#555",
            fontWeight: "bold",
          }}
        />
      );
    case ProductStatus.Active:
      return (
        <Chip
          label="Đang bán"
          size="small"
          sx={{
            backgroundColor: "#4caf50", // xanh lá
            color: "#fff",
            fontWeight: "bold",
          }}
        />
      );
    case ProductStatus.Inactive:
      return (
        <Chip
          label="Ngừng bán"
          size="small"
          sx={{
            backgroundColor: "#ff9800", // cam
            color: "#fff",
            fontWeight: "bold",
          }}
        />
      );
    case ProductStatus.OutOfStock:
      return (
        <Chip
          label="Hết hàng"
          size="small"
          sx={{
            backgroundColor: "#f44336",
            color: "#fff",
            fontWeight: "bold",
          }}
        />
      );
    
    default:
      return (
        <Chip
          label="Không xác định"
          size="small"
          sx={{
            backgroundColor: "#9e9e9e", // xám
            color: "#fff",
            fontWeight: "bold",
          }}
        />
      );
  }
};

export default getProductStatusText;
