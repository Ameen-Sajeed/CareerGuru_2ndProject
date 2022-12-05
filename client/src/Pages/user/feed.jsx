import Feed from "../../Components/FeedUtils/Feed";
import Header from "../../Components/FeedUtils/Header";
import Leftbar from "../../Components/FeedUtils/Leftbar";
import Rightbar from "../../Components/FeedUtils/Rightbar";
import "../../Components/FeedUtils/Header.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {io} from 'socket.io-client'
import { useSelector } from "react-redux";

function Feedpg() {
  const navigate = useNavigate();
  const socket = useRef()
  const user  = useSelector((state) => state.user);

  useEffect(() => {
    const token = localStorage.getItem("usertoken");
    console.log(token, "hy there");
    if (!token) {
      navigate("/login");
    }
  });

useEffect(()=>{
  socket.current = io('http://localhost:8800');
  socket.current.emit('new-user-add',user._id)
},[socket,user])

  return (
    <div className="bd">
      <Header />
      <main>
        <div className="container flex">
          <Leftbar socket={socket} />
          <Feed socket={socket} />
          <Rightbar />
        </div>
      </main>
    </div>
  );
}

export default Feedpg;
