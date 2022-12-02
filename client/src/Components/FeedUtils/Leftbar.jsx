import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import StreetviewIcon from "@mui/icons-material/Streetview";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import WorkIcon from "@mui/icons-material/Work";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

function Leftbar() {
  const SidebarData = [
    {
      title: "Home",
      icon: <HomeIcon />,
      link: "/feed",
    },
    {
      title: "Network",
      icon: <GroupIcon />,
      link: "/network",
    },

    {
      title: "Jobs",
      icon: <WorkIcon />,
      link: "/job",
    },
    {
      title: "JobRequests",
      icon: <StreetviewIcon />,
      link: "/Jobrequests",
    },
    {
      title: "Chat",
      icon: <ChatBubbleIcon />,
      link: "/chat",
    },
    {
      title: "Notifications",
      icon: <DynamicFeedIcon />,
      link: "/feed1",
    },
  ];

  const Navigate = useNavigate();

  const userData = useSelector((state) => state.user);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  // console.log(userData,"hkjhkjh")

  function check() {
    console.log("hey there");
    if (userData.status === "inactive") {
      Navigate("/login");
    }
  }
  check();

  return (
    <div className="left ">
      <a className="profile">
        <div className="profile-photo">
          <img src={PF + userData.profilePicture} alt="" />
        </div>
        <div className="handle">
          <h4>{userData.username}</h4>
          <p className="text-muted">@{userData.username}</p>
        </div>
      </a>

      <div className="sideleft  ">
        {SidebarData.map((obj, key) => {
          return (
            <a
              className="menu-item activ"
              id={window.location.pathname == obj.link ? "active" : ""}
              key={key}
              onClick={() => (window.location.pathname = obj.link)}
            >
              <span>
                <i>{obj.icon}</i>
              </span>
              <h3>{obj.title}</h3>
            </a>
          );
        })}

        {/* <a className='menu-item' id='notifications'>
                <span><i className='uil uil-bell'><small className='notification-count'>9+</small></i></span><h3>Notifications</h3>

                <div className="notifications-popup" id=''>
                    <div>
                       <div className="profile-photo">
                        <img src={me} alt="" />
                        </div>

                        <div className="notifications-body">
                            <b>Sita ram</b> accepted your follow request
                            <small className='text-muted'>2 days ago</small>
                        </div> 
                    </div>
                    <div>
                       <div className="profile-photo">
                        <img src={me} alt="" />
                        </div>

                        <div className="notifications-body">
                            <b>Tanvi ram</b> accepted your follow request
                            <small className='text-muted'>2 days ago</small>
                        </div> 
                    </div>
                    <div>
                       <div className="profile-photo">
                        <img src={me} alt="" />
                        </div>

                        <div className="notifications-body">
                            <b>Jeena ram</b> accepted your follow request
                            <small className='text-muted'>2 days ago</small>
                        </div> 
                    </div>
                    
                </div>
            
                </a> */}
      </div>
    </div>
  );
}

export default Leftbar;
