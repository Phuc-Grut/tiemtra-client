import React from "react";
import Slider from "react-slick";
import { Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface ArrowProps {
  onClick?: () => void;
}

const arrowBaseStyle = {
  position: "absolute",
  top: "50%",
  zIndex: 2,
  transform: "translateY(-50%)",
  width: 48,
  height: 48,
  border: "2px solid #fff",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "all 0.3s ease",
  backgroundColor: "transparent",
};

const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      ...arrowBaseStyle,
      left: "16px",
      "&:hover": {
        backgroundColor: "#009900",
      },
    }}
  >
    <ArrowBackIosNewIcon sx={{ fontSize: 20, color: "#fff" }} />
  </Box>
);

const NextArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      ...arrowBaseStyle,
      right: "16px",
      "&:hover": {
        backgroundColor: "#009900",
      },
    }}
  >
    <ArrowForwardIosIcon sx={{ fontSize: 20, color: "#fff" }} />
  </Box>
);

const BannerSlideshowSection: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:768px)");
  const isTablet = useMediaQuery("(max-width:1024px)");

  const images: string[] = [
    "/image/banner/baner2.png",
    "/image/banner/banner2.jpg",
    "/image/banner/bannerNhieuSp.png",
  ];

  const dynamicHeight = isMobile ? "25vh" : isTablet ? "60vh" : "100vh";

  const settings = {
    dots: true,
    infinite: true,
    autoplay: false,
    speed: 800,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: !isMobile,
    fade: true,
    swipe: true,
    prevArrow: !isMobile ? <PrevArrow /> : undefined,
    nextArrow: !isMobile ? <NextArrow /> : undefined,
  };

  const SlickSlider = Slider as unknown as React.ComponentType<any>;

  return (
    <Box
      sx={{
        width: "100%",
        height: dynamicHeight,
        overflow: "hidden",
        bgcolor: "#f9f9f9",
        position: "relative",
        pb: isMobile ? 4 : 0,
      }}
    >
      <SlickSlider {...settings}>

        {images.map((img, index) => (
          <Box key={index} sx={{ outline: "none" }}>
            <Box
              component="img"
              src={img}
              alt={`Slide ${index + 1}`}
              draggable={false}
              tabIndex={-1}
              sx={{
                width: "100%",
                height: dynamicHeight,
                objectFit: "cover",
                outline: "none",
                pointerEvents: "none",
                userSelect: "none",
              }}
            />
          </Box>
        ))}
      </SlickSlider>

      {/* Custom styles for slick dots */}
      <style>{`
        .slick-dots {
          display: flex !important;
          justify-content: center;
          position: absolute;
          bottom: 10px;
          width: 100%;
          padding: 0;
          margin: 0;
          list-style: none;
          z-index: 10;
        }
        .slick-dots li {
          margin: 0 5px;
        }
        .slick-dots li button:before {
          font-size: 10px;
          color: #fff;
          opacity: 0.5;
        }
        .slick-dots li.slick-active button:before {
          opacity: 1;
          color: #fff;
        }
      `}</style>
    </Box>
  );
};

export default BannerSlideshowSection;
