import { Routes, Route } from "react-router-dom"
import Register from "../views/Register"
import Login from "../views/Login"
import Dashboard from "../views/Dashboard"

const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
  )
}

export default AppRoutes
