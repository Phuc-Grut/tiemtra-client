import React from "react";
import IntroVideoSection from "./components/IntroVideoSection";
import BannerSlideshowSection from "./components/BannerSlideshowSection";
import { Box } from "@mui/material";
import ProductSlider from "./components/ProductSlider";

const HomePage = () => {
  const sampleProducts = [
    {
      image:
        "https://flieweb.blob.core.windows.net/image-tiemtra/products/Chanh Leo Cam Dứa2 %282%29.jpg",
      title: "Trà sáng C tối A đẹp da",
      price: "360.000₫ – 700.000₫",
      variant: "combo 2 hộp",
    },
    {
      image:
        "https://flieweb.blob.core.windows.net/image-tiemtra/products/Chanh Leo Cam Dứa2 %282%29.jpg",
      title: "Trà Dưỡng Nhan An Nhiên",
      price: "159.000₫ – 300.000₫",
      variant: "15 gói, 30 gói",
    },
    {
      image:
        "https://flieweb.blob.core.windows.net/image-tiemtra/products/Chanh Leo Cam Dứa2 %282%29.jpg",
      title: "Trà Gạo Lứt Thảo Mộc",
      price: "159.000₫ – 300.000₫",
      variant: "15 gói, 30 gói",
    },
    {
      image:
        "https://flieweb.blob.core.windows.net/image-tiemtra/products/Chanh Leo Cam Dứa2 %282%29.jpg",
      title: "Trà Thư Giãn",
      price: "129.000₫ – 250.000₫",
      variant: "15 gói",
    },
    {
      image:
        "https://flieweb.blob.core.windows.net/image-tiemtra/products/Chanh Leo Cam Dứa2 %282%29.jpg",
      title: "Trà Thư Giãn",
      price: "129.000₫ – 250.000₫",
      variant: "15 gói",
    },
    {
      image:
        "https://flieweb.blob.core.windows.net/image-tiemtra/products/Chanh Leo Cam Dứa2 %282%29.jpg",
      title: "Trà Thư Giãn",
      price: "129.000₫ – 250.000₫",
      variant: "15 gói",
    },
    {
      image:
        "https://flieweb.blob.core.windows.net/image-tiemtra/products/Chanh Leo Cam Dứa2 %282%29.jpg",
      title: "Trà Thư Giãn",
      price: "129.000₫ – 250.000₫",
      variant: "15 gói",
    },
    {
      image:
        "https://flieweb.blob.core.windows.net/image-tiemtra/products/Chanh Leo Cam Dứa2 %282%29.jpg",
      title: "Trà Thư Giãn",
      price: "129.000₫ – 250.000₫",
      variant: "15 gói",
    },
  ];

  // Trong HomePage.jsx:

  return (
    <Box
      sx={{
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <BannerSlideshowSection />
      <IntroVideoSection />

      <ProductSlider products={sampleProducts} />
    </Box>
  );
};

export default HomePage;
