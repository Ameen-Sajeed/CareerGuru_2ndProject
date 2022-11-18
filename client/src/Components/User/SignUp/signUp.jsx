import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../../assets/images/jobi.png'
import './si.css'
import axios from 'axios'
import pic from '../../../assets/images/ig2.webp'
import { userUrl } from '../../../Constants/Constant'
import OTPInput, { ResendOTP } from "otp-input-react";
import Countdown from 'react-countdown';


function SignUp() {
    const initialValues = { username: '', email: '', phone: '', password: '' }
    const [formValues, SetFormValues] = useState(initialValues)
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('')
    const [confirm,setConfirm]= useState('')
    const [OtpModal, setOtpModal] = useState(false)
    const [OtpError, setOtpError] = useState('')
    const [UserDetails, setUserDetails] = useState({})
       const [OTP, setOTP] = useState('');
    
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

    axios.post(`${userUrl}/signup`, { ...formValues }).then((response) => {
        console.log(response);
        if (response.data.message) {

            setErrorMessage(response.data.message)
        } else {
            console.log(response.data);
            setUserDetails(response.data)
            setOtpModal(true)

        }
    })
 }} catch(error){
        console.log(error.message);
    }
}
console.log(UserDetails,"jhjhjhj");

const onVerify = (e) => {
    e.preventDefault()
    const data = {
        OTP: OTP,
        user: UserDetails.res._id 
    }

    if (OTP.length < 6) {
        setOtpError('Enter A 6 digit Otp')
    } else {

        axios.post('http://localhost:5000/verifyOtp', data).then((response) => {
            console.log(response.data)
            if (response.data.verified) {
                navigate('/login')
            }
            setOtpError(response.data.msg)
        })
    }
}



  return (


<section class="admo min-h-screen flex items-center justify-center">

{/* <p className='text-white font-extralight text-xs md:text-2xl '>Welcome back Admin, <br></br>have a look at your Dashboard!</p> */}

<div class="bg-green-00 flex rounded-2xl shadow-2xl max-w-3xl p-5 items-center max-h-max">
{/* <p className='text-xl text-blue-900'>Hey,Admin Welcome Back!</p> */}


<div class="md:w-1/2 px-8 md:px-16">
<img className='w-1/2 mx-auto '  src={logo} alt="" />
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

<button class="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300 ">Register</button>
</form>
{errorMessage && <div className="p-2 text-center mb-2 text-sm w-44 text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 mx-auto" role="alert"> {errorMessage}</div>}



<div class="mt-3 text-xs flex justify-between items-center text-[#002D74] ">
<p>Already in JobSeeker ?</p>
<Link to="/login"> <button class="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">Login</button></Link>
</div>



</div>

<div class="md:block hidden w-1/2">
<img class="rounded-3xl w-[500px] " src={pic}/>
</div>

</div>


{
                            OtpModal ?
                                <div className=" absolute w-full h-full backdrop-blur-sm  py-20 px-3 flex items-center">

                                    <div className="container mx-auto">
                                        <div className="max-w-sm mx-auto md:max-w-lg">
                                            <div className="w-full">
                                                <div className="bg-gradient-to-r from-blue-400 to-purple-500 h-64 py-3 rounded text-center">
                                                    <h1 className="text-2xl font-bold">OTP Verification</h1>
                                                    <div className="flex flex-col mt-4">
                                                        <span>Enter the OTP you received at</span>
                                                        <span className="font-bold">{UserDetails.res.email}</span>

                                                    </div>

                                                    {/* <Countdown date={Date.now() + 100000} /> */}
                                                    <div id="otp" className="flex flex-row justify-center text-center px-2 mt-5">
                                                        {/* <input className="m-2 border h-10 w-10 text-center form-control rounded" type="text" id="first" maxlength="1" />
                                                        <input className="m-2 border h-10 w-10 text-center form-control rounded" type="text" id="second" maxlength="1" />
                                                        <input className="m-2 border h-10 w-10 text-center form-control rounded" type="text" id="third" maxlength="1" />
                                                        <input className="m-2 border h-10 w-10 text-center form-control rounded" type="text" id="fourth" maxlength="1" />
                                                        <input className="m-2 border h-10 w-10 text-center form-control rounded" type="text" id="fifth" maxlength="1" />
                                                        <input className="m-2 border h-10 w-10 text-center form-control rounded" type="text" id="sixth" maxlength="1" /> */}
                                                        <OTPInput value={OTP} onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false} />
                                                    </div>
                                                    <p className='text-red-500 font-[8px] mb-3 pl-3'>{OtpError}</p>

                                                    <div className="flex justify-center text-center mt-5">

                                                        <button className='flex items-center text-green-500 hover:text-white hover:bg-green-500 cursor-pointer font-bold bg-white rounded-lg pl-2 pr-2 ' onClick={(e) => onVerify(e)}>Verify</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : null
                        }


</section>
  )
}

export default SignUp