import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JobManagement from "../../Components/admin/Jobs/Jobs";
import SidebarF from "../../Components/sidebar/SidebarF";
function JobsMan() {
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
      <JobManagement/>
    </div>
  );
}

export default JobsMan;
