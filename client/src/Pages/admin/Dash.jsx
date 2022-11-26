import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Dashboard from "../../Components/admin/dashboard/dashboard";
import SidebarF from "../../Components/sidebar/SidebarF";
function Dash() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token, "hy there");
    if (!token) {
      navigate("/admin/login");
    }
  });

  return (
    <div className="flex">
      <SidebarF />
      <Dashboard />
    </div>
  );
}

export default Dash;
