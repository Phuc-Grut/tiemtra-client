import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Box,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { slugify } from "src/utils/slugify";

interface CategoryNode {
  categoryId: number;
  categoryName: string;
  children?: CategoryNode[];
}

const MobileCategoryMenu = ({
  data,
  open,
  onClose,
}: {
  data: CategoryNode[];
  open: boolean;
  onClose: () => void;
}) => {
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});
  const navigate = useNavigate();

  const handleToggle = (id: number) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderList = (items: CategoryNode[]): JSX.Element[] =>
    items
      .filter((item) => item.categoryName?.trim())
      .map((item) => (
        <Box key={item.categoryId}>
          <ListItemButton
            onClick={() => {
              if (item.children?.length) {
                handleToggle(item.categoryId);
              } else {
                navigate(`/san-pham/danh-muc-san-pham/${slugify(item.categoryName)}`);
                onClose();
              }
            }}
            sx={{
              pl: 2,
              fontSize: 15,
              fontWeight: 500,
              backgroundColor:
                item.children?.length && openItems[item.categoryId]
                  ? "#f0f9f2"
                  : "transparent",
              color:
                item.children?.length && openItems[item.categoryId]
                  ? "#2e7d32"
                  : "inherit",
              "&:hover": {
                backgroundColor: "#f9f9f9",
              },
            }}
          >
            <ListItemText primary={item.categoryName} />
            {item.children?.length ? (
              openItems[item.categoryId] ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )
            ) : null}
          </ListItemButton>

          {!!item.children?.length && (
            <Collapse
              in={openItems[item.categoryId]}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding sx={{ pl: 2 }}>
                {renderList(item.children)}
              </List>
            </Collapse>
          )}
        </Box>
      ));

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { backgroundColor: "#fcfcfc" }, // nhẹ nhàng
      }}
    >
      <Box
        sx={{
          width: 300,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            height: 48,
            px: 2,
            display: "flex",
            alignItems: "center",
            fontWeight: 600,
            fontSize: 16,
            color: "#333",
            borderBottom: "2px solid #eee",
            marginTop: 2,
          }}
        >
          Danh mục sản phẩm
        </Box>

        {/* Scrollable menu area */}
        <Box
          sx={{
            width: 300,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundImage: 'url("/image/banner/home-2background-img-2.jpg")',
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <List>{renderList(data)}</List>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            p: 2,
            textAlign: "center",
            borderTop: "1px solid #eee",
            fontSize: 13,
            color: "#888",
          }}
        >
          © 2025 Tiệm Trà. All rights reserved.
        </Box>
      </Box>
    </Drawer>
  );
};

export default MobileCategoryMenu;
