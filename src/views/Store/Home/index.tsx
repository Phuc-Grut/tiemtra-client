import React from "react";
import IntroVideoSection from "./components/IntroVideoSection";
import BannerSlideshowSection from "./components/BannerSlideshowSection";

const HomePage = () => {
  return (
    <div style={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <BannerSlideshowSection/>
      <IntroVideoSection />
    </div>
  );
};

export default HomePage;
