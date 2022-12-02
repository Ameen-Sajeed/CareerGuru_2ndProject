import React, { useEffect, useState } from "react";
import "./Header.css";
import me from "../../assets/images/us.webp";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import userinstance from "../../axios";

function Rightbar() {
  const userData = useSelector((state) => state.user);
  const userId = userData._id;
  const [forms, setForms] = useState([]);

  useEffect(() => {
    userinstance
      .get(`http://localhost:5000/closefriends/${userId}`)
      .then((response) => {
        if (response.data) {
          // console.log(token);
          setForms(response.data);
        } else {
          console.log("erorr");
        }
      })
      .catch((error) => {
        console.log(error, "erorr ocurred");
      });
  }, [userId]);

  console.log(userId, "opopopo");
  console.log(forms, "fghjk");

  return (
    <div className="right">
      <div className="messages">
        <div className="heading">
          <h4> Messages </h4>
          <i className="uil uil-edit"></i>
        </div>

        {/* SEARCH BAR */}
        <div className="search-bar">
          <i className="uil uil-search"></i>
          <input
            type="search"
            placeholder="Search messages"
            id="message-search"
          />
        </div>

        {/* MESSAGES CATEGORY */}

        <div className="category">
          <h6 className="active">Primary</h6>
          <h6>General</h6>
          <h6 className="messages-requests">Requests(7)</h6>
        </div>

        {/* MESSAGE */}

        <div className="message">
          <div className="profile-photo">
            <img src={me} alt="" />
          </div>
          <div className="message-body">
            <h5>Paul Dybala</h5>
            <p className="text-muted">Evde Muthey!</p>
          </div>
        </div>
      </div>

      {/* END OF MESSAGES */}

      {/* FRIEND REQUESTS */}

      <div className="friend-requests">
        <h4>Close Friends</h4>

        {forms.map((obj) => {
          return (
            <div className="request ">
              <div className="info">
                <div className="profile-photo">
                  <img className="cursor-pointer" src={me} alt="" />
                </div>
                <div>
                  <h5>{obj.username}</h5>
                  <p className="text-muted">8 mutual friends</p>
                </div>
              </div>
              <div className="action pl-10">
                <Link to={`/profile/${obj.username}`}>
                  <button className="btn  bg-blue-900 text-white" type="submit">
                    View Profile
                  </button>
                </Link>
                {/* <button className="btn  bg-blue-900 text-white ">
                     Message
                    </button> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Rightbar;
