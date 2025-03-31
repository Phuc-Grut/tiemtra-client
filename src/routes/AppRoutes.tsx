import { Routes, Route } from "react-router-dom"
import Register from "../views/Auth/pages/Register"
import Login from "../views/Auth/pages/Login"
import Dashboard from "../views/Dashboard"
import MainLayout from "src/layouts/DashboardLayout"
import Category from "src/views/Category"
const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/category" element={<Category/>} />
          <Route path="/category/*" element={<Category />} />
        </Route>
        <Route path="/login" element={<Login/>} />
      </Routes>
  )
}

export default AppRoutes
