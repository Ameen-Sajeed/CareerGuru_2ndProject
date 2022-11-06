import React from 'react'
import job from '../../assets/images/jobi.png'
import user from '../../assets/images/user2.webp'


function Navbar() {
  return (
    <div>
        
<nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-blue-200">
  <div className="container flex flex-wrap justify-between items-center mx-auto ">
  <a href="https://flowbite.com/" className="flex items-center">
      <img src={job} className="mr-3 h-6 sm:h-20" alt="Flowbite Logo"/>
  </a>

  <div className="flex items-center md:order-2 ">
        <img className="w-8 h-8 rounded-full" src={user} alt="user photo"/>
        <div className='pl-12'>
        <button type="button" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out  ">log out</button>

        </div>


  </div>
  <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
    <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-blue-200 dark:border-gray-700">
      <li>
        <a href="#" className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white text-lg" aria-current="page">Feed </a>
      </li>
      <li>
        <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-dark md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 text-lg">Network</a>
      </li>
      <li>
        <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-dark md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 text-lg">Chat</a>
      </li>
      <li>
        <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-dark md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 text-lg">Job</a>
      </li>
    
    </ul>
  </div>

  </div>
</nav>

    </div>
  )
}

export default Navbar