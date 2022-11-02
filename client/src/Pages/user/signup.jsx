import { Outlet } from "react-router-dom"
import Footer from "../../Components/footer/footer"
import Signup from "../../Components/SignUp/signUp"
function SignUpPage (){



return(
    <div>

<Signup/>  
<div className="p-1">
<Footer/>  

</div>
     <Outlet/>
        
    
        </div>
     
    
)
}

export default SignUpPage