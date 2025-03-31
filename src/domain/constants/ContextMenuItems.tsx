import { IContextMenu } from "src/Interfaces/IContextMenu";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ListIcon from '@mui/icons-material/List';


export const ContextMenuItems: IContextMenu[] = [
  { id: "VIEW", label: "Xem chi tiết", icon: <VisibilityIcon fontSize="small" />, onClick: (item) => console.log("Xem chi tiết", item), },
  { id: "EDIT", label: "Sửa khoản mục", icon: <EditIcon fontSize="small" />, onClick: (item) => console.log("Xem chi tiết", item), },
  { id: "DELETE", label: "Xóa khoản mục", icon: <DeleteIcon fontSize="small" />, onClick: (item) => console.log("Xem chi tiết", item), },
  { id: "LIST_PRODUCT", label: "Danh sách sản phẩm", icon: <ListIcon fontSize="small" />, onClick: (item) => console.log("Xem chi tiết", item), },
];
