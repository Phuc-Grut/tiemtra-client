import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";

interface ProductGalleryProps {
  previewImageUrl: string;
  images: string[];
}

const ProductGallery = ({ previewImageUrl, images }: ProductGalleryProps) => {
  const uniqueImages = Array.from(new Set([previewImageUrl, ...images]));
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [transform, setTransform] = useState("translate(0px, 0px) scale(1)");
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const thumbnailRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = thumbnailRefs.current[selectedIndex];
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [selectedIndex]);

  if (!uniqueImages || uniqueImages.length === 0) return null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const moveX = ((x - centerX) / centerX) * 120;
    const moveY = ((y - centerY) / centerY) * 120;
    setTransform(`translate(${moveX}px, ${moveY}px) scale(1.4)`);
  };

  const handleMouseLeave = () => {
    setTransform("translate(0px, 0px) scale(1)");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row-reverse",
        gap: 1,
        backgroundColor: "#fff"
      }}
    >
      {/* Ảnh chính */}
      {isMobile ? (
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          onSlideChange={(swiper: SwiperClass) =>
            setSelectedIndex(swiper.activeIndex)
          }
          initialSlide={selectedIndex}
          style={{ width: "100%", height: "300px" }}
        >
          {uniqueImages.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={uniqueImages[selectedIndex]}
                alt="Main"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  transform,
                  transition: isHovering ? "none" : "transform 0.3s ease",
                  cursor: "zoom-in",
                }}
                onClick={() => setIsOpen(true)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Box sx={styles.priviewImage}>
          <Box
            ref={containerRef}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => {
              setIsHovering(false);
              handleMouseLeave();
            }}
            onMouseMove={handleMouseMove}
            sx={{
              width: "100%",
              height: "90%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <img
              src={uniqueImages[selectedIndex]}
              alt="Main"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                transform,
                transition: isHovering ? "none" : "transform 0.3s ease",
                cursor: "zoom-in",
              }}
              onClick={() => setIsOpen(true)}
            />
          </Box>

          <Box
            onClick={() =>
              setSelectedIndex((prev) =>
                prev === 0 ? uniqueImages.length - 1 : prev - 1
              )
            }
            sx={styles.btnNext}
          >
            <ArrowBackIosNew fontSize="small" />
          </Box>
          <Box
            onClick={() =>
              setSelectedIndex((prev) =>
                prev === uniqueImages.length - 1 ? 0 : prev + 1
              )
            }
            sx={styles.btnNext2}
          >
            <ArrowForwardIos fontSize="small" />
          </Box>
        </Box>
      )}

      {/* list ảnh */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "row" : "column",
          overflowX: isMobile ? "auto" : "hidden",
          overflowY: isMobile ? "hidden" : "auto",
          gap: 1,
          maxHeight: isMobile ? undefined : "400px",
          maxWidth: isMobile ? "100%" : undefined,
          px: isMobile ? 1 : 0,
        }}
      >
        {uniqueImages.map((img, index) => (
          <Box
            key={index}
            ref={(el: HTMLDivElement | null) => {
              thumbnailRefs.current[index] = el;
            }}
            onClick={() => setSelectedIndex(index)}
            sx={{
              ...styles.imageList,
              border:
                selectedIndex === index
                  ? "2px solid #3c9447"
                  : "1px solid #ddd",
              opacity: selectedIndex === index ? 1 : 0.5,
            }}
          >
            <img
              src={img}
              alt={`thumb-${index}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
        ))}
      </Box>

      {isOpen && (
        <Lightbox
          mainSrc={uniqueImages[selectedIndex]}
          nextSrc={uniqueImages[(selectedIndex + 1) % uniqueImages.length]}
          prevSrc={
            uniqueImages[
              (selectedIndex + uniqueImages.length - 1) % uniqueImages.length
            ]
          }
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setSelectedIndex(
              (selectedIndex + uniqueImages.length - 1) % uniqueImages.length
            )
          }
          onMoveNextRequest={() =>
            setSelectedIndex((selectedIndex + 1) % uniqueImages.length)
          }
        />
      )}
    </Box>
  );
};

export default ProductGallery;

const styles = {
  btnNext: {
    position: "absolute",
    top: "50%",
    left: 0,
    transform: "translateY(-50%)",
    px: 1.5,
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
    cursor: "pointer",
    zIndex: 10,
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.5)",
      color: "white",
    },
  },
  btnNext2: {
    position: "absolute",
    top: "50%",
    right: 0,
    transform: "translateY(-50%)",
    px: 1.5,
    fontSize: 24,
    fontWeight: "bold",
    cursor: "pointer",
    color: "black",
    zIndex: 10,
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.5)",
      color: "white",
    },
  },
  priviewImage: {
    position: "relative",
    flex: 1,
    width: "100%",
    height: "500px",
    border: "1px solid #eee",
    borderRadius: 2,
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  imageList: {
    width: 64,
    height: 64,
    minWidth: 64,
    minHeight: 64,
    borderRadius: 1,
    cursor: "pointer",
    overflow: "hidden",
    transition: "all 0.2s",
    flexShrink: 0,
  },
};
