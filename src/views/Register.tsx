import { useState } from "react"
import { useNavigate } from "react-router-dom"
import RegisterForm from "../components/RegisterForm"
import { register } from "../services/Authencation/authService"
// import "../styles/Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("")

  const handleRegister = async (name: string, email: string, password: string) => {
    try {
      await register(name, email, password);
      navigate("/login"); // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
    } catch (err) {
      setError("Registration failed. Please try again.")
    }
  }

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <RegisterForm onSubmit={handleRegister} />
    </div>
  )
}

export default Register
