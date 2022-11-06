import logo from '../../assets/images/jobi.png'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import user from '../../assets/images/user2.webp'
import moment from 'moment'


export default function Sidebar2() {
    const [open, setOpen] = useState(true);
    const Menus = [
        { Dashboard: "Users", src: "Chart_fill" },
        // { Approve: "Approved List", src: "Chat" },
        // { Reject: "Rejected List", src: "User",  },
        // { Slots: "Booking Slots ", src: "Calendar" },
        // { create: "Create Slots", src: "Search" },
        // { progress: "Progress Status", src: "Search" },
    
      ];

   
  return (
<div className="flex">
      <div
        className={` ${
          open ? "w-56" : "w-20 "
        } bg-teal-400 h-screen p-5  pt-8 relative duration-300`}
      >
        <img
          
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center ">
          <img 
           src={logo}
            className={`cursor-pointer duration-500 h-20 pl-12 ${
              open && "rotate-[360deg]"
            }`}
          />
          {/* <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Incubation Management
          </h1> */}
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li 
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white  text-md items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white" 
              } ` }
            >
              <img src={user} className='w-8 h-8 rounded-full'/>
              <span className={`${!open && "hidden"} origin-left duration-200 text-xl font-semibold text-center `}   >
                {Menu.title}
                <Link >{Menu.ameen}</Link> 
                 <Link  to='/approved'>{Menu.Approve}</Link>
                <Link to='/rejected' >{Menu.Reject}</Link>
                <Link to='/slot'>{Menu.Slots}</Link>
                <Link to='/dashboard'>{Menu.Dashboard}</Link>
                <Link to='/createslot'>{Menu.create}</Link>
                <Link to='/progress'>{Menu.progress}</Link>


              </span>

            </li>

          ))}
        </ul>
       
      </div>

    </div>
  )
}

