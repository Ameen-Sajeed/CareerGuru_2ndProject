import React from 'react'
import job from '../../assets/images/jobi.png'

function Footer() {
  return (
    <div>
        <footer class="p-2 bg-white rounded-lg shadow md:px-6 md:py-8 dark:bg-blue-100">
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
</footer>
    </div>
  )
}

export default Footer