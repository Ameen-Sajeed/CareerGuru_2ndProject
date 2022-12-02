import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import "./Profile.css";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';


function FriendProfile() {
    const userData = useSelector((state) => state.user);
    const userId = userData._id;
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState("");
    const [det, Setdet] = useState([]);
    const [check, SetCheck] = useState(false);

  
    const username = useParams().username;

    const data = username;

    useEffect(() => {
        axios.get(`http://localhost:5000/users?username=${data}`).then((res) => {
          console.log(res, "yuyuyu");
          setUser(res.data);
    
          axios.get(`http://localhost:5000/profile/${res.data._id}`).then((res) => {
            console.log(res.data, "post kittyyyyyyyyyyyyyyyyyy");
            Setdet(res.data);
          });
        });
      }, [username]);

      /* -------------------------------------------------------------------------- */
  /*                                FOLLOW USERS                                */
  /* -------------------------------------------------------------------------- */

  const handleSubmit = async (id) => {
    await axios
      .put(`http://localhost:5000/follow/${userId}`, { id })
      .then((result) => {
        if (result.status === 200) {
          SetCheck(!check);
          console.log(result, "success");
        } else {
          console.log("Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
        console.log("erorr ocurred");
      });
  };
  /* -------------------------------------------------------------------------- */
  /*                               UNFOLLOW USERS                               */
  /* -------------------------------------------------------------------------- */
  const handleSubmitUndo = async (id) => {
    console.log("call");
    console.log(userData._id);
    console.log(id);
    await axios
      .put(`http://localhost:5000/unfollow/${userId}`, { id })
      .then((result) => {
        if (result.status === 200) {
          SetCheck(!check);
          console.log(result, "success");
        } else {
          console.log("Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
        console.log("erorr ocurred");
      });
  };

  return (
    <main class="bg-gray-100 bg-opacity-25 ">
    <div class="lg:w-8/12 lg:mx-auto mb-8">
      <header class="flex flex-wrap items-center p-4 md:py-8">
        <div class="md:w-3/12 md:ml-16">
          <img
            class="w-20 h-20 md:w-40 md:h-40 object-cover rounded-full
                     border-2 border-pink-600 p-1"
            src={PF + user?.profilePicture}
            alt="profile"
          />
        </div>

        <div class="w-8/12 md:w-7/12 ml-4">
          <div class="md:flex md:flex-wrap md:items-center mb-4">
            
              <h2 class="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">
                {username}
              </h2>
            {/* <span class="inline-block fas fa-certificate fa-lg text-blue-500 
                               relative mr-6 text-xl transform -translate-y-2" aria-hidden="true">
            <i class="fas fa-check text-white text-xs absolute inset-x-0
                               ml-1 mt-px"></i>
          </span> */}
          
           
              <a
                href="#"
                class="bg-blue-500 px-2 py-1 
            text-white font-semibold text-sm rounded block text-center 
            sm:inline-block"
              >
                Follow
              </a>
          
            {/*     
            <a href="#" class="bg-blue-500 px-2 py-1 
                        text-white font-semibold text-sm rounded block text-center 
                        sm:inline-block" ></a>  */}
          </div>

          <ul class="hidden md:flex space-x-8 mb-4">
            <li>
            
                <span class="font-semibold">{det?.length}</span>
              post
            </li>

            <li>
              <span class="font-semibold">{user?.followers?.length}</span>
              followers
            </li>
            <li>
              <span class="font-semibold">
                {user?.followings?.length}
              </span>
              following
            </li>
          </ul>

          <div class="hidden md:block">
          
              <h1 class="font-semibold">{user?.email}</h1>
            <span>{user?.bio}</span>
          </div>
        </div>

        <div class="md:hidden text-sm my-2">
          <h1 class="font-semibold">Mr Travlerrr...</h1>
          <span>Travel, Nature and Music</span>
          <p>Lorem ipsum dolor sit amet consectetur</p>
        </div>
      </header>

      <div class="px-px md:px-3">
        <ul
          class="flex md:hidden justify-around space-x-8 border-t 
                text-center p-2 text-gray-600 leading-snug text-sm"
        >
          <li>
            <span class="font-semibold text-gray-800 block">136</span>
            posts
          </li>

          <li>
            <span class="font-semibold text-gray-800 block">40.5k</span>
            followers
          </li>
          <li>
            <span class="font-semibold text-gray-800 block">302</span>
            following
          </li>
        </ul>

        <ul
          class="flex items-center justify-around md:justify-center space-x-12  
                    uppercase tracking-widest font-semibold text-xs text-gray-600
                    border-t"
        >
          {/* <li class="md:border-t md:border-gray-700 md:-mt-px md:text-gray-700">
          <a class="inline-block p-3" href="#">
            <i class="fas fa-th-large text-xl md:text-xs"></i>
            <span class="hidden md:inline">post</span>
          </a>
        </li> */}
          <li>
            <a class="inline-block p-3" href="#">
              <i class="far fa-square text-xl md:text-xs"></i>
              <span class="hidden md:inline">Posts</span>
            </a>
          </li>
          {/* <li>
          <a class="inline-block p-3" href="#">
            <i class="fas fa-user border border-gray-500
                             px-1 pt-1 rounded text-xl md:text-xs"></i>
            <span class="hidden md:inline">tagged</span>
          </a>
        </li> */}
        </ul>

     
          <>
            {det.length !== 0 ? (
              <div class="flex flex-wrap -mx-px md:-mx-3">
                {det.map((obj) => {
                  return (
                    <div class="w-1/3 p-px md:px-3">
                      <a href="#">
                        <article class="post bg-gray-100 text-white relative pb-full md:mb-6">
                          <img
                            class="w-full h-full absolute left-0 top-0 object-cover"
                            src={PF + obj.image}
                            alt="image"
                          />

                          <i class="fas fa-square absolute right-0 top-0 m-1"></i>
                          <div
                            class="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute 
                                left-0 top-0 hidden"
                          >
                            <div
                              class="flex justify-center items-center 
                                    space-x-4 h-full"
                            >
                              <span class="p-2">
                                 <ThumbUpIcon/> {obj?.likes?.length}    
                              </span>

                              {/* <span class="p-2">
                                <i class="fas fa-comment"></i>
                                2,909
                              </span> */}
                            </div>
                          </div>
                        </article>
                      </a>
                    </div>
                  );
                })}
              </div>
            ) : (
              <h1 className="text-5xl p-2 text-center font-extrabold text-blue-300">
                No posts Available
              </h1>
            )}
          </>
      </div>
    </div>
  </main>
  )
}

export default FriendProfile