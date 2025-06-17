import React from "react";
import { Box } from "@mui/material";
import "swiper/css";
import "swiper/css/pagination";
import { IProduct } from "src/Interfaces/IProduct";

import ProductSlider2 from "src/components/ProductSlider2";

interface Props {
  products?: IProduct[];
}

const ProductSlider = ({ products = [] }: Props) => {
  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <ProductSlider2 products={products} />
    </Box>
  );
};

export default ProductSlider;
