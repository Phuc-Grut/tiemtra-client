import { ReactNode } from "react";

export interface IContextMenu<T = any> {
    id: string;
    label: string;
    icon?: ReactNode;
    onClick?: (item: T) => void;
    isMulti?: boolean;
    children?: IContextMenu<T>[];
  }