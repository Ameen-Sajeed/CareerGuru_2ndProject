import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/jobi.png'
import Swal from 'sweetalert2'
import './login.css'

 function Login() {
  const initialValues ={email:"",password:""}
  const [formValues,setFormValues]=useState(initialValues)
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')



  const handleChange=(e)=>{
    console.log(e.target);
    const {name,value}=e.target
    setFormValues({...formValues,[name]:value})
    console.log(formValues);

}

const handleSubmit=(e)=>{
  e.preventDefault()

  try {
    if (!formValues.email) {
      setErrorMessage("Email is required");
  }  else if (!formValues.email.match(/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)) {
    setErrorMessage("Enter a valid email");
  } else if(!formValues.password){
    setErrorMessage("Password is required")
  }  else if ( formValues.password.length < 4) {
    setErrorMessage("Password must be atleast 6 characters");
  }
  else {
    
    axios.post('http://localhost:5000/login',{...formValues}).then((response)=>{

    if(response.data.state=='ok'){
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'You are successfully logged in',
        showConfirmButton: false,
        timer: 1500
      }).then(()=>{
        // window.location.href = "/"
        navigate('/')
      })

    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
      console.log("Invalid Credentials");
    }
    })
  }
  
 } catch (error) {
  console.log(error);
    
  }
}


  return (
    <div className='hy'> 
      <p className='text-blue-900 p-8 font-bold text-center'> Are you bored with life? Then throw yourself into some work you believe in with all your heart, live for it, die for it, and you will find happiness that you had thought could never be yours. <br /> — Dale Carnegie</p>

        <div className='hu grid grid-cols-1 sm:grid-cols-2 h-screen w-full '>
     
        <div className='bg-light-500 flex flex-col justify-center   '>
          <center>
          <img className='hey p-2 ' src={logo} alt="" />

          </center>

          {errorMessage && <div className="p-4  mb-4 text-sm w-44 text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert"> {errorMessage}</div>}

            <form className='max-w-[500px] w-full h-max mx-auto rounded-lg bg-blue-00 p-10 px-16 ' onSubmit={handleSubmit}>
                <h2 className='text-2xl text-blue-900 font-extrabold text-center'>LOGIN</h2>
       
                <div className='flex flex-col text-blue-900 py-2'>
                    <label className='text-blue-900 text-bold'>Email</label>
                    <input className='rounded-lg bg-gray-100 mt-2 p-2 focus:border-blue-500 focus:bg-gray-400 focus:outline-none' type="text" value={formValues.email} onChange={handleChange} name="email" />
                </div>
                <div className='flex flex-col text-blue-900 py-2'>
                    <label className=''>Password</label>
                    <input className='p-2 rounded-lg bg-gray-100 mt-2 focus:border-blue-200 focus:bg-gray-400 focus:outline-none' type="password" value={formValues.password} onChange={handleChange} name="password" />
                </div>
          
                <button  className='w-full my-5 py-2  bg-blue-700 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>LOGIN</button>
               
            </form>
           <Link to='/signup'> <p className='text-center p-2 text-blue-900 font-semibold'>New to Jobseeker?</p></Link>
        </div>
    </div>
</div>
  )

 }
export default Login