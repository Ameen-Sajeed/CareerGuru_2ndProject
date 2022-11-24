import React from 'react'
import './Header.css'
import me from '../../assets/images/me.jpg'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Disclosure, Menu, Transition } from '@headlessui/react'
function Header() {


  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('usertoken')
    // localStorage.removeItem('user')
    navigate('/login');
  }


  return (
<nav>
    <div className="container">
       <Link to='/feed'> <h2 className='log text-3xl font-extrabold text-blue-400'>JobSeeker</h2></Link>
        <div className="search-bar">
            <i className='uil uil-search'></i>
            <input type="search" placeholder='Search' />
        </div>
<div className="create">
    <label className='btn btn-primary' htmlFor="create-post" onClick={handleLogout}>Sign Out</label>
    <div className="profile-photo">
       <Link to='/profile'><img className='cursor-pointer' src={me} alt="" /></Link> 
    </div>
</div>
</div>
</nav>



  )
}

export default Header