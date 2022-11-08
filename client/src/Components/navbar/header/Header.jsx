import React from 'react'
import job from '../../../assets/images/jobi.png'
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import './header.css'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import HeaderOption from './HeaderOption';
import user from '../../../assets/images/me.jpg'
import FaceIcon from '@mui/icons-material/Face';

function Header() {
  return (
    <div className='header'>
      <div className="header_left">
         <img src={job} alt="" />

         <div className="header_search mx-auto">
             <SearchIcon/>
            <input type="text" />
         </div>

      </div>

      <div className="header_right">
          <HeaderOption Icon={HomeIcon} title={'Home'}/>
          <HeaderOption Icon={SupervisorAccountIcon} title='My Network'/>
          <HeaderOption Icon={BusinessCenterIcon} title='Jobs'/>
          <HeaderOption Icon={NotificationsIcon} title='Notifications'/>
          <HeaderOption Icon={ChatIcon} title='Chat'/>
          <HeaderOption avatar={user} title='Me' />

      </div>
    </div>
  )
}

export default Header