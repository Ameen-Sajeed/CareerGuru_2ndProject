import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Reports from "../../Components/admin/Posts/Reports";
import SidebarF from "../../Components/sidebar/SidebarF";
function ReportsMan() {
  const navigate = useNavigate()
  useEffect(()=>{

    const token= localStorage.getItem('token')
    console.log(token,"hy there");
    if(!token){
        navigate('/admin/login')
    }
  })
  return (
    <div className="flex">
      <SidebarF />
      <Reports/>      
    </div>
  );
}

export default ReportsMan;
