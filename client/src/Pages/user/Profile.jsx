import React from 'react'
import Header from '../../Components/FeedUtils/Header'
import Leftbar from '../../Components/FeedUtils/Leftbar'
import Profile from '../../Components/User/NavUtils/Profile'

function ProfilePage() {

    
  return (
    <div >
            <Header/>
            <div className=''>

            {/* <Leftbar/> */}
      

        <Profile/>
        </div>

    </div>
  )
}

export default ProfilePage