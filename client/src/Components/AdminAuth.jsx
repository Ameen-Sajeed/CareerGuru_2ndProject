import { Navigate, Outlet } from "react-router-dom";

function AdminAuth() {
  const admin = localStorage.getItem("token");

  return !admin ? <Navigate to="admin/login" /> : <Outlet />;
}

export default AdminAuth;
