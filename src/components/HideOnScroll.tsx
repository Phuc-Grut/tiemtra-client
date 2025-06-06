import React, { useEffect, useState } from "react";

interface Props {
  children: React.ReactElement;
}

const HideOnScroll = ({ children }: Props) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return React.cloneElement(children, {
    style: {
      transform: show ? "translateY(0)" : "translateY(-110%)",
      opacity: show ? 1 : 0,
      transition: "transform 0.5s ease, opacity 0s ease",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1200,
      pointerEvents: show ? "auto" : "none",
      // Thêm height 0 khi ẩn
      height: show ? "auto" : 0,
    },
  });
};

export default HideOnScroll;
