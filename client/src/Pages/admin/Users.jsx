import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Users from "../../Components/admin/users/users";
import SidebarF from "../../Components/sidebar/SidebarF";
function UsersMan() {
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
      <Users />
    </div>
  );
}

export default UsersMan;
