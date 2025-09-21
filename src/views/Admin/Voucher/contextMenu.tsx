import { ContextMenuItems } from "src/domain/constants/ContextMenuItems";
import { IContextMenu } from "src/Interfaces/IContextMenu";

const desiredVoucher = ["VIEW", "EDIT", "DELETE"];

export const voucherContextMenuItems: IContextMenu[] = desiredVoucher
  .map((id) => ContextMenuItems.find((item) => item.id === id))
  .filter(Boolean) as IContextMenu[];
