import { Outlet } from "react-router-dom";
import Header from "src/components/Layouts/Stores/Header";

const StoreLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default StoreLayout;
