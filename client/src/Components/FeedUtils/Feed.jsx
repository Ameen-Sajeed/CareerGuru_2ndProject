import React, { useEffect, useState } from "react";
import "./Header.css";
import ImageIcon from "@mui/icons-material/Image";
import { useSelector } from "react-redux";
import Post from "./Post";
import { Link } from "react-router-dom";
import userinstance from "../../axios";
import axios from "axios";

function Feed({ socket }) {
  const userData = useSelector((state) => state.user);
  const userId = userData._id;
  const [Image, setImage] = useState("");
  const [work, SetWork] = useState([]);
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({
    User: "",
    desc: "",
    image: "",
  });

  /* -------------------------------------------------------------------------- */
  /*                      CREATE POSTS AND IMAGE UPLOADING                      */
  /* -------------------------------------------------------------------------- */

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
    });
    console.log(e.target.files, "opop");
  };

  const upload = (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let key in post) {
      formData.append(key, post[key]);
    }
    console.log(post);
    console.log("formData");

    axios
      .post("http://localhost:5000/createPost", formData)
      .then((response) => {
        if (response.data.status) {
          console.log("post added successfully");
        } else {
          console.log("something went wrong");
        }
      });
    setPost({ ...post, desc: "", image: "" });
  };

  /* -------------------------------------------------------------------------- */
  /*                             GET TIMELINE POSTS                             */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    const fetchPost = async () => {
      const res = await userinstance.get(
        `http://localhost:5000/post/timeline/${userId}`
      );
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPost();
  }, [userId]);

  useEffect(() => {
    try {
      userinstance.get("http://localhost:5000/job/getjob").then((response) => {
        SetWork(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [work]);

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

      <form className="create-post">
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
        />
        <br />
      </form>
      {post.image ? (
        <div className="profile-photo1 border-solid border-8 border-blue-300 m-2 ">
          <img src={Image} className="" />
        </div>
      ) : (
        ""
      )}

      <div className="feeds">
        {posts.map((obj) =>
          obj.Reports.includes(userId) ? null : (
            <Post key={obj.id} post={obj} socket={socket} />
          )
        )}
      </div>
    </div>
  );
}

export default Feed;
