import React, { useEffect, useRef, useState } from "react";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import FeedIcon from "@mui/icons-material/Feed";
import WorkIcon from "@mui/icons-material/Work";
import NotificationsIcon from "@mui/icons-material/Notifications";
import "./Chat.css";
import { userChats } from "../../../../API/ChatRequests";
import { useSelector } from "react-redux";
import Conversation from "./Conversation";
import { Link } from "react-router-dom";
import ChatBox from "./ChatBox";
import { io } from "socket.io-client";
import userinstance from "../../../../axios";
import { useContext } from "react";
import { SocketContext } from "../../../../Store/user/SocketContext";
function Chat() {
  const user = useSelector((state) => state.user);
  const [chats, setChats] = useState([]);
  const [searchModal, SetsearchModal] = useState(false);
  const [searchdata, SetsearchData] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [recieveMessage, setRecieveMessage] = useState(null);
  const socket = useContext(SocketContext)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // const socket = useRef();

  /* ---------------------- send message to socket server --------------------- */

  useEffect(() => {
    if (sendMessage !== null) {
      socket.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    // socket.current = io("http://localhost:8800");
    socket.emit("new-user-add", user._id);
    socket.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  /* -------------------- recieve message to socket server -------------------- */

  useEffect(() => {
    socket.on("recieve-message", (data) => {
      setRecieveMessage(data);
    });
  }, []);

  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user._id]);

  /* ------------------------------ ONLINE STATUS ----------------------------- */

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  /* -------------------------- SERCH USERS FOR CHAT -------------------------- */

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
        .get(`http://localhost:5000/search/users/${SearchInfo}`)
        .then((response) => {
          console.log(response.data.data);
          SetsearchData(response.data.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  /* ------------------------------- CREATE CHAT ------------------------------ */

  const createChat = async (Id) => {
    try {
      await userinstance
        .post("http://localhost:5000/createChat", {
          senderId: user._id,
          recieverId: Id,
        })
        .then((response) => {
          console.log(response);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div class="h-screen chatscreen p-24">
      <section class=" shadow-xl rounded-md w-full lg:w-11/12 lg:mx-auto flex">
        {/* <!-- Left section --> */}
        <div class="w-full md:w-3/6 lg:w-3/6 xl:w-3/6 flex flex-col justify-start items-stretch  bg-white bg-opacity-80 rounded-md lg:rounded-none lg:rounded-l-md p-3">
          <div class="flex flex-row justify-between items-center mb-4">
            {/* <div class="flex flex-row">
              <button class="bg-red-500 text-white rounded-full p-1 mr-2 cursor-pointer h-4 w-4 focus:outline-none focus:ring" aria-label="Close">
              </button>
              <button class="bg-yellow-500 text-white rounded-full p-1 mr-2 cursor-pointer h-4 w-4 focus:outline-none focus:ring" aria-label="Restore Down">
              </button>
              <button class="bg-green-500 text-white rounded-full p-1 mr-5 cursor-pointer h-4 w-4 focus:outline-none focus:ring" aria-label="Minimize">
              </button>
            </div> */}
            <div class="p-1 rounded-full text-gray-500">
              <button
                class="flex flex-col justify-center items-center p-2 rounded-full focus:ring-2 hover:bg-gray-50 hover:bg-opacity-30 focus:outline-none"
                aria-label="Add"
              >
                <svg class="fill-current h-4 w-4" viewBox="0 0 25 25">
                  <path d="M11 11v-11h1v11h11v1h-11v11h-1v-11h-11v-1h11z" />
                </svg>
              </button>
            </div>
          </div>
          <div class="flex-auto flex flex-col">
            <div class="flex-auto flex flex-row">
              <div class="p-1 flex flex-col justify-between items-center">
                <div class="">
                  <ul class="">
                    <Link to="/feed">
                      <li class="p-2 text-gray-900 cursor-pointer a">
                        <FeedIcon />
                        <p class="text-xs font-semibold">Feed</p>
                      </li>
                    </Link>
                    <Link to="/network">
                      {" "}
                      <li class="p-2 text-gray-900 cursor-pointer">
                        <SupervisorAccountIcon />
                        <p class="text-xs font-semibold">Network</p>
                      </li>
                    </Link>
                    <Link to="/job">
                      <li class="p-2 text-gray-900 cursor-pointer">
                        <WorkIcon />
                        <p class="text-xs font-semibold">Jobs</p>
                      </li>{" "}
                    </Link>
                    <li class="p-2 text-gray-900 cursor-pointer">
                      <NotificationsIcon />
                      <p class="text-xs font-semibold ">Notifications</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="w-full p-1">
                <div class="w-full p-1">
                  <input
                    type="text"
                    placeholder="Search"
                    class="search-input bg-gray-600 bg-opacity-10 placeholder-gray-500 text-gray-400 text-sm py-1 px-10 rounded-md outline-none w-full focus:outline-none focus:ring"
                    onChange={SearchUsers}
                  />
                  <h2 className="text-2xl font-bold text-center">Chats</h2>
                </div>
                <div className="">
                  <ul class="min-w-full h-96  overflow-y-scroll messagelist">
                    {chats.map((chat) => (
                      <li onClick={() => setCurrentChat(chat)}>
                        <Conversation
                          data={chat}
                          currentUserId={user._id}
                          online={checkOnlineStatus(chat)}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Middle section --> */}

        <ChatBox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          recieveMessage={recieveMessage}
        />
      </section>
      {searchModal ? (
        <>
          <div className="pt-48  justify-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 ">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col min-w-[200px] bg-gray-100   ">
                {/*body*/}
                {searchdata.map((obj) => {
                  return (
                    <div className="">
                      <div className="p-4 flex justify-evenly items-center w-full border-8 border-sky-500">
                        <img
                          className="w-10 h-10 rounded-full cursor-pointer "
                          onClick={(e) => {
                            createChat(obj._id);
                          }}
                          src={PF + obj.profilePicture}
                        ></img>
                        <div>
                          <h2 className="font-bold">{obj.username}</h2>
                        </div>
                        {/* <div>
                          <span className="text-xs">{obj.bio}</span>
                        </div> */}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Chat;
