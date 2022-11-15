import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SidebarData } from './SidebarData'
import './Side.css'



function SidebarF() {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/admin/login');
  }
  



  return (
    <div className='Sidebar'>
      <h1 className='text-white text-center text-4xl p-4 font-extrabold'>JobSeeker</h1>
        <ul className='SidebarList'>
        
        {SidebarData.map((val,key)=>{
            return <li key={key} className="row" 
                id={window.location.pathname == val.link ? "active" :""}
                onClick={()=>{
                window.location.pathname= val.link
            }}>
                <div id="icon">{val.icon}</div>
                <div id="title">{val.title}</div>

            </li>
            


    })}
    </ul>
    <div className='flex justify-center'>
    <button onClick={handleLogout}  type="button" class="inline-block px-6 py-2.5 bg-green-500 text-dark font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Log Out</button>
    </div>
       
    </div>
  )
}

export default SidebarF