import***REMOVED***{***REMOVED***IContextMenu***REMOVED***}***REMOVED***from***REMOVED***"src/Interfaces/IContextMenu";
import***REMOVED***VisibilityIcon***REMOVED***from***REMOVED***"@mui/icons-material/Visibility";
import***REMOVED***EditIcon***REMOVED***from***REMOVED***'@mui/icons-material/Edit';
import***REMOVED***DeleteIcon***REMOVED***from***REMOVED***'@mui/icons-material/Delete';
import***REMOVED***ListIcon***REMOVED***from***REMOVED***'@mui/icons-material/List';


export***REMOVED***const***REMOVED***ContextMenuItems:***REMOVED***IContextMenu[]***REMOVED***=***REMOVED***[
***REMOVED******REMOVED***{***REMOVED***id:***REMOVED***"VIEW",***REMOVED***label:***REMOVED***"Xem***REMOVED***chi***REMOVED***tiết",***REMOVED***icon:***REMOVED***<VisibilityIcon***REMOVED***fontSize="small"***REMOVED***/>,***REMOVED***onClick:***REMOVED***(item)***REMOVED***=>***REMOVED***console.log("Xem***REMOVED***chi***REMOVED***tiết",***REMOVED***item),***REMOVED***},
***REMOVED******REMOVED***{***REMOVED***id:***REMOVED***"EDIT",***REMOVED***label:***REMOVED***"Sửa***REMOVED***khoản***REMOVED***mục",***REMOVED***icon:***REMOVED***<EditIcon***REMOVED***fontSize="small"***REMOVED***/>,***REMOVED***onClick:***REMOVED***(item)***REMOVED***=>***REMOVED***console.log("Xem***REMOVED***chi***REMOVED***tiết",***REMOVED***item),***REMOVED***},
***REMOVED******REMOVED***{***REMOVED***id:***REMOVED***"DELETE",***REMOVED***label:***REMOVED***"Xóa***REMOVED***khoản***REMOVED***mục",***REMOVED***icon:***REMOVED***<DeleteIcon***REMOVED***fontSize="small"***REMOVED***/>,***REMOVED***onClick:***REMOVED***(item)***REMOVED***=>***REMOVED***console.log("Xem***REMOVED***chi***REMOVED***tiết",***REMOVED***item),***REMOVED***},
***REMOVED******REMOVED***{***REMOVED***id:***REMOVED***"LIST_PRODUCT",***REMOVED***label:***REMOVED***"Danh***REMOVED***sách***REMOVED***sản***REMOVED***phẩm",***REMOVED***icon:***REMOVED***<ListIcon***REMOVED***fontSize="small"***REMOVED***/>,***REMOVED***onClick:***REMOVED***(item)***REMOVED***=>***REMOVED***console.log("Xem***REMOVED***chi***REMOVED***tiết",***REMOVED***item),***REMOVED***},
];
