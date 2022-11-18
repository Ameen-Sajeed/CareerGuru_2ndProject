// import './Header.css'
import me from '../../../../assets/images/me.jpg'
import ImageIcon from '@mui/icons-material/Image';



function  JobFeed() {

  return (
  

          <div className='middle'>

            <div className="stories">
                <div className="story">
                    <div className="profile-photo">
                        <img src={me} alt="" />
                    </div>
                    <p className="name">React Js Developer</p>
                </div>
                <div className="story">
                    <div className="profile-photo">
                        <img src={me} alt="" />
                    </div>
                    <p className="name">Android Developer</p>
                </div>      <div className="story">
                    <div className="profile-photo">
                        <img src={me} alt="" />
                    </div>
                    <p className="name">Frontend Developer</p>
                </div>      <div className="story">
                    <div className="profile-photo">
                        <img src={me} alt="" />
                    </div>
                    <p className="name">Python Developer</p>
                </div>      <div className="story">
                    <div className="profile-photo">
                        <img src={me} alt="" />
                    </div>
                    <p className="name">Flutter Developer</p>
                </div>
            </div>

            <form className='create-post' >
                <div className="profile-photo">
                    <img src={me} alt="" />
                </div>
                <input className='imag' type="text" placeholder="What's on Your Mind,Amien?" name="post" id="create-post"   />
                <label className='p-2 cursor-pointer text-blue-400' htmlFor="img-upload"> <ImageIcon  style={{fontSize:"30px"}} /></label>
        
                <input type="file" id="img-upload" className='hidden' name="uploadImages"  />
                <input type="submit" value="Add Job" className='btn btn-primary' />
           
               
            </form>
            <div className="feeds">


            <div class="rounded-md w-full bg-white px-4 py-4 shadow-md transition transform duration-500 cursor-pointer p-8">
  <div class="flex flex-col justify-start">
    <div class="flex justify-between items-center w-96">
      <div class="text-lg font-semibold text-bookmark-blue flex space-x-1 items-center mb-2">
        <svg class="w-7 h-7 text-gray-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
          <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
        </svg>
        <span>Frontend Engineer</span>
      </div>
      <span class="bg-green-500 rounded-full uppercase text-white text-sm px-4 py-1 font-bold shadow-xl"> Remote </span>
    </div>
    <div class="text-sm text-gray-500 flex space-x-1 items-center">
      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
      </svg>
      <span>Banglore, India</span>
    </div>
    <div>
      <div class="mt-5">
        <button class="mr-2 my-1 uppercase tracking-wider px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white border text-sm font-semibold rounded py-1 transition transform duration-500 cursor-pointer">Apply</button>
      </div>
    </div>
  </div>
</div>


            </div>

   </div>

  
  )
}

export default JobFeed