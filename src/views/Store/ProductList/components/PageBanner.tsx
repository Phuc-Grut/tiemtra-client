// components/PageBanner.tsx
import { Box, Typography } from "@mui/material";

interface Props {
  title: string;
  imageUrl: string;
}

const PageBanner = ({ title, imageUrl }: Props) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: 140, md: 160 },
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "end",
        pl: { xs: 2, md: 48 }, // 👈 Cách lề trái (padding-left)
        pb: { xs: 1.5, md: 3 }, //
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        color="#fff"
        sx={{
          textShadow: "0px 0px 6px rgba(0,0,0,0.5)",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default PageBanner;
