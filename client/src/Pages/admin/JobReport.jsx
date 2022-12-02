import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JobReports from "../../Components/admin/Jobs/ReportJob";
import SidebarF from "../../Components/sidebar/SidebarF";
function JobReportsMan() {
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
      <JobReports/>      
    </div>
  );
}

export default JobReportsMan;
