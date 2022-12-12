import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import logo from '../../../assets/images/jobi.png'


function ResetPassword() {
    const [password, SetPassword] = useState('');
    const [confirm, SetConfirm] = useState('');
    const [errorMessage,setErrorMessage]=useState('')
    const navigate=useNavigate()
    const userId = useParams().id;
    const handleConfirm = (e) => {
      SetConfirm(e.target.value)
  }
  
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!password) {
        setErrorMessage("Password is required");
      } else if (password.length < 4) {
        setErrorMessage("Password must be atleast 4 characters");
      } else if (password.length > 20) {
        setErrorMessage("Password must be less than 20 characters");
      } else if (password != confirm) {
        setErrorMessage("Password does not matched");
      }else{
        const response=await axios.put(`http://localhost:5000/resetPassword/${userId}`, {password:password,userId:userId})
       if(response.data){
          navigate('/login')
       } 
      }
      
    } catch (error) {
      console.log(error);
    }}
  

  return (
    <section class="admi min-h-screen flex items-center justify-center">
      <div class="bg-green-00 flex rounded-2xl shadow-2xl max-w-3xl p-5 items-center max-h-max">
        <div class="md:w-1/2 px-8 md:px-16">
          <img className="w-1/2 mx-auto " src={logo} alt="" />
          <h2 class="font-bold text-xl text-[#002D74] text-center p-2">
            Enter your Password
          </h2>

          <form onSubmit={handleSubmit} class="flex flex-col gap-4 p-2">

            <div class="relative">
              <input
                class="p-2 rounded-xl border w-full"
                type="password"
                name="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => SetPassword(e.target.value)} />
              
            </div>
            <div class="relative">
              <input
                class="p-2 rounded-xl border w-full"
                type="password"
                name="password"
                placeholder="Confirm Password"
                value={confirm}
                onChange={handleConfirm}
              />
            </div>
            <button class="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300 ">
              Reset Password
            </button>
          </form>   
           <div class="mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74]">
            <Link to="/login">
              <a className="flex justify-center">Back to Login?</a>
            </Link>
          </div>
          {errorMessage && (
            <div
              className="p-2 text-center mb-2 text-sm w-44 text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 mx-auto"
              role="alert"
            >
              {" "}
              {errorMessage}
            </div>
          )}
      
        </div>

        <div class="md:block hidden w-1/2">
          <img
            class="rounded-3xl "
            src="https://img.freepik.com/free-vector/tiny-people-searching-business-opportunities_74855-19928.jpg?w=1380&t=st=1667827093~exp=1667827693~hmac=09f6484512ffdd5ef5a855198b4fca98e1c2a2c5e0ec648a3dd9a34009778ad7"
          />
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;
