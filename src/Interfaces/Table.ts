export interface ColumnConfig<T> {
  key: string;
  label: string;
  width?: number;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
  align?: "left" | "center" | "right";
}
