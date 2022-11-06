import { Outlet } from 'react-router-dom'
import Users from '../../Components/admin/users/users'
import Sidebar2 from '../../Components/sidebar/sidebar'
function UsersMan (){



return(
    <div className='flex'>
<Sidebar2/>
<Users/>
  
    
        <Outlet/>
        
    
        </div>
     
    
)
}

export default UsersMan