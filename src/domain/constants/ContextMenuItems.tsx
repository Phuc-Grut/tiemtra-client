import { IContextMenu } from "src/Interfaces/IContextMenu";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ListIcon from "@mui/icons-material/List";
import { red } from "@mui/material/colors";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; 
import MoveDownIcon from '@mui/icons-material/MoveDown';

export const ContextMenuItems: IContextMenu[] = [
  {
    id: "VIEW",
    label: "Xem chi tiết",
    icon: <VisibilityIcon fontSize="small" />,
  },
  {
    id: "EDIT",
    label: "Sửa khoản mục",
    icon: <EditIcon fontSize="small" />,
    // onClick: (item) => console.log("Xem chi tiết", item),
  },
  {
    id: "DELETE",
    label: "Xóa khoản mục",
    icon: <DeleteIcon fontSize="small" sx={{ color: red[500] }} />,
    // onClick: (item) => console.log("Xem chi tiết", item),
  },
  {
    id: "LIST_PRODUCT",
    label: "Danh sách sản phẩm",
    icon: <ListIcon fontSize="small" />,
    // onClick: (item) => console.log("Xem chi tiết", item),
  },

  {
    id: "CONFIRM_ORDER",
    label: "Xác nhận đơn hàng",
    icon: <CheckCircleIcon fontSize="small" color="success" />,
    // onClick: (item) => console.log("Xác nhận đơn hàng", item),
  },

  {
    id: "CHANGE_ORDER_STATUS",
    label: "Chuyển trạng thái đơn",
    icon: <MoveDownIcon fontSize="small" />,
    // onClick: (item) => console.log("Xác nhận đơn hàng", item),
  },

  {
    id: "VIEW_ORDER",
    label: "DS Đơn Hàng",
    icon: <VisibilityIcon fontSize="small" />,
    // onClick: (item) => console.log("Xác nhận đơn hàng", item),
  },
];
