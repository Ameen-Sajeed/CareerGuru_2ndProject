import Landing from '../../Components/User/landingPage/landingPage'
import { Outlet } from 'react-router-dom'
function Landingpg (){



return(
    <div>
<Landing/> 
  
    
        <Outlet/>
        
    
        </div>
     
    
)
}

export default Landingpg