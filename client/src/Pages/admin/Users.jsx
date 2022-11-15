import { Outlet } from 'react-router-dom'
import Users from '../../Components/admin/users/users'
import SidebarF from '../../Components/sidebar/SidebarF'
function UsersMan (){



return(
    <div className='flex'>

<SidebarF/>
<Users/>
  
    
        <Outlet/>
        
    
        </div>
     
    
)
}

export default UsersMan