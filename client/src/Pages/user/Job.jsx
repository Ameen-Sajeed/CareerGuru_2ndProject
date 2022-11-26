import Feed from "../../Components/FeedUtils/Feed";
import Header from "../../Components/FeedUtils/Header";
import Leftbar from "../../Components/FeedUtils/Leftbar";
import Rightbar from "../../Components/FeedUtils/Rightbar";
import "../../Components/FeedUtils/Header.css";
import JobFeed from "../../Components/User/NavUtils/Jobfeed/Jobfeed";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Jobpg() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("usertoken");
    console.log(token, "hy there");
    if (!token) {
      navigate("/login");
    }
  });

  return (
    <div className="bd">
      <Header />
      <main>
        <div className="container flex">
          <Leftbar />
          <JobFeed />
          <Rightbar />
        </div>
      </main>
    </div>
  );
}

export default Jobpg;
