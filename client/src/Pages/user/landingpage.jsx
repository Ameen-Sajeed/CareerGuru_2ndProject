import Landing from '../../Components/User/landingPage/landingPage'
import Footer from '../../Components/footer/footer'
import { Outlet } from 'react-router-dom'
import Navbar from '../../Components/navbar/navbar'
function Landingpg (){



return(
    <div>
<Landing/> 
<Footer/>
  
    
        <Outlet/>
        
    
        </div>
     
    
)
}

export default Landingpg