import ig1 from '../../assets/images/ig3.webp'
import ig4 from '../../assets/images/ig4.webp'
import ig5 from '../../assets/images/ig5.webp'
import ig7 from '../../assets/images/ig7.webp'
import job from '../../assets/images/jobi.png'
import { FaSearch, FaUserFriends } from 'react-icons/fa'
import './lp.css'
export default function Landing() {
  return (
    <div>
        <div className='flex justify-between p-2 '>

      
        
            <button  type="button" class="inline-block px-6 py-2.5 bg-blue-500 m-3 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Sign in </button>
            <FaSearch className='text-blue-700 m-6 '/>
            <FaUserFriends className='text-blue-700 m-6'/>
            <button  type="button" class="inline-block px-6 py-2.5 bg-blue-500 m-3 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Join now </button>

            </div>
        <div className='flex'>
                <img src={ig1}  />
             
            <div>
            <center>
            <p className='text-blue-800 font-medium leading-1 text-5xl p-4 pl-4 pt-40'>BUILD YOUR CAREER WITH</p>
            {/* <p className='text-blue-900 font-extrabold leading-1 text-7xl  '>CAREER GURU</p> */}
            <img src={job} alt="" />

            <p className='p-4 text-blue-400 font-semibold'> “Choose a job you love, and you will never have to work a day in your life." —Confucius</p>
            </center>
            </div>
                </div>
                <div className='flex'>
                    <div>
                    <center>
                    <p  className='text-blue-500 font-sans leading-1 text-6xl p-8 leading-relaxed'>POST JOBS FOR MILLION PEOPLE</p>
                  
                    <button  type="button" class="inline-block px-6 py-2.5 bg-blue-500 m-3 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">post jobs</button>

                    </center>

                    </div>


                    <img src={ig5}  />

                </div>
                <div className='flex'>
                <img src={ig4}  />
             
            <div>
            <center>
            <p className='text-blue-500 font-sans leading-1 text-6xl p-8 leading-relaxed'>CONNECT WITH PEOPLE WHO CAN HELP </p>
        
            <button  type="button" class="inline-block px-6 py-2.5 bg-blue-500 m-3 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">connect </button>
            </center>
            </div>
                </div>
                <div className='flex m-5'>
                <center>
            <p className='text-blue-500 font-sans leading-1 text-4xl p-8 leading-relaxed'>JOIN YOUR COLLEGUES, CLASSMATES, AND FRIENDS ON CAREERGURU </p>
        
            <button  type="button" class="inline-block px-6 py-2.5 bg-blue-500 m-3 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">GET STARTED </button>
            </center>
                <img src={ig7}  />

                </div>





         
{/* <footer class="p-2 bg-white rounded-lg shadow md:px-6 md:py-8 dark:bg-blue-100">
    <div class="sm:flex sm:items-center sm:justify-between">
        <a href="https://flowbite.com/" class="flex items-center mb-4 sm:mb-0">
            <img src={job} class="mr-3 h-24" alt="Flowbite Logo"></img>
        </a>
        <ul class="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
                <a href="#" class="mr-4 hover:underline md:mr-6 text-blue-900 ">About</a>
            </li>
            <li>
                <a href="#" class="mr-4 hover:underline md:mr-6  text-blue-900 ">Privacy Policy</a>
            </li>
            <li>
                <a href="#" class="mr-4 hover:underline md:mr-6  text-blue-900  ">Licensing</a>
            </li>
            <li>
                <a href="#" class="hover:underline  text-blue-900 ">Contact</a>
            </li>
        </ul>
    </div>
    <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"></hr>
    <span class="block text-sm   sm:text-center  text-blue-900 ">© 2022 <a href="#" class="hover:underline">Jobseeker™</a>. All Rights Reserved.
    </span>
</footer> */}


       
    </div>
  )
}

