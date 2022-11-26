import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getUser } from '../../../../API/User'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import me from '../../../../assets/images/us.webp'

import './Chat.css'

const Conversation = ({data,currentUserId,online}) =>{

    const [userData,setUserData]=useState(null)

useEffect(()=>{

    const userId = data.members.find((id)=>id!==currentUserId)
    const getUserData = async()=>{
try{
    const {data}= await getUser(userId)
    setUserData(data)
    // console.log(data,"haiii");

}
catch(error){
    console.log(error);
}
  
    }
    getUserData()
},[])

// console.log("jeyyyyyy");

  return (
       <>
      <li class="my-2 p-2 flex flex-row bg-blue-300 rounded-lg cursor-pointer">
    {online && <FiberManualRecordIcon style={{color:"green"}}/>}
      <img class="w-12 h-12 mr-4 rounded-full" src={me} alt="" />
         <div class="w-full flex flex-col justify-center text-dark">
          <div class="flex flex-row justify-between">
            <h2 class="text-xs  font-bold">{userData?.username}</h2>
       { online ?    <span class="text-xs text-green-800">Online</span>:  <span class="text-xs text-red-800">Offline</span>}

          </div>
          {/* <div class="flex flex-row justify-between items-center">
            <p class="text-xs">There are many variations of passages...</p>
          </div> */}
        </div>
      </li>  
    </>
  )
}

export default Conversation