import React, { useContext, useEffect, useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import userinstance from "../../axios";
import { IoMdNotifications } from "react-icons/io";
import { format } from "timeago.js";
import { SocketContext } from "../../Store/user/SocketContext";

function Header() {
  const userData = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [searchModal, SetsearchModal] = useState(false);
  const [searchdata, SetsearchData] = useState([]);
  const [notify, setNotify] = useState([]);
  const [searchnotify, Setsearchnotify] = useState(false);
  const [counts, SetCounts] = useState("");
  const [change,Setchange]= useState()
  const socket = useContext(SocketContext)

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("usertoken");
    navigate("/login");
  };

  const SearchUsers = async (e) => {
    console.log("ytytyt");
    try {
      if (e.target.value.length > 0) {
        SetsearchModal(true);
      } else {
        SetsearchModal(false);
      }

      let SearchInfo = e.target.value;
      console.log(SearchInfo, "hey there");

      await userinstance
        .get(`/search/users/${SearchInfo}`)
        .then((response) => {
          console.log(response.data.data);
          SetsearchData(response.data.data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(()=>{
    if(userData){
      socket.emit('new-user-add',userData._id)
    }
  },[])


  useEffect(()=>{
    console.log("jangoooooooooooo");
    try {
      socket.on('getNotification',data=>{
        console.log("hey");
        Setchange(new Date())
      })
      
    } catch (error) {
      console.log(error,"vamoooooos");
      
    }
  },[socket])


  /* ------------------------------ NOTIFICATIONS ----------------------------- */

  useEffect(() => {
    const notificationHandler = async (e) => {
      // e.preventDefault();
      try {
        await userinstance
          .get(`/notifications/${userData._id}`)
          .then((response) => {
            console.log(response, "poyi");
            setNotify(response.data.data.notification);
            SetCounts(response.data.countLength);
          });
      } catch (error) {
        console.log(error);
      }
    };

    notificationHandler();
  }, [counts,change,socket]);

  /* -------------------------- VIEWED NOTIFICATIONS -------------------------- */

  const notificationhandle = async (e) => {
    Setsearchnotify(!searchnotify);
    try {
      const { data } = await userinstance.put(
        `/notification/viewed/${userData._id}`
      );
      SetCounts("0");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(counts, "ooooo");

  return (
    <nav>
      <div className="container">
        <Link to="/feed">
          {" "}
          <h2 className="log text-3xl font-extrabold text-blue-400">
            JobSeeker
          </h2>
        </Link>
        <div className="search-bar">
          <i className="uil uil-search"></i>
          <input type="search" placeholder="Search" onChange={SearchUsers} />
        </div>
        <div className="relative">
          <IoMdNotifications
            className="text-4xl text-blue-400 cursor-pointer "
            onClick={(e) => {
              notificationhandle(e);
            }}
          />{
            counts!=0 &&
      
          <span className="absolute top-0 right-0 rounded-full bg-red-500 h-5 w-5 items-center flex justify-center text-white font-bold">
            {counts}
          </span>}
        </div>

        <div className="create">
          {/* <label className='btn btn-primary' htmlFor="create-post" onClick={handleLogout}>Sign Out</label> */}
          {/* <div className="profile-photo">
       <Link to='/profile'><img className='cursor-pointer' src={me} alt="" /></Link> 
    </div> */}
          <div className="profile-photo">
            <img
              className="cursor-pointer"
              src={PF + userData.profilePicture}
              alt=""
              onClick={(e) => {
                setOpen(!open);
              }}
            />
          </div>

          {open && (
            <div class="absolute right-0 z-20 w-56 py-2  overflow-hidden bg-white rounded-md shadow-xl dark:bg-blue-200 mt-72 m-10">
              <a
                href="#"
                class="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <img
                  class="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9"
                  src="https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8d29tYW4lMjBibHVlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=face&w=500&q=200"
                  alt="jane avatar"
                />
                <div class="mx-1">
                  <h1 class="text-sm font-semibold text-gray-700 dark:text-gray-900">
                    {userData.username}
                  </h1>
                  <p class="text-sm text-gray-900 dark:text-gray-900 ">
                    {userData.email}
                  </p>
                </div>
              </a>

              <Link to="/profile">
                <a
                  href=""
                  class="block px-4 py-3 text-sm text-gray-600 capitalize font-extrabold  transition-colors duration-200 transform dark:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  view profile
                </a>
              </Link>

              <a
                href="#"
                class="block px-4 py-3 text-sm text-gray-600 capitalize  font-extrabold transition-colors duration-200 transform dark:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                onClick={handleLogout}
              >
                Sign Out
              </a>
            </div>
          )}
        </div>
      </div>
      {searchModal ? (
        <>
          <div className="p-10 mr-20 justify-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 ">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col min-w-[500px] bg-gray-100   ">
                {/*body*/}
                {searchdata.map((obj) => {
                  return (
                    <div className="">
                      <div className="p-4 flex justify-evenly  items-center w-full">
                        <Link to={`/profile/${obj.username}`}>
                          <img
                            className="w-10 h-10 rounded-full"
                            src={PF + obj.profilePicture}
                          ></img>
                        </Link>
                        <div>
                          <h2 className="font-bold">{obj.username}</h2>
                        </div>
                        <div>
                          <span className="text-xs">{obj.bio}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      ) : null}

      {searchnotify ? (
        <>
          <div class="absolute right-0 z-20 w-56 py-2   bg-white rounded-md shadow-xl dark:bg-blue-200 m-5 mr-52 overflow-y-auto max-h-44 no-scrollbar">
            {notify.length != 0 ? (
              notify.map((obj) => {
                return (
                  <a
                    href="#"
                    class="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-blue-300 dark:hover:text-white"
                  >
                    <img
                      class="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9"
                      src={PF + obj.user.profilePicture}
                      alt="jane avatar"
                    />
                    <div class="mx-1">
                      <h1 class="text-sm font-bold text-gray-700 dark:text-gray-900">
                        {obj.user.username}
                      </h1>
                      <p class="text-sm text-gray-900 dark:text-gray-900 ">
                        {obj.desc}
                      </p>
                      <span className="text-xs font-semibold text-gray-900">
                        {format(obj.time)}
                      </span>
                    </div>
                  </a>
                );
              })
            ) : (
              <p className="p-2 text-center font-bold">No notifications</p>
            )}
          </div>
        </>
      ) : null}
    </nav>
  );
}

export default Header;
