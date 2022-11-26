import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/FeedUtils/Header";
import Chat from "../../Components/User/NavUtils/Chat/Chat";

function ChatPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("usertoken");
    console.log(token, "hy there");
    if (!token) {
      navigate("/login");
    }
  });

  return (
    <div>
      <Header />
      <Chat />
    </div>
  );
}

export default ChatPage;
