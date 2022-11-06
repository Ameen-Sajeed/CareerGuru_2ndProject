import React, { useState } from 'react'
import feed from '../../../assets/images/sm.webp'
import feed2 from '../../../assets/images/cc.webp'
import feed3 from '../../../assets/images/gh.jpg'
import CreateIcon from '@mui/icons-material/Create';
import './Feed.css'
import ImageIcon from '@mui/icons-material/Image';
import InputOptions from './inputOptions';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import Post from '../Post/Post';




function Feed() {

  const [posts,setPosts]=useState([])

const sendPost = (e) =>{
  e.preventDefault()
}

  return (
    <div className='feed'>
 
     


     <div className="feed_inputContainer">

        <div className="feed_input">
            <CreateIcon/>
            <form>
                <input type="text" />
                <button  type='submit'>Send</button>
            </form>

        </div>

        <div className="feed_inputOptions">
          <InputOptions Icon={ImageIcon} title='Photo'
           color="#70B5f9"/>
             <InputOptions Icon={SubscriptionsIcon} title='Video'
           color="#E7A33E"/> 
            <InputOptions Icon={EventNoteIcon} title='Event'
           color="#COCBCD"/> 
            <InputOptions Icon={CalendarViewDayIcon} title='Write article'
           color="#7FC15E"/>

        </div>

     </div>
{/* Posts */}

{
  posts.map((post)=>{
    <Post/>
  })
}

<Post 
name="Amien Sajeed" 
description="This is a test" 
message="WoW this worked"/>

   <center>
     <img src={feed} alt="" />
     <img src={feed2} alt="" />
     <img src={feed3} alt="" />

     </center> 

     
    </div>
  )
}

export default Feed