import React from "react";
import { Box, Typography } from "@mui/material";

const IntroVideoSection = () => {
  return (
    <Box
      sx={{
        backgroundImage: 'url("/image/banner/home-2background-img-2.jpg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        padding: "40px 16px",
      }}
    >
      <Box sx={{ maxWidth: "960px", margin: "0 auto" }}>
        {/* Phần tiêu đề và mô tả */}
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            color: "#4c7940",
            fontFamily: "'Dancing Script', cursive",
            fontWeight: 600,
            mb: 2,
          }}
        >
          Tĩnh Trà Giữa Lòng Phồn Hoa
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            textAlign: "center",
            color: "#333",
            fontFamily: "'Dancing Script', cursive",
            fontSize: { xs: "16px", sm: "12px", md: "26px" },
            maxWidth: 700,
            mx: "auto",
            mb: 4,
          }}
        >
          Một khoảng lặng giữa những bộn bề – mời bạn cùng thưởng thức không
          gian trà đạo, nơi tâm an, lòng tĩnh.
        </Typography>

        {/* Phần video */}
        <Box
          sx={{
            position: "relative",
            paddingBottom: "56.25%", // 16:9
            height: 0,
            overflow: "hidden",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
          }}
        >
          <iframe
            src="https://www.youtube.com/embed/5ytKs-HLHVI?autoplay=0&mute=0&rel=0&controls=1"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Video giới thiệu Tiệm Trà"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
          ></iframe>
        </Box>
      </Box>
    </Box>
  );
};

export default IntroVideoSection;
