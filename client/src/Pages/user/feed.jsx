import { Outlet, useNavigate } from 'react-router-dom'
import Feed from '../../Components/navbar/Feed'
import Header from '../../Components/navbar/Header'
import Leftbar from '../../Components/navbar/Leftbar'
import Rightbar from '../../Components/navbar/Rightbar'
import '../../Components/navbar/Header.css'
import { useContext, useEffect } from 'react'
import { UserContext } from '../../Store/user/UserContext'
function Feedpg (){


    const navigate = useNavigate()

  

    const {userDetails,setUserDetails}=useContext(UserContext)
    console.log(userDetails,"uiuiuhjhj");
  
    
    useEffect(()=>{

        const token= localStorage.getItem('usertoken')
        console.log(token,"hy there");
        if(!token){
            navigate('/login')
        }
    },[userDetails])

return(
   


    <div className='bd'>
    <Header/>

    <main>

    <div className='container flex'>

<Leftbar/>
<Feed/>
<Rightbar/>

        
    
        </div>
        </main>

     

        </div>
         )

}

export default Feedpg