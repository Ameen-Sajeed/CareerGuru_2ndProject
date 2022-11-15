import React from 'react'
import { FaHome } from 'react-icons/fa'
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import WorkIcon from '@mui/icons-material/Work';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

export const SidebarData= [
    {

    title:"Dashboard",
    icon:<FaHome/>,
    link:"/admin/home"

},
{

    title:"User Management",
    icon:<GroupIcon/>,
    link:"/admin/users"

},
{

    title:"Post Management",
    icon:<DynamicFeedIcon/>,
    link:"/admin/posts"

},
{

    title:"Job Management",
    icon:<WorkIcon/>,
    link:"/home"

},
{

    title:"Inbox",
    icon:<ChatBubbleIcon/>,
    link:"/home"

},




]

