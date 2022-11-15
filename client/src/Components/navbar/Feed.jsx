import React, { useEffect, useState } from 'react'
import './Header.css'
import me from '../../assets/images/me.jpg'
import ee from '../../assets/images/eee.jpeg'
import axios from 'axios'
import { userUrl } from '../../Constants/Constant'
import ImageIcon from '@mui/icons-material/Image';

import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {format} from 'timeago.js'


function Feed() {

    const userData = useSelector((state=>state.user))
    const  userId = userData._id
    const [file,setFile]=useState('')
    const [desc,setDesc]=useState('')
    const [posts,setPosts]=useState([])
    const [user,setUser]=useState({})
    const PF =process.env.REACT_APP_PUBLIC_FOLDER;
    console.log(PF,"hjhjhj");


    const submitHandler=async(e)=>{
    e.preventDefault() 
    const newPost={
      userId:userId,
      desc:desc,
    }
    if(file){
      const data=new FormData();
      const fileName=file.name
      data.append("file",file)
      data.append("name",fileName)
      newPost.img=fileName
      try {
        await axios.post('http://localhost:5000/upload',data)
        console.log(data,"data");

        window.location.reload()
        
      } catch (error) {
        console.log(error);
      }
    }
    try{
       await axios.post('http://localhost:5000/createPost',newPost)
       console.log(newPost,"klkl");

    }catch(err){
     console.log(err);
    }
  }

useEffect (()=>{
    const fetchPost=async()=>{
      const res=await axios.get(`http://localhost:5000/post/timeline/${userId}`)
      setPosts(
        res.data.sort((p1,p2)=>{
        return new Date(p2.createdAt)-new Date(p1.createdAt)
      })
     )
    }
    fetchPost()
 },[])


 useEffect(() => {
    const fetchUser = async () => {
        console.log(posts,"hyyyygggggggggggggggggggggh");
        console.log(posts.userId);
      const res = await axios.get(`http://localhost:5000/users?userId=${posts.userId}`);
      console.log(res,"rrrrrrtyghbh");
      
      setUser(res.data);
    };
    fetchUser();
  }, [posts]);



  return (
  

          <div className='middle'>

            <div className="stories">
                <div className="story">
                    <div className="profile-photo">
                        <img src={me} alt="" />
                    </div>
                    <p className="name">React Js Developer</p>
                </div>
                <div className="story">
                    <div className="profile-photo">
                        <img src={me} alt="" />
                    </div>
                    <p className="name">Android Developer</p>
                </div>      <div className="story">
                    <div className="profile-photo">
                        <img src={me} alt="" />
                    </div>
                    <p className="name">Frontend Developer</p>
                </div>      <div className="story">
                    <div className="profile-photo">
                        <img src={me} alt="" />
                    </div>
                    <p className="name">Python Developer</p>
                </div>      <div className="story">
                    <div className="profile-photo">
                        <img src={me} alt="" />
                    </div>
                    <p className="name">Flutter Developer</p>
                </div>
            </div>

            <form className='create-post' onSubmit={submitHandler}>
                <div className="profile-photo">
                    <img src={me} alt="" />
                </div>
                <input type="text" placeholder="What's on Your Mind,Amien?" name="post" id="create-post"   onChange={(e)=> {setDesc(e.target.value)}} />
                <label className='p-2 cursor-pointer text-blue-400' htmlFor="img-upload"> <ImageIcon  style={{fontSize:"30px"}} /></label>
                <input type="file" id="img-upload" className='hidden' name="file" onChange={(e)=>setFile(e.target.files[0])} />
                <input type="submit" value="Post" className='btn btn-primary' />
           
               
            </form>

            <div className="feeds">
                {
                    posts.map((obj)=>{
                        console.log(PF + obj.img,"rrrrr"); 
                        obj.date=format(obj.createdAt)

                        return(
                            
                 
                <div className="feed">
                    <div className="head">
                        <div className="user">
                            <div className="profile-photo">
                                <img src={me} alt="" />
                            </div>
                            <div className="ingo">
                                <h3>{obj.userId}</h3>
                                <small>Dubai, {obj.date}</small>
                            </div>
                            
                        </div>
                        <span className='edit'>
                                <i className='uil uil-ellipsis-h'></i>
                            </span>
                    </div>
                
                    <div className="photo">
                 
                     { obj.img ?  <img src={PF + obj.img}  alt="" />:obj.desc }
                    </div> 

                    
                     
                    <div className="action-buttons">
                        <div className="interaction-buttons">

                        <span> <i className='uil uil-heart'></i></span>
                        <span> <i className='uil uil-comment-dots'></i></span>
                        <span> <i className='uil uil-share-alt'></i></span>

                        </div>
                        <div className="bookmar">
                        <span> <i className='uil uil-bookmark-full'></i></span>

                        </div>
                    </div>
                    <div className="liked-by">
                        <span> <img src={me} alt="" /> </span>
                        <span> <img src={me} alt="" /> </span>
                        <span> <img src={me} alt="" /> </span>
                        <p>Liked by <b>Lionel Messi</b> and <b>2,323 others</b> </p>

                    </div>
                    <div className="caption">
                       {obj.img && <p> <b></b>{obj.desc}<span className='harsh-tag'></span> </p>}
                    </div>
                    <div className=" comments text-muted">View all 277 comments</div>
            
           
                
                </div>
                       )
                    })
                }



{/*  */}
{/* <div className="feed">
                    <div className="head">
                        <div className="user">
                            <div className="profile-photo">
                                <img src={me} alt="" />
                            </div>
                            <div className="ingo">
                                <h3>Jennifer lawrence</h3>
                                <small>Dubai, 15 MINUTES AGO</small>
                            </div>
                            
                        </div>
                        <span className='edit'>
                                <i className='uil uil-ellipsis-h'></i>
                            </span>
                    </div>
                    <div className="photo">
                       <img src={ee} alt="" /> 
                    </div>
                    <div className="action-buttons">
                        <div className="interaction-buttons">

                        <span> <i className='uil uil-heart'></i></span>
                        <span> <i className='uil uil-comment-dots'></i></span>
                        <span> <i className='uil uil-share-alt'></i></span>

                        </div>
                        <div className="bookmar">
                        <span> <i className='uil uil-bookmark-full'></i></span>

                        </div>
                    </div>
                    <div className="liked-by">
                        <span> <img src={me} alt="" /> </span>
                        <span> <img src={me} alt="" /> </span>
                        <span> <img src={me} alt="" /> </span>
                        <p>Liked by <b>Lionel Messi</b> and <b>2,323 others</b> </p>

                    </div>
                    <div className="caption">
                        <p> <b>Ronaldo</b> Hey whatsaap guys....! <span className='harsh-tag'>#lifestyle</span> </p>
                    </div>
                    <div className=" comments text-muted">View all 277 comments</div>
                </div> */}
            </div>

   </div>

  
  )
}

export default Feed