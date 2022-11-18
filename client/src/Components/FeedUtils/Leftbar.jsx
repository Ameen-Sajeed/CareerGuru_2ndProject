import './Header.css'
import me from '../../assets/images/me.jpg'
import {  useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


function Leftbar() {

    const Navigate = useNavigate()

    const userData = useSelector((state=>state.user))
   
    // console.log(userData,"hkjhkjh")

    function check (){

        console.log("hey there");    
        if(userData.status === "inactive"){
            Navigate('/login')
        }
    }
check()


    
  return (
    
    
     <div className="left ">
        <a className='profile'>
            <div className="profile-photo">
           <img src={me} alt="" />
            </div>
            <div className="handle">
                <h4>{userData.username}</h4>
            <p className='text-muted'>@{userData.username}</p>
            </div>
        </a>

        <div className="sideleft  ">
            <a className='menu-item active'>
                <span><i className='uil uil-home'></i></span><h3>Home</h3>
                </a>
                <a className='menu-item'>
                <span><i className='uil uil-compass'></i></span><h3>Explore</h3>
                </a>  
                 <a className='menu-item'>
                <span><i className="uil uil-users-alt"></i></span><h3>Network</h3>
                </a>  
                 <a className='menu-item' id='messages-notifications'>
                <span><i className='uil uil-envelope-alt'><small className='notification-count'>6</small></i></span><h3>Messages</h3>
                </a>   
                <a className='menu-item'>
                <span><i className="uil uil-suitcase-alt"></i></span><h3>Job</h3>
                </a>  
            
                 <a className='menu-item' id='notifications'>
                <span><i className='uil uil-bell'><small className='notification-count'>9+</small></i></span><h3>Notifications</h3>
                {/* Notification Pop Up */}

                <div className="notifications-popup" id=''>
                    <div>
                       <div className="profile-photo">
                        <img src={me} alt="" />
                        </div>

                        <div className="notifications-body">
                            <b>Sita ram</b> accepted your follow request
                            <small className='text-muted'>2 days ago</small>
                        </div> 
                    </div>
                    <div>
                       <div className="profile-photo">
                        <img src={me} alt="" />
                        </div>

                        <div className="notifications-body">
                            <b>Tanvi ram</b> accepted your follow request
                            <small className='text-muted'>2 days ago</small>
                        </div> 
                    </div>
                    <div>
                       <div className="profile-photo">
                        <img src={me} alt="" />
                        </div>

                        <div className="notifications-body">
                            <b>Jeena ram</b> accepted your follow request
                            <small className='text-muted'>2 days ago</small>
                        </div> 
                    </div>
                    
                </div>
            
                </a>
        </div>
        <label htmlFor="create-post" className='btn btn-primary'>Post a Job</label>
     </div>
    
 
  )
  
}

export default Leftbar