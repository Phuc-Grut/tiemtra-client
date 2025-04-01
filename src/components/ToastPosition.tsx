import { GlobalStyles } from "@mui/material";

const ToastPosition = () => (
  <GlobalStyles
    styles={{
      ".notistack-CollapseWrapper": {
        top: "99px !important",
        right: "0px !important",
        position: "fixed !important",
        zIndex: 1200,
        width: "auto !important",
      },
    }}
  />
);

export default ToastPosition;
