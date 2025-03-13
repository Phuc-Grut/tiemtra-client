import axios, { AxiosError } from "axios"

const API_URL = "https://localhost:7021/api/auth"

export const register = async (name: string, email: string, password: string) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    throw new Error("Registration failed");
  }

  return response.json()
}

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password })

    localStorage.setItem("jwtToken", response.data.Token)
    return response.data

  } catch (error) {
    if (error instanceof AxiosError) { // Kiểm tra lỗi có phải AxiosError không
      console.error("Lỗi đăng nhập:", error.response?.data?.message || "Đăng nhập thất bại");
    } else {
      console.error("Lỗi không xác định:", error)
    }
    throw error
  }
}
