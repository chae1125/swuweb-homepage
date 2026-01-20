import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const unlocked = sessionStorage.getItem("adminUnlocked") === "true";

  if (!unlocked) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
