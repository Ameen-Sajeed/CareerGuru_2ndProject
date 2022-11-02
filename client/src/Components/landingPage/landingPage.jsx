import ig1 from '../../assets/images/ig3.webp'
import ig4 from '../../assets/images/ig4.webp'
import ig5 from '../../assets/images/ig5.webp'
import ig7 from '../../assets/images/ig7.webp'
import job from '../../assets/images/jobi.png'
import { FaSearch, FaUserFriends } from 'react-icons/fa'
import './lp.css'
import { Link } from 'react-router-dom'
export default function Landing() {
  return (
    <div>
        <div className='flex justify-between p-2 '>

      
        
            <Link to='/login'><button  type="button" class="inline-block px-6 py-2.5 bg-blue-500 m-3 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Sign in </button></Link>
            <FaSearch className='text-blue-700 m-6 '/>
            <FaUserFriends className='text-blue-700 m-6'/>
            <Link to='/signup'><button  type="button" class="inline-block px-6 py-2.5 bg-blue-500 m-3 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Join now </button></Link>

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
       
    </div>
  )
}

