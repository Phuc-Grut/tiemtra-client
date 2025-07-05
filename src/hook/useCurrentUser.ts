// hooks/useCurrentUser.ts
import { useState, useEffect } from "react";

export const useCurrentUser = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const syncUser = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    // Gọi khi hook mount
    syncUser();

    // Lắng nghe sự kiện logout hoặc login
    window.addEventListener("userChanged", syncUser);

    return () => {
      window.removeEventListener("userChanged", syncUser);
    };
  }, []);

  return user;
};
