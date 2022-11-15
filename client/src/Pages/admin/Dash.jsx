import { Outlet } from 'react-router-dom'
import Dashboard from '../../Components/admin/dashboard/dashboard'
import SidebarF from '../../Components/sidebar/SidebarF'
function Dash (){



return(
    <div className='flex'>

<SidebarF/>
<Dashboard/>  
    
        <Outlet/>
        
    
        </div>
     
    
)
}

export default Dash