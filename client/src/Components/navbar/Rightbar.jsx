import React, { useEffect, useState } from 'react'
import './Header.css'
import me from '../../assets/images/us.webp'
import { useSelector } from 'react-redux'
import axios from 'axios'

function Rightbar() {


    const userData = useSelector((state=>state.user))
    const  userId = userData._id
    const [forms,setForms]=useState([])
    // console.log(userId,"yuuu");

    useEffect(()=>{
        axios.get("http://localhost:5000/findUsers",{
            headers:{"x-access-token":localStorage.getItem('usertoken')},
        }).then((response)=>{
            
            if(response.data){
                // console.log(token);
              setForms(response.data)
    
            }
            else{
                console.log("erorr");
                
            }
        }).catch((error)=>{
        
            console.log(error,"erorr ocurred");
        })
    },[])

    console.log(forms,"tytyty");

  
    

    const handleSubmit = (id)=>{
    //     console.log("call");
    //   console.log(id);
        axios.put(`http://localhost:5000/${userId}/follow`,{id}).then((result)=>{

            if (result.status == 200) {
                // setStatus(new Date())
                // console.log(result,"success");

            } else {
                console.log('Something went wrong')
            }
        }).catch((err) => {
            console.log(err)
            console.log("erorr ocurred");
    
        })

        }
    

  return (


          <div className='right'>

           <div className="messages">
            <div className="heading">
                <h4> Messages </h4><i className='uil uil-edit'></i>
            </div>

            {/* SEARCH BAR */}
            <div className="search-bar">
                <i className='uil uil-search'></i>
                <input type="search" placeholder='Search messages' id="message-search" />
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
            <h4>Friends</h4>
            {forms.map((obj)=>{

          return(
            <div className="request">
              

             
                <div className="info">
                    <div className="profile-photo">
                        <img src={me} alt="" />
                    </div>
                <div>
                <h5>{obj.username}</h5>
                <p className="text-muted">
                    8 mutual friends
                </p>
                </div>
                </div>
                  

                <div className="action">
                    <button className="btn btn-primary" type='submit' onClick={(e) => { handleSubmit(obj._id) }} >
                        Follow
                    </button>
                    <button className="btn ">
                        Message
                    </button>
                </div>
            </div>
                 )
                })}

            {/* bnbn */}

            {/* <div className="request">
                <div className="info">
                    <div className="profile-photo">
                        <img src={me} alt="" />
                    </div>
                <div>
                <h5>Cristaino Ronaldo</h5>
                <p className="text-muted">
                    8 mutual friends
                </p>
                </div>
                </div>

                <div className="action">
                    <button className="btn btn-primary">
                        Follow
                    </button>
                    <button className="btn ">
                        Message
                    </button>
                </div>
            </div> */}

           </div>

          </div>

     
  )
}

export default Rightbar
