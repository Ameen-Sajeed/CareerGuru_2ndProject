import React from 'react'
import './HeaderOption.css'
import User from '../../../assets/images/user2.webp'
import { Avatar } from '@mui/material';

function HeaderOption(props) {
  return (
    <div className='headerOption'>
       {props.Icon && <props.Icon className="headerOption_icon"/>}
       {props.avatar && <Avatar className="headerOption_icon" src={props.avatar}/> }

    <h3 className='headerOption_title'>{props.title}</h3>
    </div>
  )
}

export default HeaderOption