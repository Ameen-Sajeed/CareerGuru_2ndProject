import React from 'react'
import job from '../../assets/images/jobi.png'
import './footer.css'

function Footer() {
  return (
    <div>
 

<footer class="" >
  <div class=" foot container pt-">
  
  </div>

  <div class="text-center text-gray-700 p-4 ">
  <a href="https://flowbite.com/" class="flex items-center mb-4 sm:mb-0 justify-center">
            <img src={job} class="mr-3 h-14" alt="Flowbite Logo"></img>
        </a>
    © 2022 Copyright: 
    <a class="text-gray-800" href="https://tailwind-elements.com/"> Job Seeker</a>
  </div>
</footer>
 
    </div>
  )
}

export default Footer



