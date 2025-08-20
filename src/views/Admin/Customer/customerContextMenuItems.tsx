import { ContextMenuItems } from "src/domain/constants/ContextMenuItems";
import { IContextMenu } from "src/Interfaces/IContextMenu";

const desiredOrder = ["VIEW_ORDER"];

export const customerContextMenuItems: IContextMenu[] = desiredOrder
  .map((id) => ContextMenuItems.find((item) => item.id === id))
  .filter(Boolean) as IContextMenu[];
