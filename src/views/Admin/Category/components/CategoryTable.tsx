// import React, { useState, useEffect, useRef } from "react";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import categoryApi from "src/services/api/Category";
// import { ICategory } from "src/Interfaces/ICategory";
// import formatVietnamTime from "src/utils/formatVietnamTime";
// import CustomPagination from "src/components/CustomPagination";
// import DeleteIcon from "@mui/icons-material/Delete";
// import {
//   Box,
//   Button,
//   Checkbox,
//   MenuItem,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
// } from "@mui/material";
// import { useLocation, useNavigate } from "react-router-dom";
// import AttributeTable from "./AttributeTable";
// import GenericContextMenu from "src/components/GenericContextMenu";
// import { categoryContextMenuItems } from "../contextMenu";
// import UpdateCategoryModal from "./modal/UpdateCategory";
// import ModalConfirm from "src/components/ModalConfirm";
// import useToast from "src/components/Toast";
// import AddAttributeToCategory from "./modal/AddAttributeToCategory";

// interface BreadcrumbItem {
//   categoryId: number;
//   categoryName: string;
// }

// interface CategoryTableProps {
//   onTypeChange?: (type: string) => void;
//   onParentInfoChange?: (id: number, name: string) => void;
//   onBreadcrumbsChange?: (breadcrumbs: BreadcrumbItem[]) => void;
// }

// const CategoryTable = ({
//   onTypeChange,
//   onParentInfoChange,
//   onBreadcrumbsChange,
// }: CategoryTableProps) => {
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();
//   const location = useLocation();
//   const { showSuccess, showError } = useToast();

//   const [pageNumber, setPageNumber] = useState(1);
//   const [maxPages, setMaxPages] = useState<number>(1);
//   const [pageSize, setPageSize] = useState(10);

//   const pathWithoutQuery = location.pathname.split("?")[0];
//   const relativePath = pathWithoutQuery.replace(/^\/admin\/category\/?/, "");

//   const pathIds = relativePath.split("/").filter((id) => id.trim() !== "");

//   const isDetail = pathIds.length > 0;
//   const currentCategoryId = pathIds[pathIds.length - 1];
//   const [parentCategoryName, setParentCategoryName] = useState<string | null>(
//     null
//   );

//   const [selected, setSelected] = useState<number[]>([]);

//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
//     null
//   );

//   const [confirmMessage, setConfirmMessage] = useState<string[]>([]);
//   const [pendingDeleteIds, setPendingDeleteIds] = useState<number[]>([]);
//   const [confirmModalOpen, setConfirmModalOpen] = useState(false);
//   const [showConfirmButton, setShowConfirmButton] = useState(false);

//   const [openAddAttribute, setOpenAddAttribute] = useState(false);

//   const [anchorEl, setAnchorEl] = useState<
//     HTMLElement | { mouseX: number; mouseY: number } | null
//   >(null);
//   const handleSelect = (id: number) => {
//     setSelected((prev) =>
//       prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
//     );
//   };

//   const [contextItem, setContextItem] = useState<ICategory | null>(null);

//   const {
//     data: categories,
//     isLoading,
//     // error,
//   } = useQuery({
//     queryKey: ["categories", pageNumber, pageSize],
//     queryFn: async () => {
//       const response = await categoryApi.getPagingApi({ pageNumber, pageSize });

//       const realTotalPages = response.data.totalPages ?? 1;
//       setMaxPages(realTotalPages);

//       return response.data.items ?? [];
//     },
//     retry: false,
//     enabled: !isDetail && pageNumber > 0,
//     placeholderData: (previousData: any) => previousData,
//   });

//   const { data: categoryDetail } = useQuery({
//     queryKey: ["category", currentCategoryId, pageNumber, pageSize],
//     queryFn: () =>
//       categoryApi.getByIdApi({
//         categoryId: Number(currentCategoryId),
//         pageNumber: 1,
//         pageSize: 10,
//       }),
//     retry: false,
//     enabled: !!currentCategoryId && !isNaN(Number(currentCategoryId)),
//     staleTime: 5 * 60 * 1000,
//     select: (res) => {
//       const type = res.data?.type ?? "Unknown";
//       const items = res.data?.data?.items ?? [];
//       const totalItems = res.data?.data?.totalItems ?? 0;
//       const pageSize = res.data?.data?.pageSize ?? 10;
//       const currentCategory = res?.data?.currentCategory;
//       return { type, items, totalItems, pageSize, currentCategory };
//     },
//   });

//   const reloadCategoryDetail = () => {
//     queryClient.invalidateQueries({
//       queryKey: ["category", currentCategoryId, pageNumber, pageSize],
//     });
//   };

//   const lastBreadcrumbsRef = useRef<BreadcrumbItem[]>([]);

//   // useEffect để xử lý khi isDetail là false (không phụ thuộc vào categoryDetail)
//   useEffect(() => {
//     if (!isDetail) {
//       if (lastBreadcrumbsRef.current.length !== 0) {
//         onBreadcrumbsChange?.([]);
//         lastBreadcrumbsRef.current = [];
//       }
//     }
//   }, [isDetail, onBreadcrumbsChange]);

//   // useEffect để xử lý logic liên quan đến categoryDetail
//   useEffect(() => {
//     if (isDetail) {
//       // Xử lý type
//       if (categoryDetail?.type) {
//         onTypeChange?.(categoryDetail.type);
//       }

//       const current = categoryDetail?.currentCategory;
//       if (current?.categoryId && current?.categoryName) {
//         setParentCategoryName(current.categoryName);
//         onParentInfoChange?.(current.categoryId, current.categoryName);
//       }

//       const breadcrumbs = current?.breadcrumbs ?? [];
//       if (
//         breadcrumbs.length > 0 &&
//         JSON.stringify(breadcrumbs) !==
//           JSON.stringify(lastBreadcrumbsRef.current)
//       ) {
//         onBreadcrumbsChange?.(breadcrumbs);
//         lastBreadcrumbsRef.current = breadcrumbs;
//       }
//     }
//   }, [
//     isDetail,
//     categoryDetail,
//     onTypeChange,
//     onParentInfoChange,
//     onBreadcrumbsChange,
//   ]);

//   const categoryMenuActions = categoryContextMenuItems.map((item) => ({
//     ...item,
//     onClick: (category: ICategory) => {
//       switch (item.id) {
//         case "VIEW":
//           const nextPath = `/admin/category/${[
//             ...pathIds,
//             category.categoryId,
//           ].join("/")}`;
//           navigate(nextPath);
//           break;
//         case "EDIT":
//           console.log("Sửa mục:", category);
//           setSelectedCategory(category);
//           setEditModalOpen(true);
//           break;
//         case "LIST_PRODUCT":
//           console.log("Sửa mục:", category);
//           break;
//         case "DELETE":
//           handleDeleteSelected([category?.categoryId]);
//           break;
//         default:
//           console.log("Chọn menu:", item.id, category);
//       }
//     },
//   }));

//   const invalidateAllCategoryData = () => {
//     queryClient.invalidateQueries({
//       predicate: (query) =>
//         ["category", "categories"].includes(query.queryKey[0] as string),
//     });
//   };

//   const handleDeleteSelected = async (categoryIds: number[] = selected) => {
//     if (categoryIds.length === 0) return;

//     try {
//       const res = await categoryApi.checkCanDeleteManyCategories(categoryIds);

//       if (!res.data.canDeleteAll) {
//         setConfirmModalOpen(true);
//         const cannotDeleteCount = res.data.cannotDeleteCount;
//         setConfirmMessage([
//           `Có ${cannotDeleteCount} danh mục không thể xoá:`,
//           ...res.data.blockers.$values.map((b: any) => b.message),
//         ]);

//         setShowConfirmButton(false);
//         return;
//       }

//       if (res.data.canDeleteAll === true) {
//         setConfirmModalOpen(true);
//         setPendingDeleteIds(categoryIds);
//         setConfirmMessage([
//           "Sau khi xóa, liên kết giữa danh mục với sản phẩm và thuộc tính sẽ bị mất, bạn có xác nhận xóa",
//         ]);
//         setShowConfirmButton(true);
//       }
//     } catch (error) {
//       console.error("Error checking delete:", error);
//       showError("Xóa thất bại");
//     }
//   };

//   const handleConfirmDelete = async () => {
//     try {
//       const res = await categoryApi.deleteManyCategories(pendingDeleteIds);
//       console.log(pendingDeleteIds);
//       if (res.data.success) {
//         showSuccess("Xoá thành công!");
//         invalidateAllCategoryData();
//         setSelected([]);
//       } else {
//         showError("Xoá thất bại!");
//       }
//     } catch (error) {
//       console.error("Delete failed:", error);
//       showError("Lỗi khi xoá danh mục!");
//     } finally {
//       setConfirmModalOpen(false);
//       setPendingDeleteIds([]);
//     }
//   };

//   if (isDetail && categoryDetail?.type === "Attributes") {
//     return (
//       <AttributeTable
//         rows={categoryDetail.items}
//         categoryId={Number(currentCategoryId)}
//         pageNumber={pageNumber}
//         pageSize={pageSize}
//         setPageNumber={setPageNumber}
//         setPageSize={setPageSize}
//         maxPages={Math.ceil(categoryDetail.totalItems / pageSize)}
//         reload={reloadCategoryDetail}
//       />
//     );
//   }

//   const rows = isDetail ? categoryDetail?.items ?? [] : categories ?? [];

//   return (
//     <Box
//       sx={{
//         flexGrow: 1,
//         display: "flex",
//         flexDirection: "column",
//         backgroundColor: "#fff",
//         borderRadius: "8px",
//         boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
//         minHeight: "calc(100vh - 171px)",
//         overflow: "auto",
//         maxHeight: "calc(100vh - 198px)",
//       }}
//     >
//       <Box
//         sx={{
//           padding: "6px 6px",
//           borderBottom: "3px solid #ddd",
//           height: "33px",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}
//       >
//         <input
//           type="text"
//           placeholder="Tìm kiếm..."
//           style={{
//             width: "100%",
//             maxWidth: "220px",
//             height: "130%",
//             fontSize: "13px",
//             padding: "0px 8px",
//             borderRadius: "4px",
//             border: "2px solid #ccc",
//           }}
//         />

//         {categoryDetail?.type === "Empty" && (
//           <Button
//             variant="contained"
//             size="small"
//             sx={{
//               marginLeft: "12px",
//               textTransform: "none",
//               fontSize: "13px",
//               height: "24px",
//               minWidth: "unset",
//               padding: "0px 10px",
//               backgroundColor: "#ffa500",
//             }}
//             onClick={() => setOpenAddAttribute(true)}
//           >
//             + Thêm thuộc tính
//           </Button>
//         )}

//         <AddAttributeToCategory
//           open={openAddAttribute}
//           categoryId={Number(currentCategoryId)}
//           onClose={() => setOpenAddAttribute(false)}
//           onUpdated={reloadCategoryDetail}
//         />

//         {selected.length > 0 && (
//           <Button
//             variant="contained"
//             size="small"
//             startIcon={
//               <DeleteIcon
//                 sx={{ color: "white", fontSize: 16, marginRight: "-6px" }}
//               />
//             }
//             sx={{
//               marginLeft: "12px",
//               textTransform: "none",
//               fontSize: "13px",
//               height: "24px",
//               padding: "0px 8px",
//               backgroundColor: "red",
//               color: "white",
//               "&:hover": {
//                 backgroundColor: "#cc0000",
//               },
//             }}
//             onClick={() => handleDeleteSelected()}
//           >
//             Xoá ({selected.length})
//           </Button>
//         )}
//       </Box>

//       <TableContainer component={Paper} sx={{ overflowX: "auto", flexGrow: 1 }}>
//         <Table stickyHeader>
//           <TableHead>
//             <TableRow sx={{ height: 36 }}>
//               <TableCell
//                 sx={{
//                   height: "30px",
//                   lineHeight: "28px",
//                   padding: "4px 8px",
//                   width: "20px",
//                   borderRight: "1px solid rgb(240, 235, 235)",
//                   borderBlock: "1px solid rgb(240, 235, 235)",
//                 }}
//               >
//                 <Checkbox
//                   style={{ width: "20px", height: "20px" }}
//                   checked={selected.length === rows.length && rows.length > 0}
//                   indeterminate={
//                     selected.length > 0 && selected.length < rows.length
//                   }
//                   sx={{
//                     color: "#999",
//                     "&.Mui-checked": {
//                       color: "red",
//                     },
//                   }}
//                   onChange={() => {
//                     const isAllSelected = selected.length === rows.length;
//                     const isIndeterminate =
//                       selected.length > 0 && selected.length < rows.length;

//                     if (isAllSelected || isIndeterminate) {
//                       setSelected([]);
//                     } else {
//                       setSelected(rows.map((r: ICategory) => r.categoryId));
//                     }
//                   }}
//                 />
//               </TableCell>

//               <TableCell sx={Styles.tableCell}>Mã danh mục</TableCell>
//               <TableCell sx={Styles.tableCell}>Tên Danh Mục</TableCell>
//               <TableCell sx={Styles.tableCell}>Mô tả</TableCell>
//               <TableCell sx={Styles.tableCell}>Người tạo</TableCell>
//               <TableCell sx={Styles.tableCell}>Cập nhật</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {isLoading ? (
//               <TableRow>
//                 <TableCell colSpan={6} align="center">
//                   Đang tải dữ liệu...
//                 </TableCell>
//               </TableRow>
//             ) : rows.length > 0 ? (
//               rows.map((category: ICategory, index: number) => (
//                 <TableRow
//                   key={category.categoryId}
//                   hover
//                   sx={{ cursor: isDetail ? "default" : "pointer" }}
//                   onClick={() => {
//                     setPageNumber(1);
//                     setPageSize(10);
//                     const nextPath = `/admin/category/${[
//                       ...pathIds,
//                       category.categoryId,
//                     ].join("/")}`;
//                     navigate(nextPath);
//                   }}
//                   onContextMenu={(e) => {
//                     e.preventDefault();

//                     setContextItem(category);
//                     setSelectedCategory(category);
//                     setAnchorEl({ mouseX: e.clientX, mouseY: e.clientY });
//                   }}
//                 >
//                   <TableCell
//                     sx={{
//                       borderRight: "1px solid rgb(236, 234, 234)",
//                       lineHeight: "28px",
//                       padding: "4px 8px",
//                     }}
//                   >
//                     <Checkbox
//                       checked={selected.includes(category.categoryId)}
//                       onChange={() => handleSelect(category.categoryId)}
//                       onClick={(e) => e.stopPropagation()}
//                       sx={{
//                         color: "#999",
//                         "&.Mui-checked": {
//                           color: "red",
//                         },
//                       }}
//                       style={{ width: "14px", height: "14px" }}
//                     />
//                   </TableCell>

//                   <TableCell sx={Styles.tableCellBody}>
//                     {category.categoryId}
//                   </TableCell>
//                   <TableCell sx={Styles.tableCellBody}>
//                     {category.categoryName}
//                   </TableCell>
//                   <TableCell sx={Styles.tableCellBody}>
//                     {category.description || "Không có mô tả"}
//                   </TableCell>
//                   <TableCell sx={Styles.tableCellBody}>
//                     {category?.updaterName ||
//                       category?.creatorName ||
//                       "Không có dữ liệu"}
//                   </TableCell>
//                   <TableCell sx={Styles.tableCellBody}>
//                     {formatVietnamTime(category.updatedAt)}
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={6} sx={{ padding: "10px" }}>
//                   Danh sách trống!!
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Box
//         mt={0}
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         paddingBottom={0.5}
//         gap={2}
//       >
//         <CustomPagination
//           pageNumber={pageNumber}
//           setPageNumber={(newPage) => {
//             setPageNumber(newPage);
//             const newPath = `/admin/category/${pathIds.join(
//               "/"
//             )}?page=${newPage}`;
//             navigate(newPath);
//           }}
//           totalPages={maxPages}
//         />

//         <Box display="flex" alignItems="center" gap={1} maxHeight={25}>
//           <TextField
//             select
//             value={pageSize}
//             onChange={(e) => {
//               setPageSize(parseInt(e.target.value));
//               setPageNumber(1);
//             }}
//             size="small"
//             variant="standard"
//             sx={{
//               width: 80,
//               maxheight: "25px",
//             }}
//           >
//             {[1, 5, 10, 15, 20].map((option) => (
//               <MenuItem key={option} value={option}>
//                 {option}
//               </MenuItem>
//             ))}
//           </TextField>

//           <Box fontSize="12px" color="#555">
//             Bản ghi/trang
//           </Box>
//         </Box>
//       </Box>
//       <GenericContextMenu
//         anchorEl={anchorEl}
//         onClose={() => setAnchorEl(null)}
//         items={categoryMenuActions}
//         contextItem={contextItem}
//       />
//       <UpdateCategoryModal
//         open={editModalOpen}
//         parentCategoryName={parentCategoryName}
//         category={selectedCategory}
//         onClose={() => {
//           setEditModalOpen(false);
//           setSelectedCategory(null);
//         }}
//       />

//       <ModalConfirm
//         open={confirmModalOpen}
//         message={confirmMessage}
//         onClose={() => {
//           setConfirmModalOpen(false);
//           setPendingDeleteIds([]);
//           setSelected([]);
//           setSelectedCategory(null);
//         }}
//         onConfirm={handleConfirmDelete}
//         showConfirmButton={showConfirmButton}
//       />
//     </Box>
//   );
// };

// export default CategoryTable;

// const Styles = {
//   tableCell: {
//     fontWeight: "bold",
//     color: "black",
//     borderRight: "1px solid rgb(240, 235, 235)",
//     borderBlock: "1px solid rgb(240, 235, 235)",
//     height: "30px",
//     lineHeight: "28px",
//     padding: "4px 8px",
//   },
//   tableCellBody: {
//     borderRight: "1px solid rgb(236, 234, 234)",
//   },
// };
import React, { useState, useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  MenuItem
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import categoryApi from "src/services/api/Category";
import { ICategory } from "src/Interfaces/ICategory";
import formatVietnamTime from "src/utils/formatVietnamTime";
import useToast from "src/components/Toast";

import CustomPagination from "src/components/CustomPagination";
import GenericContextMenu from "src/components/GenericContextMenu";
import ModalConfirm from "src/components/ModalConfirm";

import AttributeTable from "./AttributeTable";
import UpdateCategoryModal from "./modal/UpdateCategory";
import AddAttributeToCategory from "./modal/AddAttributeToCategory";
import { categoryContextMenuItems } from "../contextMenu";
import DataTableContainer from "src/components/DataTableContainer";

interface BreadcrumbItem {
  categoryId: number;
  categoryName: string;
}

interface CategoryTableProps {
  onTypeChange?: (type: string) => void;
  onParentInfoChange?: (id: number, name: string) => void;
  onBreadcrumbsChange?: (breadcrumbs: BreadcrumbItem[]) => void;
}

const CategoryTable = ({
  onTypeChange,
  onParentInfoChange,
  onBreadcrumbsChange
}: CategoryTableProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useToast();

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [maxPages, setMaxPages] = useState(1);
  const [selected, setSelected] = useState<(string | number)[]>([]);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);
  const [confirmMessage, setConfirmMessage] = useState<string[]>([]);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [showConfirmButton, setShowConfirmButton] = useState(false);
  const [pendingDeleteIds, setPendingDeleteIds] = useState<number[]>([]);
  const [openAddAttribute, setOpenAddAttribute] = useState(false);
  const [parentCategoryName, setParentCategoryName] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | { mouseX: number; mouseY: number } | null>(null);
  const [contextItem, setContextItem] = useState<ICategory | null>(null);

  const pathWithoutQuery = location.pathname.split("?")[0];
  const relativePath = pathWithoutQuery.replace(/^\/admin\/category\/?/, "");
  const pathIds = relativePath.split("/").filter((id) => id.trim() !== "");
  const isDetail = pathIds.length > 0;
  const currentCategoryId = pathIds[pathIds.length - 1];

  const lastBreadcrumbsRef = useRef<BreadcrumbItem[]>([]);

  const {
    data: categories,
    isLoading
  } = useQuery({
    queryKey: ["categories", pageNumber, pageSize],
    queryFn: async () => {
      const res = await categoryApi.getPagingApi({ pageNumber, pageSize });
      setMaxPages(res.data.totalPages ?? 1);
      return res.data.items ?? [];
    },
    enabled: !isDetail && pageNumber > 0,
    retry: false,
    placeholderData: (prev) => prev
  });

  const { data: categoryDetail } = useQuery({
    queryKey: ["category", currentCategoryId, pageNumber, pageSize],
    queryFn: () =>
      categoryApi.getByIdApi({
        categoryId: Number(currentCategoryId),
        pageNumber: 1,
        pageSize: 10
      }),
    enabled: !!currentCategoryId && !isNaN(Number(currentCategoryId)),
    retry: false,
    select: (res) => {
      const { type, data, currentCategory } = res.data ?? {};
      return {
        type: type ?? "Unknown",
        items: data?.items ?? [],
        totalItems: data?.totalItems ?? 0,
        pageSize: data?.pageSize ?? 10,
        currentCategory
      };
    },
    staleTime: 5 * 60 * 1000
  });

  useEffect(() => {
    if (!isDetail && lastBreadcrumbsRef.current.length > 0) {
      onBreadcrumbsChange?.([]);
      lastBreadcrumbsRef.current = [];
    }
  }, [isDetail, onBreadcrumbsChange]);

  useEffect(() => {
    if (isDetail && categoryDetail) {
      onTypeChange?.(categoryDetail.type);
      const current = categoryDetail.currentCategory;
      if (current?.categoryId && current?.categoryName) {
        setParentCategoryName(current.categoryName);
        onParentInfoChange?.(current.categoryId, current.categoryName);
      }
      const breadcrumbs = current?.breadcrumbs ?? [];
      if (JSON.stringify(breadcrumbs) !== JSON.stringify(lastBreadcrumbsRef.current)) {
        onBreadcrumbsChange?.(breadcrumbs);
        lastBreadcrumbsRef.current = breadcrumbs;
      }
    }
  }, [isDetail, categoryDetail, onTypeChange, onParentInfoChange, onBreadcrumbsChange]);

  const invalidateAllCategoryData = () => {
    queryClient.invalidateQueries({
      predicate: (query) => ["category", "categories"].includes(query.queryKey[0] as string)
    });
  };

  const handleDeleteSelected = async (categoryIds?: number[]) => {
    if (!categoryIds || categoryIds.length === 0) return;
    try {
      const res = await categoryApi.checkCanDeleteManyCategories(categoryIds);
      if (!res.data.canDeleteAll) {
        setConfirmMessage([
          `Có ${res.data.cannotDeleteCount} danh mục không thể xoá:`,
          ...res.data.blockers.$values.map((b: any) => b.message)
        ]);
        setShowConfirmButton(false);
        setConfirmModalOpen(true);
        return;
      }
      setPendingDeleteIds(categoryIds);
      setConfirmMessage([
        "Sau khi xóa, liên kết giữa danh mục với sản phẩm và thuộc tính sẽ bị mất, bạn có xác nhận xóa"
      ]);
      setShowConfirmButton(true);
      setConfirmModalOpen(true);
    } catch (err) {
      showError("Xóa thất bại");
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await categoryApi.deleteManyCategories(pendingDeleteIds);
      if (res.data.success) {
        showSuccess("Xoá thành công!");
        invalidateAllCategoryData();
        setSelected([]);
      } else {
        showError("Xoá thất bại!");
      }
    } catch (err) {
      showError("Lỗi khi xoá danh mục!");
    } finally {
      setConfirmModalOpen(false);
      setPendingDeleteIds([]);
    }
  };

  const categoryMenuActions = categoryContextMenuItems.map((item) => ({
    ...item,
    onClick: (category: ICategory) => {
      switch (item.id) {
        case "VIEW":
          navigate(`/admin/category/${[...pathIds, category.categoryId].join("/")}`);
          break;
        case "EDIT":
          setSelectedCategory(category);
          setEditModalOpen(true);
          break;
        case "DELETE":
          handleDeleteSelected([category.categoryId]);
          break;
      }
    }
  }));

  const rows = isDetail ? categoryDetail?.items ?? [] : categories ?? [];

  if (isDetail && categoryDetail?.type === "Attributes") {
    return (
      <AttributeTable
        rows={categoryDetail.items}
        categoryId={Number(currentCategoryId)}
        pageNumber={pageNumber}
        pageSize={pageSize}
        setPageNumber={setPageNumber}
        setPageSize={setPageSize}
        maxPages={Math.ceil(categoryDetail.totalItems / pageSize)}
        reload={() => queryClient.invalidateQueries({ queryKey: ["category", currentCategoryId] })}
      />
    );
  }

  return (
    <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0px 2px 5px rgba(0,0,0,0.1)", minHeight: "calc(100vh - 171px)", overflow: "auto", maxHeight: "calc(100vh - 198px)" }}>
      <Box sx={{ padding: 1, borderBottom: "3px solid #ddd", height: 33, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <input type="text" placeholder="Tìm kiếm..." style={{ width: 220, height: "130%", fontSize: 13, padding: "0px 8px", borderRadius: 4, border: "2px solid #ccc" }} />

        {categoryDetail?.type === "Empty" && (
          <Button variant="contained" size="small" sx={{ ml: 1.5, fontSize: 13, height: 24, backgroundColor: "#ffa500" }} onClick={() => setOpenAddAttribute(true)}>
            + Thêm thuộc tính
          </Button>
        )}

        {selected.length > 0 && (
          <Button variant="contained" size="small" startIcon={<DeleteIcon sx={{ fontSize: 16 }} />} sx={{ ml: 1.5, fontSize: 13, height: 24, backgroundColor: "red", color: "white", '&:hover': { backgroundColor: "#cc0000" } }} onClick={() => handleDeleteSelected()}>
            Xoá ({selected.length})
          </Button>
        )}

        <AddAttributeToCategory open={openAddAttribute} categoryId={Number(currentCategoryId)} onClose={() => setOpenAddAttribute(false)} onUpdated={() => queryClient.invalidateQueries({ queryKey: ["category", currentCategoryId] })} />
      </Box>

      <DataTableContainer<ICategory>
        data={rows}
        selected={selected}
        setSelected={setSelected}
        columns={[]} // TODO: Replace with your columns
        isLoading={isLoading}
        error={false}
        sortBy=""
        toggleSort={() => {}}
        getRowId={(c) => c.categoryId}
        onRowClick={(category) => {
          setPageNumber(1);
          setPageSize(10);
          navigate(`/admin/category/${[...pathIds, category.categoryId].join("/")}`);
        }}
        onContextMenu={(e, category) => {
          e.preventDefault();
          setContextItem(category);
          setSelectedCategory(category);
          setAnchorEl({ mouseX: e.clientX, mouseY: e.clientY });
        }}
      />

      <Box mt={0} display="flex" justifyContent="center" alignItems="center" pb={0.5} gap={2}>
        <CustomPagination pageNumber={pageNumber} setPageNumber={(newPage) => {
          setPageNumber(newPage);
          navigate(`/admin/category/${pathIds.join("/")}?page=${newPage}`);
        }} totalPages={maxPages} />

        <Box display="flex" alignItems="center" gap={1} maxHeight={25}>
          <TextField select value={pageSize} onChange={(e) => {
            setPageSize(parseInt(e.target.value));
            setPageNumber(1);
          }} size="small" variant="standard" sx={{ width: 80 }}>
            {[1, 5, 10, 15, 20].map((opt) => (
              <MenuItem key={opt} value={opt}>{opt}</MenuItem>
            ))}
          </TextField>
          <Box fontSize="12px" color="#555">Bản ghi/trang</Box>
        </Box>
      </Box>

      <GenericContextMenu anchorEl={anchorEl} onClose={() => setAnchorEl(null)} items={categoryMenuActions} contextItem={contextItem} />
      <UpdateCategoryModal open={editModalOpen} parentCategoryName={parentCategoryName} category={selectedCategory} onClose={() => { setEditModalOpen(false); setSelectedCategory(null); }} />
      <ModalConfirm open={confirmModalOpen} message={confirmMessage} onClose={() => { setConfirmModalOpen(false); setPendingDeleteIds([]); setSelected([]); setSelectedCategory(null); }} onConfirm={handleConfirmDelete} showConfirmButton={showConfirmButton} />
    </Box>
  );
};

export default CategoryTable;
