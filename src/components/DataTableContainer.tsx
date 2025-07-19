import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer as MuiTableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useSidebar } from "./Layouts/SidebarContext";

interface ColumnConfig<T> {
  key: string;
  label: string;
  width?: number;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
  align?: "left" | "center" | "right";
}

interface TableContainerProps<T> {
  data: T[];
  selected: (string | number)[];
  setSelected: (ids: (string | number)[]) => void;
  columns: ColumnConfig<T>[];
  isLoading?: boolean;
  error?: boolean;
  sortBy?: string;
  toggleSort?: (field: string) => void;
  onRowClick?: (item: T) => void;
  onContextMenu?: (e: React.MouseEvent, item: T) => void;
  getRowId: (item: T) => string | number;
}

const DataTableContainer = <T,>({
  data,
  selected,
  setSelected,
  columns,
  isLoading,
  error,
  sortBy,
  toggleSort,
  onRowClick,
  onContextMenu,
  getRowId,
}: TableContainerProps<T>) => {
  const allSelected = selected.length > 0 && selected.length === data.length;
  const indeterminate = selected.length > 0 && selected.length < data.length;
  const { expanded } = useSidebar();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // <600px
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md")); // 600px - 900px
  // const isDesktop = useMediaQuery(theme.breakpoints.up("md")); // >=
  const sidebarWidth = isSmallScreen || isTablet ? 0 : expanded ? 260 : 100;

  const totalMinWidth = columns.reduce((sum, col) => sum + (col.width || 0), 0);

  return (
    <MuiTableContainer
      component={Paper}
      sx={{
        overflowX: "auto",
        flexGrow: 1,
        maxWidth: `calc(100vw - ${sidebarWidth}px)`,
      }}
    >
      <Table stickyHeader sx={{ minWidth: totalMinWidth }}>
        <TableHead>
          <TableRow sx={{ height: 36 }}>
            <TableCell
              sx={{
                height: "10px",
                lineHeight: "28px",
                padding: "4px 8px",
                width: "20px",
                borderRight: "1px solid rgb(240, 235, 235)",
                borderBlock: "1px solid rgb(240, 235, 235)",
              }}
            >
              <Checkbox
                style={{ width: "20px", height: "20px" }}
                checked={allSelected}
                indeterminate={indeterminate}
                sx={{ color: "#999", "&.Mui-checked": { color: "red" } }}
                onChange={() => {
                  if (data.length === 0) return;
                  setSelected(allSelected ? [] : data.map(getRowId));
                }}
              />
            </TableCell>
            {columns.map((col) => (
              <TableCell
                key={col.key}
                sx={{
                  ...Styles.tableCell,
                  width: col.width,
                  cursor: col.sortable ? "pointer" : "default",
                  userSelect: "none",
                }}
                onClick={() => col.sortable && toggleSort?.(col.key)}
                align={col.align || "left"}
              >
                {col.label}
                {col.sortable ? (
                  sortBy?.startsWith(col.key) ? (
                    sortBy.endsWith("asc") ? (
                      <ArrowUpwardIcon sx={{ fontSize: 14, ml: 0.3 }} />
                    ) : (
                      <ArrowDownwardIcon sx={{ fontSize: 14, ml: 0.3 }} />
                    )
                  ) : (
                    <FilterAltOutlinedIcon
                      sx={{ fontSize: 16, ml: 0.5, color: "#aaa" }}
                    />
                  )
                ) : null}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={columns.length + 1} align="center">
                Đang tải dữ liệu...
              </TableCell>
            </TableRow>
          ) : error ? (
            <TableRow>
              <TableCell colSpan={columns.length + 1} sx={{ padding: "10px" }}>
                Danh sách trống!!
              </TableCell>
            </TableRow>
          ) : data.length > 0 ? (
            data.map((item) => {
              const id = getRowId(item);
              return (
                <TableRow
                  key={id}
                  hover
                  sx={{ cursor: "pointer" }}
                  onClick={() => onRowClick?.(item)}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    onContextMenu?.(e, item);
                  }}
                >
                  <TableCell
                    sx={{
                      borderRight: "1px solid rgb(236, 234, 234)",
                      lineHeight: "28px",
                      padding: "4px 8px",
                    }}
                  >
                    <Checkbox
                      checked={selected.includes(id)}
                      onChange={() =>
                        setSelected(
                          selected.includes(id)
                            ? selected.filter((i) => i !== id)
                            : [...selected, id]
                        )
                      }
                      onClick={(e) => e.stopPropagation()}
                      sx={{ color: "#999", "&.Mui-checked": { color: "red" } }}
                      style={{ width: "14px", height: "14px" }}
                    />
                  </TableCell>
                  {columns.map((col) => (
                    <TableCell
                      key={col.key}
                      align={col.align || "left"}
                      sx={Styles.tableCellBody}
                    >
                      {col.render ? col.render(item) : (item as any)[col.key]}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length + 1} sx={{ padding: "10px" }}>
                Danh sách trống!!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </MuiTableContainer>
  );
};

export default DataTableContainer;

const Styles = {
  tableCell: {
    fontWeight: "bold",
    color: "black",
    borderRight: "1px solid rgb(240, 235, 235)",
    borderBlock: "1px solid rgb(240, 235, 235)",
    height: "30px",
    lineHeight: "28px",
    padding: "4px 8px",
  },
  tableCellBody: {
    borderRight: "1px solid rgb(236, 234, 234)",
  },
};
