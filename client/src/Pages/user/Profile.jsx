import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/FeedUtils/Header";
import Profile from "../../Components/User/NavUtils/Profile";

function ProfilePage() {
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
        <Profile />
      </div>
    </div>
  );
}

export default ProfilePage;
