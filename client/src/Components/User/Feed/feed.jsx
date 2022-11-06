import React from 'react'
import feed from '../../../assets/images/sm.webp'
import feed2 from '../../../assets/images/cc.webp'
import feed3 from '../../../assets/images/gh.jpg'
import CreateIcon from '@mui/icons-material/Create';
import './Feed.css'


function Feed() {
  return (
    <div className='feed'>
 
        {/* <center>
     <img src={feed} alt="" />
     <img src={feed2} alt="" />
     <img src={feed3} alt="" />

     </center>  */}


     <div className="feed_inputContainer">

        <div className="feed_input">
            <CreateIcon/>
            <form>
                <input type="text" />
                <button type='submit'>Send</button>
            </form>

        </div>

     </div>



     
    </div>
  )
}

export default Feed