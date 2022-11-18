import Feed from '../../Components/FeedUtils/Feed'
import Header from '../../Components/FeedUtils/Header'
import Leftbar from '../../Components/FeedUtils/Leftbar'
import Rightbar from '../../Components/FeedUtils/Rightbar'
import '../../Components/FeedUtils/Header.css'

function Feedpg (){

return(
   


    <div className='bd'>
    <Header/>
    <main>
    <div className='container flex'>
    <Leftbar/>
    <Feed/>
    <Rightbar/>
        </div>
        </main>
        </div>
         )

}

export default Feedpg