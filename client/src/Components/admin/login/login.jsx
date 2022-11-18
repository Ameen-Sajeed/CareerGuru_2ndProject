import React, { useEffect } from 'react'
import './login.css'
import logo from '../../../assets/images/jobi.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useContext } from 'react'
import { AdminContext } from '../../../Store/admin/AdminContext'


function LoginAdmin() {

const [email,setEmail]=useState('')
const [password, setPassword] = useState('')
const [errorMessage, setErrorMessage] = useState('')
const[error,setError]=useState('')
const {adminDetails,setAdminDetails}=useContext(AdminContext)

const navigate=useNavigate()  




// useEffect(() => {
//   if(adminDetails){
//     navigate('/admin/users')
//   }
// }, [])



const handleSubmit = async (e) => {
  e.preventDefault()
  try {
      if (!email) {
         setErrorMessage("Email is required");
     } else if (!email.match(/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)) {
         setErrorMessage("Enter a valid email");
     } else if (!password) {
         setErrorMessage("Password is required");
     } else if (password.length < 4) {
         setErrorMessage("Password must be atleast 4 characters");
     } else if (password.length > 20) {
         setErrorMessage("Password must be less than 20 characters");
     } else {
         const { data } = await axios.post('http://localhost:5000/admin/login', {
             email: email,
             password: password
 
         });
         if (data) {
             if (data) {

              console.log(data);
              localStorage.setItem("token", data.token);
              localStorage.setItem('admin', JSON.stringify(data))
              setAdminDetails(data.admin)
               navigate("/admin/users");           
             } else {
                 setErrorMessage(data)
             }
         }else{
             setErrorMessage('Something went wrong')
         }
     }
 } catch (error) {
     console.log(error.message);
     setError(error.response.data)

 }
}


  return (
    <div>
        <section class="adm min-h-screen flex items-center justify-center">
          {/* <p className='text-white font-extralight text-xs md:text-2xl '>Welcome back Admin, <br></br>have a look at your Dashboard!</p> */}

  <div class="bg-white flex rounded-2xl shadow-2xl max-w-3xl p-5 items-center">
  {/* <p className='text-xl text-blue-900'>Hey,Admin Welcome Back!</p> */}

    <div class="md:w-1/2 px-8 md:px-16">
      <img className='w-1/2 mx-auto '  src={logo} alt="" />
      <h2 class="font-bold text-3xl text-[#002D74] text-center p-2"> Admin Login</h2>

      <form action="" class="flex flex-col gap-4">
        <input class="p-2 mt-8 rounded-xl border" type="email" name="email" placeholder="Email" onChange={(e)=> {setEmail(e.target.value)}} />
        <div class="relative">
          <input class="p-2 rounded-xl border w-full" type="password" name="password" placeholder="Password" onChange={(e)=> {setPassword(e.target.value)}}/>
          
        </div>
        <button onClick={(e) => handleSubmit(e)} class="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300 ">Login</button>
        {errorMessage && <div className="p-2 mb-2 text-center text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">{errorMessage}</div>}
        {error && <div className="p-2 text-center mb-2 text-sm w-44 text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 mx-auto" role="alert"> {error}</div>}

      </form>

      <div class="mt-6 grid grid-cols-3 items-center text-gray-400">
        <hr class="border-gray-400"/>
        <p class="text-center text-sm">OR</p>
        <hr class="border-gray-400"/>
      </div> 

       <button class="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]">
        <svg class="mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="25px">
          <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
          <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
          <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
          <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
        </svg>
        Login with Google
      </button> 

       <div class="mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74]">
        <a href="#">Forgot your password?</a>
      </div> 

       <div class="mt-3 text-xs flex justify-between items-center text-[#002D74]">
        <p>Don't have an account?</p>
        <button class="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">Register</button>
      </div>
    </div>

    <div class="md:block hidden w-1/2">
      <img class="rounded-2xl h-[456px]" src="https://img.freepik.com/free-photo/job-hiring-vacancy-team-interview-career-recruiting_53876-121268.jpg?w=740&t=st=1667824375~exp=1667824975~hmac=59da02033c2ca5f8e6a53de1c6a48c83df47bb033d018e008d960c483da87a06"/>
    </div>
  </div>
</section>

    </div>
  )
}

export default LoginAdmin