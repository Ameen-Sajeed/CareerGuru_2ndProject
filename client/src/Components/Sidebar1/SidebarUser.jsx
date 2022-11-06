import { Avatar } from '@mui/material'
import React from 'react'
import cover from '../../assets/images/bbb.webp'
import user from '../../assets/images/me.jpg'

import './Side.css'

function SidebarUser() {

// const RecentItem = (topic) =>{
//     <div className="sidebar_recentItem">
//     <span className='sidebar_hash'>#</span>
//         <p>{topic}</p>
//         </div>
// }

  return (
    <div className='sidebar'>
   <div className="sidebar_top">
    <img src={cover} alt="" />
    <Avatar className='sidebar_avatar' src={user}/>
    <h2>Amien Sajeed</h2>
    <h4>amiensajeed@gmail.com</h4>
    </div>   

    <div className="sidebar_stats">
        <div className="sidebar_stat">
        <p>Who viewed you</p>
        <p className="sidebar_statNumber">
            2,543 
        </p>
        </div>
        <div className="sidebar_stat">
        <p> View on posts</p>
        <p className="sidebar_statNumber">
            2,473 
        </p>

        </div>
        </div>  

        <div className="sidebar_bottom">
            <p>Recent</p>
            <div className="sidebar_recentItem">
        <span className='sidebar_hash'>#</span>
        <p>reactjs</p>
        </div>
        <div className="sidebar_recentItem">
        <span className='sidebar_hash'>#</span>
        <p>Nodejs</p>
        </div>
        <div className="sidebar_recentItem">
        <span className='sidebar_hash'>#</span>
        <p>Python</p>
        </div>    <div className="sidebar_recentItem">
        <span className='sidebar_hash'>#</span>
        <p>Mongodb</p>
        </div>    
 
        </div>

    </div>
  )
}

export default SidebarUser