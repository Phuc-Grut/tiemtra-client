import { useState } from "react"
import { useNavigate } from "react-router-dom"
import RegisterForm from "../components/RegisterForm"
import { register } from "src/services/api/Authentication"
// import "../styles/Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("")

  const handleRegister = async (name: string, email: string, password: string) => {
    try {
      await register(name, email, password);
      navigate("/login")
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
