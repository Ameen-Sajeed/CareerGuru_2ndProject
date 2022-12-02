import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/FeedUtils/Header";
import FriendProfile from "../../Components/User/NavUtils/friendProfile";

function FriendProfilePage() {
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
      <div className="">
        <FriendProfile />
      </div>
    </div>
  );
}

export default FriendProfilePage;
