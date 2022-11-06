import Footer from '../../Components/footer/footer'
import { Outlet } from 'react-router-dom'
import Feed from '../../Components/User/Feed/feed'
import Navbar from '../../Components/navbar/navbar'
import Header from '../../Components/navbar/header/Header'
import Sidebar2 from '../../Components/sidebar/sidebar'
import SidebarUser from '../../Components/Sidebar1/SidebarUser'
import './ff.css'

function Feedpg (){



return(
    <div>
<Header/>
<div className='am flex p-2'>

<SidebarUser/>
<Feed/> 
</div>
<Footer/>
    
        <Outlet/>
        
    
        </div>
     
    
)
}

export default Feedpg