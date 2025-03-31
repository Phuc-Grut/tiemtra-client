import { ReactNode } from "react";

export interface IContextMenu<T = any> {
    id: string;
    label: string;
    icon?: ReactNode;
    onClick?: (item: T) => void;
    isMulti?: boolean;            // Dùng khi thao tác áp dụng cho nhiều dòng được chọn
    children?: IContextMenu<T>[]; // Menu con (nếu cần submenu)
  }