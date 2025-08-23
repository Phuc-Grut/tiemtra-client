import { Routes, Route } from "react-router-dom";
import Register from "../views/Auth/pages/Register";
import Login from "../views/Auth/pages/Login";
import HomePage from "src/views/Store/Home";
import Dashboard from "src/views/Admin/Dashboard";
import AdminDashboard from "src/layouts/DashboardLayout";
import Category from "src/views/Admin/Category";
import Attribute from "src/views/Admin/Attribute";
import StoreLayout from "src/layouts/StoreLayout";
import Product from "src/views/Admin/Product";
import ProtectedRoute from "src/components/ProtectedRoute";
import ProductDetail from "src/views/Store/ProductDetail";
import VerifyOtp from "src/views/Auth/pages/VerifyOtp";
import CartPage from "src/views/Store/Cart";
import ProductList from "src/views/Store/ProductList";
import Order from "src/views/Admin/Order";
import CheckOut from "src/views/Store/Checkout";
import Customer from "src/views/Admin/Customer";
import ForgotPasswordPage from "src/views/Auth/pages/ForgotPassword";
import ResetPasswordPage from "src/views/Auth/pages/ResetPasswordPage";
const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<StoreLayout />}>
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/forgort-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="san-pham/:code/:slug" element={<ProductDetail />} />
        <Route path="/gio-hang" element={<CartPage />} />
        <Route path="/san-pham" element={<ProductList />} />
        <Route path="/san-pham/danh-muc-san-pham/:categorySlug" element={<ProductList />} />
        <Route path="/thanh-toan" element={<CheckOut />} />
      </Route>
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="Admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="product" element={<Product />} />
        <Route path="category" element={<Category />} />
        <Route path="attribute" element={<Attribute />} />
        <Route path="category/*" element={<Category />} />
        <Route path="order/*" element={<Order />} />
        <Route path="customer" element={<Customer />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
