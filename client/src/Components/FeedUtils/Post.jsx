import React, { useEffect, useState } from 'react'
import me from '../../assets/images/me.jpg'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import {format} from 'timeago.js'
import './Header.css'
import axios from 'axios';
import { useSelector } from 'react-redux'
import met from '../../assets/images/us.webp'
function Post({post}) {  
    const userData = useSelector((state=>state.user))
    const  userId = userData._id
    const PF =process.env.REACT_APP_PUBLIC_FOLDER;
    const [user,setUser]=useState({})
    const [isLiked,SetIsliked]=useState(false);
    const [like,setLike]=useState(post.likes.length)
    const [comments,Setcomments]=useState(false)
    const [desc,setDesc]=useState('')
    const [seeComments,SetSeecomments]=useState([])
    const [updateComment,SetUpdateComment]=useState([])


// console.log(props,"qwertnnnnnnnnnn");
useEffect(() => {
  SetIsliked(post.likes.includes(userId));
}, [userId, post.likes]);

useEffect(() => {
    const fetchUser = async () => {
     
      const res = await axios.get(`http://localhost:5000/users?userId=${post.userId}`);
      // console.log(res,"rrrrrrtyghbh");
      
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = async() => {
    // console.log("piopppjjjjjjjjj",post._id);
    // console.log("piopppjjjjjjjjj",userId);
    try {
      let res=await axios.put(`http://localhost:5000/post/like/${post._id} `,{ userId: userId});
      console.log(res);
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    SetIsliked(!isLiked);
  };

  // console.log(user,"uiiu");

  const handleComment=async(e)=>{
    // console.log(userId);
    // console.log(post._id);
     e.preventDefault()
     Setcomments(!comments)

     const res=await axios.post(`http://localhost:5000/addcomment/${post._id}`,{userId:userId,comment:desc,postId:post._id})
     if(res.data){
      window.location.reload()
      SetUpdateComment(!updateComment)
     }
  }
  useEffect(() => {
       const fetchComments = async ()=>{
          let res = await axios.get(`http://localhost:5000/getcomments/${post._id}`)

          SetSeecomments(res.data)
          console.log('update on effect cccoommmeennt');
       }
       fetchComments()
 }, [comments,updateComment]);



  return (
    <div>
         <div className="feed">
                    <div className="head">
                        <div className="user">
                            <div className="profile-photo">
                                <img src={me} alt="" />
                            </div>
                            <div className="ingo">
                                <h3>{user.username}</h3>
                                <small>Dubai, {format(post.createdAt)}</small>
                            </div>
                            
                        </div>
                        <span className='edit'>
                                <i className='uil uil-ellipsis-h'></i>
                            </span>
                    </div>
                    <div className="photo">
                      {post.image ?  <img src={PF+post.image} alt="" /> : <h1> {post.description}</h1> }
                    </div>
                    <div className="action-buttons">
                        <div className="interaction-buttons">

                        {/* <span> <i className='uil uil-heart'></i></span> */}
                        <span onClick={likeHandler}> { isLiked ? <ThumbUpIcon style={{color:"#003399"}}/>:<ThumbUpIcon/>} </span> 
                        <span> <i className='uil uil-comment-dots' onClick={Setcomments} ></i></span>
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
                        <p> <b>{like}</b> Likes <b></b> </p>

                    </div>
                    <div className="caption">
                       {post.image ?<p> <b className='p-2'>{user.username}</b>{post.description}<span className='harsh-tag'></span> </p>:null}
                    </div>
                    <div class="max-w-lg shadow-md">


                    {   
       comments ?     seeComments.map((obj)=>{

             return(
         
              <div className="flex gap-3 my-2 items-center">
              <div>
                  <img className="w-8 rounded-full" src={met} alt="profile" />
              </div>
              <div>
               <div>
                  <span className="font-medium text-sm mr-2">{obj.userId.username}</span>
                  <span className="">{obj.comment}</span>
               </div>
               <p className="text-slate-500 text-xs ">{format(obj.createdAt) }</p>
              </div>
           </div>

               )
            })
          :null}
{
  comments ?

      <form action="" class="w-full p-4">
        <label class="block mb-2">
          <textarea class="block w-full mt-1 rounded" rows="3" placeholder='Post a Comment'   onChange={(e)=> {setDesc(e.target.value)}} mult></textarea>
        </label>
        <button disabled={!desc} class="px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded"onClick={handleComment} >Comment</button>
      </form>: null }

      
    </div>
                </div> 
    </div>
  )
}

export default Post