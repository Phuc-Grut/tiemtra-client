import { ContextMenuItems } from "src/domain/constants/ContextMenuItems";
import { IContextMenu } from "src/Interfaces/IContextMenu";

const desiredOrder = ["VIEW", "LIST_PRODUCT", "EDIT", "DELETE"];

export const categoryContextMenuItems: IContextMenu[] = desiredOrder
  .map((id) => ContextMenuItems.find((item) => item.id === id))
  .filter(Boolean) as IContextMenu[];
