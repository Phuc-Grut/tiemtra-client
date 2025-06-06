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
const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<StoreLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="san-pham/:code/:slug" element={<ProductDetail />} />
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
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
