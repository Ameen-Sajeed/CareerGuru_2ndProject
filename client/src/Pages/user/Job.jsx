import Feed from '../../Components/FeedUtils/Feed'
import Header from '../../Components/FeedUtils/Header'
import Leftbar from '../../Components/FeedUtils/Leftbar'
import Rightbar from '../../Components/FeedUtils/Rightbar'
import '../../Components/FeedUtils/Header.css'
import JobFeed from '../../Components/User/NavUtils/Jobfeed/Jobfeed'

function Jobpg (){

return(
   


    <div className='bd'>
    <Header/>
    <main>
    <div className='container flex'>
    <Leftbar/>
    <JobFeed/>
    <Rightbar/>
        </div>
        </main>
        </div>
         )

}

export default Jobpg