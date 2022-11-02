import Landing from '../../Components/landingPage/landingPage'
import Footer from '../../Components/footer/footer'
import { Outlet } from 'react-router-dom'
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