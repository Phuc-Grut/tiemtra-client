import { Outlet } from "react-router-dom";
import Footer from "src/components/Layouts/Stores/Footer";
import Header from "src/components/Layouts/Stores/Header";

const StoreLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer/>
    </>
  );
};

export default StoreLayout;
