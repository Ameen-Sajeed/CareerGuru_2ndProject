import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/jobi.png'
import './si.css'


function SignUp() {
  return (
    <div className='hei'> 

      <div className=' grid grid-cols-1 sm:grid-cols-2 h-screen w-full '>
   
      <div className='bg-light-500 flex flex-col justify-center   '>
        <center>
        <img className='hey p-6' src={logo} alt="" />

        </center>


          <form className='max-w-[500px] w-full h-max mx-auto rounded-lg bg-blue-00 '>
              <h2 className='text-2xl text-blue-900 font-semibold text-center p-2'>Create a Account</h2>
     
              <div className='flex flex-col text-blue-900 py-2'>
                  <label className='text-blue-900 text-bold'>Email</label>
                  <input className='rounded-lg bg-gray-100 mt-2 p-2 focus:border-blue-500 focus:bg-gray-400 focus:outline-none' type="text"  />
              </div>
              <div className='flex flex-col text-blue-900 py-2'>
                  <label className='text-blue-900 text-bold'>UserName</label>
                  <input className='rounded-lg bg-gray-100 mt-2 p-2 focus:border-blue-500 focus:bg-gray-400 focus:outline-none' type="text"  />
              </div>
              <div className='flex flex-col text-blue-900 py-2'>
                  <label className='text-blue-900 text-bold'>Contact-No</label>
                  <input className='rounded-lg bg-gray-100 mt-2 p-2 focus:border-blue-500 focus:bg-gray-400 focus:outline-none' type="number"  />
              </div>
              <div className='flex flex-col text-blue-900 py-2'>
                  <label className='text-blue-900 text-bold'>Password</label>
                  <input className='rounded-lg bg-gray-100 mt-2 p-2 focus:border-blue-500 focus:bg-gray-400 focus:outline-none' type="password"  />
              </div>
              <div className='flex flex-col text-blue-900 py-2'>
                  <label className=''>Confirm Password</label>
                  <input className='p-2 rounded-lg bg-gray-100 mt-2 focus:border-blue-200 focus:bg-gray-400 focus:outline-none' type="password"  />
              </div>
        
              <button  className='w-full my-5 py-2  bg-blue-700 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>LOGIN</button>
              {/* <Link className='text-1xl text-green-900 font-sans text-center ' to="/signup"><p>New User ?</p></Link> */}
             
          </form>
        <Link to='/login'> <p className='text-center p-2 text-blue-900 font-semibold'> Already in Jobseeker?</p></Link> 
      </div>
  </div>
</div>
  )
}

export default SignUp