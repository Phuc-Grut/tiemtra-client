import React from "react";
import { Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { IContextMenu } from "src/Interfaces/IContextMenu";

interface Props<T = any> {
  items: IContextMenu<T>[];
  anchorEl: HTMLElement | null | { mouseX: number; mouseY: number } | null;
  onClose: () => void;
  contextItem: T | null;
}

const GenericContextMenu = <T,>({
  items,
  anchorEl,
  onClose,
  contextItem,
}: Props<T>) => {
  return (
    <Menu
      anchorEl={typeof anchorEl !== "object" ? anchorEl : undefined}
      open={Boolean(anchorEl)}
      onClose={onClose}
      anchorReference={
        anchorEl && typeof anchorEl === "object" && "mouseX" in anchorEl
          ? "anchorPosition"
          : "anchorEl"
      }
      anchorPosition={
        anchorEl && typeof anchorEl === "object" && "mouseX" in anchorEl
          ? { top: anchorEl.mouseY, left: anchorEl.mouseX }
          : undefined
      }
      PaperProps={{
        sx: {
          borderRadius: 2,
          minWidth: 160,
          backgroundColor: "#fff",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
          paddingY: 0.5,
        },
      }}
    >
      {items.map((item, index) => (
        <MenuItem
          key={item.id}
          onClick={() => {
            item.onClick?.(contextItem!);
            onClose();
          }}
          sx={{
            fontSize: "14px",
            paddingY: "6px",
            borderBottom:
              index !== items.length - 1 ? "1px solid #dcdcdc" : "none",
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
          <ListItemText primary={item.label} />
        </MenuItem>
      ))}
    </Menu>
  );
};

export default GenericContextMenu;
