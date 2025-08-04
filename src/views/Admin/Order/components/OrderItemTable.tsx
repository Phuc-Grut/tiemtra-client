import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Avatar,
} from "@mui/material";
import { IOrderItem } from "src/Interfaces/IOrder";

const OrderItemTable = ({ items }: { items: IOrderItem[] }) => {

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Sản phẩm</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Ảnh</TableCell>
            <TableCell>Tên sản phẩm</TableCell>
            <TableCell>Biến thể</TableCell>
            <TableCell>Số lượng</TableCell>
            <TableCell>Đơn giá</TableCell>
            <TableCell>Tổng</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell>
                <Avatar
                  src={item.previewImageUrl}
                  alt={item.productName}
                  variant="square"
                  sx={{ width: 48, height: 48 }}
                />
              </TableCell>
              <TableCell>{item.productName}</TableCell>
              <TableCell>{item.variationName}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.unitPrice.toLocaleString()}đ</TableCell>
              <TableCell>{item.totalPrice.toLocaleString()}đ</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default OrderItemTable;
