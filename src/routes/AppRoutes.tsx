import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from "../views/Register"

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
