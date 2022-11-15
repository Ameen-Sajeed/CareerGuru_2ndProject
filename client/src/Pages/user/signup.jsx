import { Outlet } from "react-router-dom"
import Signup from "../../Components/User/SignUp/signUp"
function SignUpPage (){



return(
    <div>

<Signup/>  
<div className="p-1">
{/* <Footer/>   */}

</div>
     <Outlet/>
        
    
        </div>
     
    
)
}

export default SignUpPage