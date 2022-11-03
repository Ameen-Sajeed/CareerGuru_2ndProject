
import Footer from "../../Components/footer/footer"
import Login from "../../Components/Login/login"
import { Outlet } from "react-router-dom"
function LoginPage (){



return(
    <div>
<Login/>
<div className="p-1">
<Footer/>  

</div>
    
        
   <Outlet/> 
        </div>
     
    
)
}

export default LoginPage