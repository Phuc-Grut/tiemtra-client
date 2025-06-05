import UnauthorizedPage from "./UnauthorizedPageProps";

type ProtectedRouteProps = {
  children: React.ReactNode;
  requiredRole?: string; // ví dụ: "Admin"
};

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user) {
  return <UnauthorizedPage />;
}

if (requiredRole && !user.roles?.includes(requiredRole)) {
  return (
    <UnauthorizedPage
      message="Bạn không có quyền truy cập trang này. Vui lòng liên hệ quản trị viên."
      showLoginButton={false}
    />
  );
}

  return <>{children}</>;
};

export default ProtectedRoute;
