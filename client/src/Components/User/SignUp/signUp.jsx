import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../../assets/images/jobi.png'
import './si.css'
import axios from 'axios'


function SignUp() {
    const initialValues = { username: '', email: '', phone: '', password: '' }
    const [formValues, SetFormValues] = useState(initialValues)
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('')
    const [confirm,setConfirm]= useState('')
    
    const handleChange = (e) => {
        console.log(e.target);
        const { name, value } = e.target
        SetFormValues({ ...formValues, [name]: value })
        console.log(formValues);
    }

    const passwordChange = (e) =>{
        setConfirm(e.target.value)
        console.log(confirm,"poppp");
    }
const handleSubmit = (e) =>{
    e.preventDefault()
    try {
        if (!formValues.username) {
            setErrorMessage("Name is required");
        } else if (formValues.username.length < 3) {
            setErrorMessage("Name must be atleast 3 characters");
        } else if (!formValues.username.match(/^[A-Za-z][A-Za-z ]*$/)) {
            setErrorMessage("Enter a valid name");
        } else if (!formValues.phone) {
            setErrorMessage("Phone is required");
        } else if (formValues.phone.match(/[^0-9]/g)) {
            setErrorMessage("Enter a valid Phone number");
        } else if (formValues.phone.length !== 10) {
            setErrorMessage("Phone must be 10 characters");
        } else if (!formValues.email) {
            setErrorMessage("Email is required");
        } else if (!formValues.email.match(/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)) {
            setErrorMessage("Enter a valid email");
        } else if (!formValues.password ) {
            setErrorMessage("Password is required");
        } else if ( formValues.password.length < 4) {
            setErrorMessage("Password must be atleast 6 characters");
        } else if ( formValues.password.length > 20) {
            setErrorMessage("Password must be less than 20 characters");
        } else if(formValues.password !== confirm) {
            setErrorMessage("Passwords don't match");
        }else{
    console.log('hello');

    axios.post('http://localhost:5000/signup', { ...formValues }).then(() => {

        navigate('/login')  
    })
 }} catch(error){
        console.log(error.message);
    }
}

  return (
//     <div className='hei'> 

//       <div className=' grid grid-cols-1 sm:grid-cols-2 h-screen w-full '>
   
//       <div className='bg-light-500 flex flex-col justify-center   '>
//         <center>
//         <img className='hey p-6' src={logo} alt="" />
//         {errorMessage && <div className="p-4  mb-4 text-sm w-44 text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert"> {errorMessage}</div>}

//         </center>


//           <form className='max-w-[500px] w-full h-max mx-auto rounded-lg bg-blue-00 ' onSubmit={handleSubmit}>
//               <h2 className='text-2xl text-blue-900 font-semibold text-center p-2'>Create a Account</h2>
     
//               <div className='flex flex-col text-blue-900 py-2'>
//                   <label className='text-blue-900 text-bold'>Email</label>
//                   <input className='rounded-lg bg-gray-100 mt-2 p-2 focus:border-blue-500 focus:bg-gray-400 focus:outline-none' name='email' type="text" value={formValues.email} onChange={handleChange}  />
//               </div>
//               <div className='flex flex-col text-blue-900 py-2'>
//                   <label className='text-blue-900 text-bold'>UserName</label>
//                   <input className='rounded-lg bg-gray-100 mt-2 p-2 focus:border-blue-500 focus:bg-gray-400 focus:outline-none' name='username' type="text" value={formValues.username} onChange={handleChange}  />
//               </div>
//               <div className='flex flex-col text-blue-900 py-2'>
//                   <label className='text-blue-900 text-bold'>Contact-No</label>
//                   <input className='rounded-lg bg-gray-100 mt-2 p-2 focus:border-blue-500 focus:bg-gray-400 focus:outline-none' type="number" name="phone" value={formValues.phone} onChange={handleChange}  />
//               </div>
//               <div className='flex flex-col text-blue-900 py-2'>
//                   <label className='text-blue-900 text-bold'>Password</label>
//                   <input className='rounded-lg bg-gray-100 mt-2 p-2 focus:border-blue-500 focus:bg-gray-400 focus:outline-none' type="password" name='password' value={formValues.password} onChange={handleChange}  />
//               </div>
//               <div className='flex flex-col text-blue-900 py-2'>
//                   <label className=''>Confirm Password</label>
//                   <input className='p-2 rounded-lg bg-gray-100 mt-2 focus:border-blue-200 focus:bg-gray-400 focus:outline-none' type="password" name='confirmpassword' value={confirm} onChange={passwordChange}  />
//               </div>
        
//               <button  className='w-full my-5 py-2  bg-blue-700 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg  hover:scale-105 duration-300'>LOGIN</button>
             
//           </form>

//         <Link to='/login'> <p className='text-center p-2 text-blue-900 font-semibold'> Already in Jobseeker?</p></Link> 
//       </div>
//   </div>
// </div>


<section class="admo min-h-screen flex items-center justify-center">

{/* <p className='text-white font-extralight text-xs md:text-2xl '>Welcome back Admin, <br></br>have a look at your Dashboard!</p> */}

<div class="bg-green-00 flex rounded-2xl shadow-2xl max-w-3xl p-5 items-center max-h-max">
{/* <p className='text-xl text-blue-900'>Hey,Admin Welcome Back!</p> */}


<div class="md:w-1/2 px-8 md:px-16">
{/* <img className='h-24 mx-auto '  src={logo} alt="" /> */}
<h2 class="font-bold text-2xl text-[#002D74] text-center p-2"> Create an Account</h2>

<form onSubmit={handleSubmit} class="flex flex-col gap-4 p-2">
<input class="p-2 mt-8 rounded-xl border" type="email" name="email" placeholder="Email"  value={formValues.email} onChange={handleChange}/>
<div class="relative">
<input class="p-2 rounded-xl border w-full" type="text" name="username" placeholder="Username" value={formValues.username} onChange={handleChange}/>
</div>
<div class="relative">
<input class="p-2 rounded-xl border w-full" type="number" name="phone" placeholder="Contact-No" value={formValues.phone} onChange={handleChange}/>
</div>
<div class="relative">
<input class="p-2 rounded-xl border w-full" type="number"  placeholder="Confirm-Pasword" name='confirmpassword' value={confirm} onChange={passwordChange}/>
</div>

<input class="p-2 rounded-xl border w-full" type="password" name="password" placeholder="Password" value={formValues.password} onChange={handleChange}/>

<button class="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300 ">Login</button>
</form>
{errorMessage && <div className="p-2 text-center mb-2 text-sm w-44 text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 mx-auto" role="alert"> {errorMessage}</div>}



<div class="mt-3 text-xs flex justify-between items-center text-[#002D74] ">
<p>Already in JobSeeker ?</p>
<Link to="/login"> <button class="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">Login</button></Link>
</div>



</div>

<div class="md:block hidden w-1/2">
<img class="rounded-3xl w-[500px] " src={logo}/>
</div>

</div>


</section>
  )
}

export default SignUp