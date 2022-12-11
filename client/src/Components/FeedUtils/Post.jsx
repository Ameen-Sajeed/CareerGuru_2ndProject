import React, { useContext, useEffect, useState } from "react";
import me from "../../assets/images/me.jpg";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { format } from "timeago.js";
import "./Header.css";
import axios from "axios";
import { useSelector } from "react-redux";
import met from "../../assets/images/us.webp";
import DeleteIcon from "@mui/icons-material/Delete";
import FlagIcon from "@mui/icons-material/Flag";
import { DeletePost } from "../../API/Posts";
import userinstance from "../../axios";
import { SocketContext } from "../../Store/user/SocketContext";
import { Link } from "react-router-dom";
function Post({ post,setChange }) {
  const userData = useSelector((state) => state.user);
  const userId = userData._id;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const [isLiked, SetIsliked] = useState(false);
  const [like, setLike] = useState(post.likes.length);
  const [comments, Setcomments] = useState(false);
  const [desc, setDesc] = useState("");
  const [seeComments, SetSeecomments] = useState([]);
  const [updateComment, SetUpdateComment] = useState([]);
  const [open, setOpen] = useState(false);
  const [showMOd, SetShowMod] = useState(false);
  const socket = useContext(SocketContext)

  const [report, setReport] = useState({
    userId: "",
    Content: "",
  });

  const handleChange = (e) => {
    console.log("handlechange ann");
    const { name, value } = e.target;
    setReport({
      ...report,
      [name]: value,
      userId: userId,
      postId: post._id,
    });
    console.log(report);
    console.log(e.target.value, "drtfgyhj");
    console.log(userId, "hhhhhurhuh");
  };

  const handleSubmit = async (e) => {
    console.log(userId, "hhhhhurhuh");
    // e.preventDefault();
    setReport({
      ...report,
    });

    try {
      userinstance
        .post(`http://localhost:5000/reportPost/${post._id}`, { ...report })
        .then((response) => {
          console.log(response);
          setChange(Date.now())
        });
    } catch (error) {}
  };

  useEffect(() => {
    SetIsliked(post.likes.includes(userId));
  }, [userId, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await userinstance.get(
        `http://localhost:5000/users?userId=${post.userId}`
      );

      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = async () => {
    try {
      let res = await userinstance.put(
        `http://localhost:5000/post/like/${post._id} `,
        { userId: userId }
      );
      console.log(res);
      setLike(isLiked ? like - 1 : like + 1);
      SetIsliked(!isLiked);

    
console.log(post.userId,"posssss");

      if(post.userId !== userId){
        socket.emit('send-notifications',{
 
          senderId:userId,
          recieverId:post.userId,
          desc:"liked your Post" 
      })
    }
 
    } catch (err) {}
  };


  const handleComment = async (e) => {
    e.preventDefault();
    const res = await userinstance.post(
      `http://localhost:5000/addcomment/${post._id}`,
      { userId: userId, comment: desc, postId: post._id ,postuserId:post.userId}
    );
    if (res.data) {
      SetUpdateComment(!updateComment);
    }

    setDesc("");
  };

  useEffect(() => {
    const fetchComments = async () => {
      let res = await userinstance.get(
        `http://localhost:5000/getcomments/${post._id}`
      );
      SetSeecomments(res.data);
      console.log("update on effect cccoommmeennt");
    };
    fetchComments();
  }, [comments, updateComment]);

  const deletepost = async (e) => {
    e.preventDefault()
    setChange(Date.now())
    await DeletePost(post._id);
  };

  return (
    <div>
      <div className="feed">
        <div className="head">
          <div className="user">
            <div className="profile-photo">
            <Link to={`/profile/${user.username}`}><img src={PF + user.profilePicture} alt="" /></Link>
            </div>
            <div className="ingo">
              <h3>{user.username}</h3>
              <small>Dubai, {format(post.createdAt)}</small>
            </div>
          </div>
          <span className="edit">
            <i
              className="uil uil-ellipsis-h cursor-pointer"
              onClick={(e) => {
                setOpen(!open);
              }}
            ></i>
          </span>

          {open && (
            <div class="absolute right-0 z-20 w-22  py-2  overflow-hidden bg-white rounded-md shadow-xl dark:bg-blue-100 mr-80 m-4">
              {post.userId === userData._id ? (
                <a
                  href=""
                  class="block px-2 py-1 text-sm text-gray-600 capitalize font-extrabold  transition-colors duration-200 transform dark:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={deletepost}
                >
                  <DeleteIcon />
                  Delete
                </a>
              ) : (
                <a
                  href="#"
                  class="block px-2 py-1   text-sm text-gray-600 capitalize  font-extrabold transition-colors duration-200 transform dark:text-gray-900 hover:bg-gray-100 dark:hover:bg-blue-700 dark:hover:text-white"
                  onClick={() => SetShowMod(true)}
                >
                  {" "}
                  <FlagIcon />
                  Report Post
                </a>
              )}
            </div>
          )}
        </div>

        <div className="photo">
          <p className="text-lg font-light"> {post.desc}</p>
          <img src={PF + post.image} alt="" />
        </div>
        {/* <div className="photo">
                      {post.image ?  <img src={PF+post.image} alt="" /> : <p> {post.desc}</p> }
                    </div> */}

        <div className="action-buttons">
          <div className="interaction-buttons">
            {/* <span> <i className='uil uil-heart'></i></span> */}
            <span onClick={likeHandler}>
              {" "}
              {isLiked ? (
                <ThumbUpIcon style={{ color: "#003399" }} />
              ) : (
                <ThumbUpIcon />
              )}{" "}
            </span>
            <span>
              {" "}
              <i
                className="uil uil-comment-dots"
                onClick={() => {
                  Setcomments(!comments);
                }}
              ></i>
            </span>
            <span>
              {" "}
              <i className="uil uil-share-alt"></i>
            </span>
          </div>
          <div className="bookmar">
            <span>
              {" "}
              <i className="uil uil-bookmark-full"></i>
            </span>
          </div>
        </div>
        <div className="liked-by">
          <span>
            {" "}
            <img src={me} alt="" />{" "}
          </span>
          <p>
            {" "}
            <b>{like}</b> Likes <b></b>{" "}
          </p>
        </div>
        <div className="caption">
          {post.image ? (
            <p>
              {" "}
              <b className="p-2">{user.username}</b>
              <span className="harsh-tag"></span>{" "}
            </p>
          ) : null}
        </div>
        <div class="max-w-lg shadow-md">
          {comments
            ? seeComments.map((obj) => {
                return (
                  <div className="flex gap-3 my-2 items-center">
                    <div>
                      <img
                        className="w-8 rounded-full"
                        src={met}
                        alt="profile"
                      />
                    </div>
                    <div>
                      <div>
                        <span className="font-medium text-sm mr-2">
                          {obj.userId.username}
                        </span>
                        <span className="">{obj.comment}</span>
                      </div>
                      <p className="text-slate-500 text-xs ">
                        {format(obj.createdAt)}
                      </p>
                    </div>
                  </div>
                );
              })
            : null}
          {comments ? (
            <form action="" class="w-full p-4">
              <label class="block mb-2">
                <textarea
                  class="block w-full mt-1 rounded"
                  rows="3"
                  value={desc}
                  placeholder="Post a Comment"
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
                  mult
                ></textarea>
              </label>
              <button
                disabled={!desc}
                class="px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded"
                onClick={handleComment}
              >
                Comment
              </button>
            </form>
          ) : null}
        </div>
      </div>

      {showMOd ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xl font-semibold">
                    Why are you Reporting this?
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => SetShowMod(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="flex">
                  <input
                    type="radio"
                    className="m-2"
                    name="Content"
                    value="Violation of someone's privacy"
                    onChange={handleChange}
                  />
                  <label htmlFor="" className="p-2">
                    Violation of someone's privacy
                  </label>
                </div>
                <div className="flex">
                  <input
                    type="radio"
                    className="m-2"
                    name="Content"
                    value="Public shaming"
                    onChange={handleChange}
                  />
                  <label htmlFor="" className="p-2">
                    Public shaming
                  </label>
                </div>
                <div className="flex">
                  <input
                    type="radio"
                    className="m-2"
                    name="Content"
                    value="Goes against my beliefs, values or politics"
                    onChange={handleChange}
                  />
                  <label htmlFor="" className="p-2">
                    Goes against my beliefs, values or politics
                  </label>
                </div>
                <div className="flex">
                  <input
                    type="radio"
                    className="m-2"
                    name="Content"
                    value="Supporting or promoting a hate group"
                    onChange={handleChange}
                  />
                  <label htmlFor="" className="p-2">
                    Supporting or promoting a hate group
                  </label>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => SetShowMod(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}

export default Post;
