import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import LoginPage from './Pages/user/login';
import Landingpg from './Pages/user/landingpage';
import SignUpPage from './Pages/user/signup';
import Feedpg from './Pages/user/feed';
import UsersMan from './Pages/admin/Users';
import LoginAdmin from './Components/admin/login/login';
import Admin from './Store/admin/AdminContext';
import Dash from './Pages/admin/Dash';
import User from './Store/user/UserContext';
import {Provider} from 'react-redux'
import Store from './Store/Store'
import ProfilePage from './Pages/user/Profile';
import Jobpg from './Pages/user/Job';
function App() {
  return (

    // <Landing/>
    <div className='app'>
<User>
      <Admin>

    
<Router>

<Provider store={Store}>
 

  <Routes>
    <Route path='/' element={<Landingpg/>}/>
    <Route path='/login' element={<LoginPage/>}/>
    <Route path='/SignUp' element={<SignUpPage/>}/>
    <Route path='/feed' element={<Feedpg/>}/>
    <Route path='/profile' element={<ProfilePage/>}/>
    <Route path='/Job' element={<Jobpg/>}/>

  </Routes>

<Routes>
  <Route path='/admin/users' element={<UsersMan/>}/>
  <Route path='/admin/login' element={<LoginAdmin/>}/>
  <Route path='/admin/home' element={<Dash/>}/>

</Routes>

  </Provider>
</Router>
</Admin>
</User>

</div>
    
  );
}

export default App;
