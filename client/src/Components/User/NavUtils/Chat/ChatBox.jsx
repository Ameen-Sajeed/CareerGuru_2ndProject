import React, { useEffect, useState } from 'react'
import { addMessage, GetMessage } from '../../../../API/MessageRequests'
import { getUser } from '../../../../API/User'
import {format} from 'timeago.js'
import InputEmoji from 'react-input-emoji'
import me from '../../../../assets/images/us.webp'


function ChatBox({chat,currentUser,setSendMessage,recieveMessage}) {

    const [userData,setUserData]=useState(null)
    const [messages,setMessages]=useState([])
    const [newmessages,setNewMessages]=useState('')
    
    
    // fetching data for header

    useEffect(()=>{

        const userId = chat?.members?.find((id)=>id!==currentUser)

        const getUserData = async()=>{
            try{
                const {data}= await getUser(userId)
                setUserData(data)
                // console.log(data,"fifaaaa");
                
              }
              catch(error){
                console.log(error);
              }
              
                }
        if(chat!==null) getUserData()
    },[chat,currentUser])
    
// fetching data for messages

useEffect(()=>{
  const fetchMessages = async ()=>{
        try {
          
          const {data} = await GetMessage(chat._id)
          console.log(data,"heeee");
          setMessages(data)
            
        } catch (error) {
            console.log(error);
          }
        }
    if(chat!==null) fetchMessages()
    
},[chat])


const handleChange = (newmessages)=>{
  setNewMessages(newmessages)
}

// Send Message   

const handleSend = async(e)=>{
  
    e.preventDefault()
    const message = {
      senderId: currentUser,
      text: newmessages,
      chatId:chat._id
    }
    
    const receiverId = chat.members.find((id)=> id !== currentUser)
    // send message to socket server
    setSendMessage({...message,receiverId})
    // send message to database
    
    try {
      
      const {data} = await addMessage(message)
      setMessages([...messages,data])
      setNewMessages("")
      
    } 
    catch (error) {
      
      console.log(error);
    }
    
    
  }

  // Recieve Message from parent Component
  
  useEffect(()=>{
  
      if(recieveMessage!==null && recieveMessage?.chatId===chat?._id){
          setMessages([...messages,recieveMessage])
      }
  
  },[recieveMessage])





  return (

    <>
{
    chat ? 


    <div class="hidden w-3/6 bg-white h-full md:flex flex-col justify-start items-stretch border-r-2 border-l-2 border-gray-100 lg:rounded-r-md xl:rounded-none">
          {/* <!-- Header with name --> */}
          <div class="flex flex-row items-center justify-between px-3 py-2 bg-gray-50 bg-opacity-40 border-b-2 border-gray-100">
            <div class="">
              <h2 class="font-medium">{userData?.username}</h2>
              {/* <p class="text-xs text-gray-500">4 memebres</p> */}
            </div>
          </div>
          {/* <!-- Messages --> */}
          <div class="flex-auto flex flex-col justify-between overflow-y-auto messagelist">
            <div class="flex flex-col h-96">
                 <div class="flex flex-row p-2 w-11/12">
                <div class="w-1/12 py-2 flex">
                  <img src={me} class="h-12 w-12 rounded-full self-end" alt=""/> 
                </div>
              
                <div class="w-11/12 p-2">
                {
                    
                    messages.map((obj)=>{
                      
                        return(
                            <>
                            {obj.senderId !== currentUser  ? 
                  // <div class=   "bg-gray-300 px-4 py-3 p-3 rounded-full mb-2">
                  //   <h2 class="text-sm font-semibold mb-2 "></h2>
                  //   <p class="text-md ">{obj.text}</p>
                  //   <span class="text-xs text-gray-500 flex">{format(obj.createdAt)}</span>
                  // </div>
              
                  <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-blue-200 rounded-b-xl rounded-tl-xl rounded-tr-none shadow my-2 w-1/3">
                    <span class="block">{obj.text}</span>
                    <span className="text-xs">{format(obj.createdAt)}</span>
                  </div>
        


                  :<div class="flex flex-row justify-end">
                  <div class="p-1">
                    <div class="px-4 py-3 rounded-b-xl rounded-tl-xl rounded-tr-none shadow my-2 bg-blue-400 text-white flex flex-col align-middle">
                      <p class="text-sm flex text-center">
                      {obj.text}
                      </p>
                      <div class="ml-2 flex flex-row text-xs text-gray-300">
                        <span class="mr-1">
                        {format(obj.createdAt)}
                        </span>
                        {/* <svg class="w-4 h-4 fill-current" viewBox="0 0 19 14">
                          <path fill-rule="nonzero" d="M4.96833846,10.0490996 L11.5108251,2.571972 C11.7472185,2.30180819 12.1578642,2.27443181 12.428028,2.51082515 C12.6711754,2.72357915 12.717665,3.07747757 12.5522007,3.34307913 L12.4891749,3.428028 L5.48917485,11.428028 C5.2663359,11.6827011 4.89144111,11.7199091 4.62486888,11.5309823 L4.54038059,11.4596194 L1.54038059,8.45961941 C1.2865398,8.20577862 1.2865398,7.79422138 1.54038059,7.54038059 C1.7688373,7.31192388 2.12504434,7.28907821 2.37905111,7.47184358 L2.45961941,7.54038059 L4.96833846,10.0490996 L11.5108251,2.571972 L4.96833846,10.0490996 Z M9.96833846,10.0490996 L16.5108251,2.571972 C16.7472185,2.30180819 17.1578642,2.27443181 17.428028,2.51082515 C17.6711754,2.72357915 17.717665,3.07747757 17.5522007,3.34307913 L17.4891749,3.428028 L10.4891749,11.428028 C10.2663359,11.6827011 9.89144111,11.7199091 9.62486888,11.5309823 L9.54038059,11.4596194 L8.54038059,10.4596194 C8.2865398,10.2057786 8.2865398,9.79422138 8.54038059,9.54038059 C8.7688373,9.31192388 9.12504434,9.28907821 9.37905111,9.47184358 L9.45961941,9.54038059 L9.96833846,10.0490996 L16.5108251,2.571972 L9.96833846,10.0490996 Z"></path>
                        </svg> */}
                      </div>
                    </div>
                   
                  </div>
                </div>}
                
                {/* <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-blue-200 rounded-b-xl rounded-tl-xl rounded-tr-none shadow my-2 w-1/3">
                <span class="block">{obj.text}</span>
                <span className="text-xs">{format(obj.createdAt)}</span>
              </div>} */}
                  </>
                  )
                    })
                }
                
                </div>
              </div>
              {/* friends message end */}
                  {/* own message start*/}
                  
               {/*own message end  */}
            </div>
          </div>
          {/* <!-- Input for writing a messages --> */}
          <div class="flex flex-row justify-between items-center p-3">
      
            {/* <div class="flex-1 px-3">
              <input type="text" class="w-full border-2 border-gray-100 rounded-full px-4 py-1 outline-none text-gray-500 focus:outline-none focus:ring" placeholder="Write a message..."/>
            </div> */}
            <div class="flex-1 px-3">
            <InputEmoji value={newmessages} onChange={handleChange} />
            </div>
            {
                newmessages !== "" ?
            <div>
            
              
            <a href="#_" class="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group" onClick={handleSend}>
           <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-500 group-hover:translate-x-0 ease">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </span>
        <span class="absolute flex items-center justify-center w-full h-full text-blue-500 transition-all duration-300 transform group-hover:translate-x-full ease">Send Message</span>
         <span class="relative invisible">Send Message</span>
           </a>   
                    </div>:null}
          </div>
        </div>:
        <span className='text-xl text-blue-500 text-center font-semibold p-2'>Tap a chat to start Conversation...</span> }

        </>

  )
}

export default ChatBox