import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import LoginPage from './Pages/user/login';
import Landingpg from './Pages/user/landingpage';
import SignUpPage from './Pages/user/signup';
function App() {
  return (

    // <Landing/>
    
<Router>
  <Routes>
    <Route path='/' element={<Landingpg/>}/>
    <Route path='/login' element={<LoginPage/>}/>
    <Route path='/SignUp' element={<SignUpPage/>}/>

  </Routes>
</Router>

     
  );
}

export default App;
