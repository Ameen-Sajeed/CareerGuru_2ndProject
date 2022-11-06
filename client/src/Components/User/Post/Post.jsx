import { Avatar } from '@mui/material'
import React from 'react'
import InputOptions from '../Feed/inputOptions'
import './Post.css'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ShareIcon from '@mui/icons-material/Share';
import SendIcon from '@mui/icons-material/Send';
function Post({name,description,message,photoUrl}) {
  return (
   <div className="post">
    <div className="post_header">
        <Avatar/>
        <div className="post_info">
            <h2>{name}</h2>
            <p>{description}</p>
        </div>
    </div>

    <div className="post_body">
        <p>{message}</p>
    </div>

    <div className="post_buttons">
        <InputOptions Icon={ThumbUpAltIcon} title="Like" color="gray" />
        <InputOptions Icon={ChatBubbleIcon} title="Comment" color="gray" />
        <InputOptions Icon={ShareIcon} title="Share" color="gray" />
        <InputOptions Icon={SendIcon} title="Send" color="gray" />

    </div>
    
   </div>
  )
}

export default Post