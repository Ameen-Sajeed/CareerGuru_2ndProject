import React, { useEffect, useState } from "react";
import "./Header.css";
import me from "../../assets/images/gg.webp";
import axios from "axios";
import ImageIcon from "@mui/icons-material/Image";
import { useSelector } from "react-redux";
import Post from "./Post";
import { Link } from "react-router-dom";
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
function Feed() {
  const userData = useSelector((state) => state.user);
  const userId = userData._id;
  const [Image, setImage] = useState('');
  const [work, SetWork] = useState([]);
  const [posts, setPosts] = useState([]);
  // const [desc, setDesc] = useState('')
  // const [imageFile, setImageFile] = useState('')
  // const [videoFile,setVideoFile]=useState('')
  const [post, setPost] = useState({
    User: "",
    desc: "",
    image: "",
  });

  /* -------------------------------------------------------------------------- */
  /*                      CREATE POSTS AND IMAGE UPLOADING                      */
  /* -------------------------------------------------------------------------- */
  // const submitHandler = async (e) => {
  //   e.preventDefault()
  //   const newPost = {
  //     userId: userId,
  //     desc: desc,
  //   }

  const handleChange = (e) => {
    console.log("handlechange ann");
    const { name, value } = e.target;
    setPost({
      ...post,
      [name]: value,
      User: userId,

    });

    console.log(post);
  };
  const fileUpload = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setPost({
      ...post,
      image: e.target.files[0],
      // video:e.target.files[0],
    });
    console.log(e.target.files, "opop");
  };


  const upload = (e) => {
    e.preventDefault()

  const formData = new FormData()
  for(let key in post){
    formData.append(key, post[key])
  }
    // console.log("post");   
    console.log(post);
    console.log("formData");
    axios
      .post("http://localhost:5000/createPost", formData)
      .then((response) => {
        if (response.data.status) {
          // setShowPostModal(false)
          console.log("post added successfully");
        } else {
          // setShowPostModal(false)
          console.log("something went wrong");
        }
      });
      setPost({...post,desc:"",image:""})
  };

//   if (imageFile) {
//     const data = new FormData();
//     const fileName = imageFile.name
//     data.append("file", imageFile)
//     data.append("name", fileName)
//     newPost.image = fileName
//     try {
//       await axios.post('http://localhost:5000/post/upload', data)


//     } catch (error) {
//       console.log(error);
//     }
//   }
//   if (videoFile) {
//     const data = new FormData();
//     const fileName = videoFile.name
//     data.append("file",videoFile)
//     data.append("name", fileName)
//     newPost.video = fileName
//     try {
//       await axios.post('http://localhost:5000/post/upload', data)


//     } catch (error) {
//       console.log(error);
//     }
//   }
//   try {
//     await axios.post('http://localhost:5000/Createpost', newPost)
//     window.location.reload()
//   } catch (err) {
//     console.log(err);
//   }
// }

  /* -------------------------------------------------------------------------- */
  /*                             GET TIMELINE POSTS                             */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(
        `http://localhost:5000/post/timeline/${userId}`
      );
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPost();
  }, [userId,posts]);

  useEffect(() => {
    try {
      axios.get("http://localhost:5000/job/getjob").then((response) => {
        // console.log(response,"ghjkl");
        SetWork(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [work]);

  //   console.log(work,"hjhjhj");

  return (
    <div className="middle">
      <p className="text-gray-500 font-light text-xl p-2 ">Suggested Jobs</p>
      <div className="stories">
        {work.map((obj) => {
          return (
            <div className="story">
              <Link to="/job">
                {" "}
                <div className="profile-photno cursor-pointer">
                  {/* <img className='cursor-pointer' src={me} alt="" /> */}
                </div>
              </Link>
              <p className="name">{obj.Designation}</p>
            </div>
          );
        })}
      </div>

      <form className="create-post" >
       
        <input
          className="imag"
          type="text"
          placeholder="What's on Your Mind,Amien?"
          name="desc" 
          value={post.desc}
          id="create-post"
          onChange={handleChange}
        />
        <label
          className="p-2 cursor-pointer text-blue-400"
          htmlFor="img-upload"
        >
          {" "}
          <ImageIcon style={{ fontSize: "30px" }} />
        </label>
        {/* <label
          className="p-2 cursor-pointer text-yellow-400"
          htmlFor="Video-upload"
        >
          {" "}
          <VideoCameraBackIcon style={{ fontSize: "30px" }} />
        </label>
        */}

        <input
          type="file"
          id="img-upload"
          className="hidden"
          name="image"
          onChange={fileUpload}
          

        />
    

          <input
          type="file"
          id="Video-upload"
          className="hidden"
          name="video"
          onChange={fileUpload}
        />

        <input
          type="submit"
          value="post"
          className="btn btn-primary"
          onClick={upload}
        /><br/>
   

      </form>
      {
        post.image? 
      
      <div className="profile-photo1 border-solid border-8 border-blue-300 m-2 " >
          <img src={Image} className="" /> 
        </div>: ""}

      <div className="feeds">
        {posts.map((obj) => (
          obj.Reports.includes(userId) ? null
          :<Post key={obj.id} post={obj} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
