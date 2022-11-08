import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import LoginPage from './Pages/user/login';
import Landingpg from './Pages/user/landingpage';
import SignUpPage from './Pages/user/signup';
import Feedpg from './Pages/user/feed';
import UsersMan from './Pages/admin/Users';
import Header from './Components/navbar/header/Header';
import LoginAdmin from './Components/admin/login/login';
function App() {
  return (

    // <Landing/>
    <div className='app'>

    
<Router>

 


  <Routes>
    <Route path='/' element={<Landingpg/>}/>
    <Route path='/login' element={<LoginPage/>}/>
    <Route path='/SignUp' element={<SignUpPage/>}/>
    <Route path='/feed' element={<Feedpg/>}/>
    <Route path='/head' element={<Header/>}/>

  </Routes>


<Routes>
  <Route path='admin/users' element={<UsersMan/>}/>
  <Route path='admin/login' element={<LoginAdmin/>}/>

</Routes>

</Router>

</div>
    
  );
}

export default App;
