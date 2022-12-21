import React, { useEffect, useState } from "react";
import "./Header.css";
import me from "../../assets/images/us.webp";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import userinstance from "../../axios";

function Rightbar() {
  const userData = useSelector((state) => state.user);
  const userId = userData._id;
  const [forms, setForms] = useState([]);
  // const [chat,setChat] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    userinstance
      .get(`/closefriends/${userId}`)
      .then((response) => {
        if (response.data) {
          setForms(response.data);
        } else {
          console.log("erorr");
        }
      })
      .catch((error) => {
        console.log(error, "erorr ocurred");
      });
  }, [userId]);

  // useEffect(()=>{
  //   userinstance.get(`http://localhost:5000/chat/${userId}`).then((response)=>{
  //     console.log(response.data,"chaaaats");
  //          setChat(response.data)

  //   })
  // },[])

   /* ------------------------------- CREATE CHAT ------------------------------ */

   const createChat = async (Id) => {
    try {
      await userinstance
        .post("/createChat", {
          senderId: userId,
          recieverId: Id,
        })
        .then((response) => {
          console.log(response);
          navigate('/chat')
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="right">
      {/* <div className="messages">
        <div className="heading">
          <h4> Messages </h4>
          <i className="uil uil-edit"></i>
        </div>

        
        <div className="search-bar">
          <i className="uil uil-search"></i>
          <input
            type="search"
            placeholder="Search messages"
            id="message-search"
          />
        </div>


        <div className="category">
          <h6 className="active">Primary</h6>
          <h6>General</h6>
          <h6 className="messages-requests">Requests(7)</h6>
        </div>


        <div className="message">
          <div className="profile-photo">
            <img src={me} alt="" />
          </div>
          <div className="message-body">
            <h5>Paul Dybala</h5>
            <p className="text-muted">Evde Muthey!</p>
          </div>
        </div>
      </div> */}


      {/* FRIEND REQUESTS */}

      <div className="friend-requests">
        <h4>Connections</h4>

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
              <div className="action pl-">
                <Link to={`/profile/${obj.username}`}>
                  <button className="btn  bg-blue-900 text-white" type="submit">
                    View Profile
                  </button>
                </Link>
                <button className="btn  bg-blue-900 text-white "    onClick={(e) => {
                            createChat(obj._id);
                          }}>
                     Chat
                    </button>
                    {/* <TelegramIcon className="m-2 "/> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Rightbar;
