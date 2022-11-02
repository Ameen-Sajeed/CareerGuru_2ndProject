import React from 'react'
import logo from '../../assets/images/jobi.png'
import './login.css'

function Login() {
  return (
    <div className='hy'> 
      <p className='text-blue-900 p-8 font-bold text-center'> Are you bored with life? Then throw yourself into some work you believe in with all your heart, live for it, die for it, and you will find happiness that you had thought could never be yours. <br /> — Dale Carnegie</p>

        <div className='hu grid grid-cols-1 sm:grid-cols-2 h-screen w-full '>
     
        <div className='bg-light-500 flex flex-col justify-center   '>
          <center>
          <img className='hey p-2' src={logo} alt="" />

          </center>


            <form className='max-w-[500px] w-full h-max mx-auto rounded-lg bg-blue-00 p-10 px-16 '>
                <h2 className='text-4xl text-blue-900 font-extrabold text-center'>LOGIN</h2>
       
                <div className='flex flex-col text-blue-900 py-2'>
                    <label className='text-blue-900 text-bold'>Email</label>
                    <input className='rounded-lg bg-gray-100 mt-2 p-2 focus:border-blue-500 focus:bg-gray-400 focus:outline-none' type="text"  />
                </div>
                <div className='flex flex-col text-blue-900 py-2'>
                    <label className=''>Password</label>
                    <input className='p-2 rounded-lg bg-gray-100 mt-2 focus:border-blue-200 focus:bg-gray-400 focus:outline-none' type="password"  />
                </div>
          
                <button  className='w-full my-5 py-2  bg-blue-700 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>LOGIN</button>
                {/* <Link className='text-1xl text-green-900 font-sans text-center ' to="/signup"><p>New User ?</p></Link> */}
               
            </form>
            <p className='text-center p-2 text-blue-900 font-semibold'>New to Jobseeker?</p>
        </div>
    </div>
</div>
  )
}

export default Login