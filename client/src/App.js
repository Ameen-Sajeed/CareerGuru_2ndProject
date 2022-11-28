import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/user/login";
import Landingpg from "./Pages/user/landingpage";
import SignUpPage from "./Pages/user/signup";
import Feedpg from "./Pages/user/feed";
import UsersMan from "./Pages/admin/Users";
import LoginAdmin from "./Components/admin/login/login";
import Admin from "./Store/admin/AdminContext";
import Dash from "./Pages/admin/Dash";
import User from "./Store/user/UserContext";
import { Provider } from "react-redux";
import Store from "./Store/Store";
import ProfilePage from "./Pages/user/Profile";
import Jobpg from "./Pages/user/Job";
import Networkpg from "./Pages/user/Network";
import ChatPage from "./Pages/user/Chat";
import PostsMan from "./Pages/admin/Post";
import ProtectedApi from "./Components/ProtectedApi";
import ErrorPage from "./Components/error";
import AdminAuth from "./Components/AdminAuth";
import JobDescpg from "./Pages/user/Jobdesc";
import ReportsMan from "./Pages/admin/Report";

function App() {
  return (
    <div className="app">
      <User>
        <Admin>
          <Router>
            <Provider store={Store}>
              <Routes>

                  /* ----------------------------- USER ACCESS API ---------------------------- */
                <Route path="/" element={<Landingpg />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/SignUp" element={<SignUpPage />} />
                <Route path="/error" element={<ErrorPage />} />

                <Route element={<ProtectedApi/>}>
                <Route path="/feed" element={<Feedpg />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/profile/:username" element={<ProfilePage />} />
                <Route path="/Job" element={<Jobpg />} />
                <Route path="/Jobdesc/:id" element={<JobDescpg />} />
                <Route path="/Network" element={<Networkpg />} />
                <Route path="/Chat" element={<ChatPage />} />
                </Route>
              </Routes>

              <Routes>
                /* ---------------------------- Admin Access API ---------------------------- */
                <Route path="/admin/login" element={<LoginAdmin />} />
                <Route element={<AdminAuth/>}>
                <Route path="/admin/users" element={<UsersMan />} />
                <Route path="/admin/posts" element={<PostsMan />} />
                <Route path="/admin/reports/:id" element={<ReportsMan/>} />
                <Route path="/admin/home" element={<Dash />} />
                </Route>
              </Routes>
            </Provider>
          </Router>
        </Admin>
      </User>
    </div>
  );
}

export default App;
