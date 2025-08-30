import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const location = useLocation();
  const token = typeof window !== "undefined" ? localStorage.getItem("finos_token") : null;
  if (!token) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }
  return <Outlet />;
};

export default ProtectedRoute;