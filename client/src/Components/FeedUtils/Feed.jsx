import React, { useEffect, useState } from 'react'
import './Header.css'
import me from '../../assets/images/me.jpg'
import axios from 'axios'
import ImageIcon from '@mui/icons-material/Image';
import { useSelector } from 'react-redux'
import Post from './Post'


function Feed() {

    const userData = useSelector((state=>state.user))
    const  userId = userData._id
    const [Image,setImage]=useState([])
    const [posts,setPosts]=useState([])
    const [post, setPost] = useState({
        User: '', Caption: '',
        image: ''
    })

/* -------------------------------------------------------------------------- */
/*                      CREATE POSTS AND IMAGE UPLOADING                      */
/* -------------------------------------------------------------------------- */


    const handleChange = (e)=>{
    console.log("handlechange ann");
    const { name, value } = e.target
    setPost({
        ...post,
        [name]: value,
    })
    console.log(post);
  }
    const fileUpload = (e)=>{
    setImage(URL.createObjectURL(e.target.files[0]))
    setPost({
        ...post,
        image: Array.prototype.slice.call(e.target.files),
        User: userId
    })
    console.log(e.target.files,"opop");
   
  }
    const  upload = ()=>{  
    const formData = new FormData()
    for(let key in post){
      formData.append(key, post[key])
    }
    // console.log("post");
    // console.log(post);
    // console.log("formData");
    // console.log(formData);
    axios.post('http://localhost:5000/createPost',formData).then((response)=>{
      if(response.data.status){
        // setShowPostModal(false)
        console.log("post added successfully");
      }else{
        // setShowPostModal(false)
        console.log("something went wrong");
      }
    })
  }





  /* -------------------------------------------------------------------------- */
  /*                             GET TIMELINE POSTS                             */
  /* -------------------------------------------------------------------------- */

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
   },[userId])

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

            <form className='create-post'>
                <div className="profile-photo">
                    <img src={me} alt="" />
                </div>
                <input className='imag' type="text" placeholder="What's on Your Mind,Amien?" name="Caption" id="create-post"   onChange={handleChange} />
                <label className='p-2 cursor-pointer text-blue-400' htmlFor="img-upload"> <ImageIcon  style={{fontSize:"30px"}} /></label>
        
                <input type="file" id="img-upload" className='hidden' name="image" onChange={fileUpload} multiple   />
                <input type="submit" value="Upload" className='btn btn-primary' onClick={upload} />
           
               
            </form>

          

            <div className="feeds">
                { 
                    posts.map((obj)=>(
                        
                                  <Post key={obj.id} post={obj}/>
                                
                      
                        )
                    )
                }


                            
          
         


            </div>

   </div>

  
  )
}

export default Feed