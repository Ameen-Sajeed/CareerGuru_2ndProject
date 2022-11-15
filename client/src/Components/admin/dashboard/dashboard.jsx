import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';





function Dashboard() {

const navigate = useNavigate()
  useEffect(()=>{

    const token= localStorage.getItem('token')
    console.log(token,"hy there");
    if(!token){
        navigate('/admin/login')
    }
  })

  return (
    <div className=''>

        <h2 className='text-5xl font-bold text-blue-400 p-10'>Welcome to Dashboard</h2>
    </div>
  )
}

export default Dashboard