import { ContextMenuItems } from "src/domain/constants/ContextMenuItems";
import { IContextMenu } from "src/Interfaces/IContextMenu";

const desiredOrder = ["VIEW", "CONFIRM_ORDER", "CHANGE_ORDER_STATUS", "EDIT", "DELETE"];

export const orderContextMenuItems: IContextMenu[] = desiredOrder
  .map((id) => ContextMenuItems.find((item) => item.id === id))
  .filter(Boolean) as IContextMenu[];
