
import { Box, Typography, useTheme } from "@mui/material";
import "swiper/css";
import "swiper/css/pagination";
import { IProduct } from "src/Interfaces/IProduct";
import ProductSlider2 from "src/components/ProductSlider2";
import ProductSlider3 from "src/components/ProductSlider3";

interface Props {
  products?: IProduct[];
}

const ProductSlider = ({ products = [] }: Props) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: 3,
        backgroundColor: "#ffffff",
        backgroundImage: 'url("/image/banner/home-2background-img-2.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        px: 2,
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box sx={{ maxWidth: 1200, width: "100%", textAlign: "center" }}>
        <Typography
          variant="h3"
          sx={{
            fontFamily: "'Dancing Script', cursive",
            color: "#4c7940",
            fontWeight: 600,
          }}
        >
          Tiệm Trà
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: { xs: "18px", sm: "22px", md: "30px" },
            fontWeight: 500,
            mt: 1,
            mx: "auto",
            maxWidth: 600,
            whiteSpace: "normal",
            wordWrap: "break-word",
          }}
        >
          Không gian sống chậm, thưởng trà và thư giãn giữa nhịp sống hiện đại.
        </Typography>

        <ProductSlider2 products={products} />
        {/* <ProductSlider3 products={products} /> */}
      </Box>
    </Box>
  );
};

export default ProductSlider;
