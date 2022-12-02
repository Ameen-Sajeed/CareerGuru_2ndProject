import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileUpdate } from "../../../Features/Auth/authSlice";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import "./Profile.css";
import userinstance from "../../../axios";

function Profile() {
  const userData = useSelector((state) => state.user);
  const userId = userData._id;
  const dispatch = useDispatch();
  const [post, setPost] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [showMOd, SetShowMod] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [Image, setImage] = useState("");
  const [profile, setProfile] = useState({
    username: userData.username,
    bio: userData.bio,
    profilePicture: "",
    phone: userData.phone,
  });

  const handleProfile = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });

    console.log(profile);
  };

  const fileUpload = (e) => {
    console.log("file upload ann");
    setImage(URL.createObjectURL(e.target.files[0]));

    setProfile({
      ...profile,
      profilePicture: e.target.files[0],
    });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    console.log("vannu");
    console.log(profile);
    // if (!profile.phone.match(/^(\+\d{1,3}[- ]?)?\d{10}$/) && profile.phone != '') {
    //   console.log("enter correct mobile number");
    //   setpatternErr({ phone: "Enter A Valid Number" })
    // }  else if (!profile.username.match(/^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/) && profile.username != '') {
    //   console.log("username sheriyalla");
    //   setpatternErr({ username: "Enter A Valid Username eg: christo_123 ,Sto_chriz" })

    // }
    if (!profile.username) {
      setErrorMessage("Name is required");
    } else if (profile.username.length < 3) {
      setErrorMessage("Name must be atleast 3 characters");
    } else if (!profile.username.match(/^[A-Za-z][A-Za-z ]*$/)) {
      setErrorMessage("Enter a valid name");
    }
    //  else if (!profile.phone.match(/^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/)) {
    //   setErrorMessage("Enter a valid Phone number");
    // }
    //  else if (profile?.phone?.length !== 10) {
    //   setErrorMessage("Phone must be 10 characters");
    // } else {
    else {
      const formData = new FormData();
      for (let key in profile) {
        formData.append(key, profile[key]);
      }
      console.log(formData);
      userinstance
        .post(`http://localhost:5000/editProfile/${userId}`, formData)
        .then((response) => {
          console.log(response.data.data, "opopop");
          if (response) {
            dispatch(profileUpdate(response.data.data));
            localStorage.removeItem("user");
            localStorage.setItem("user", JSON.stringify(response.data.data));
            SetShowMod(false);
          } else {
            SetShowMod(false);
          }
        });
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      const res = await userinstance.get(
        `http://localhost:5000/profile/${userId}`
      );
      setPost(res.data);
    };
    fetchPost();
  }, [userId]);

  return (
    <>
      <main class="bg-gray-100 bg-opacity-25 ">
        <div class="lg:w-8/12 lg:mx-auto mb-8">
          <header class="flex flex-wrap items-center p-4 md:py-8">
            <div class="md:w-3/12 md:ml-16">
              <img
                class="w-20 h-20 md:w-40 md:h-40 object-cover rounded-full
                         border-2 border-pink-600 p-1"
                src={PF + userData.profilePicture}
                alt="profile"
              />
            </div>

            <div class="w-8/12 md:w-7/12 ml-4">
              <div class="md:flex md:flex-wrap md:items-center mb-4">
                <h2 class="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">
                  {userData.username}
                </h2>
                <a
                  href="#"
                  class="bg-blue-500 px-2 py-1 
                text-white font-semibold text-sm rounded block text-center 
                sm:inline-block"
                  onClick={() => SetShowMod(true)}
                >
                  Edit profile
                </a>
              </div>

              <ul class="hidden md:flex space-x-8 mb-4">
                <li>
                  <span class="font-semibold">{post.length}</span>
                  post
                </li>

                <li>
                  <span class="font-semibold">
                    {userData?.followers?.length}
                  </span>
                  followers
                </li>
                <li>
                  <span class="font-semibold">
                    {userData.followings.length}
                  </span>
                  following
                </li>
              </ul>

              <div class="hidden md:block">
                <h1 class="font-semibold">{userData.email}</h1>

                <span>{userData.bio}</span>
              </div>
            </div>

            <div class="md:hidden text-sm my-2">
              <h1 class="font-semibold">Mr Travlerrr...</h1>
              <span>Travel, Nature and Music</span>
              <p>Lorem ipsum dolor sit amet consectetur</p>
            </div>
          </header>

          <div class="px-px md:px-3">
            <ul
              class="flex md:hidden justify-around space-x-8 border-t 
                    text-center p-2 text-gray-600 leading-snug text-sm"
            >
              {/* <li>
                <span class="font-semibold text-gray-800 block">136</span>
                posts
              </li> */}
              {/* 
              <li>
                <span class="font-semibold text-gray-800 block">40.5k</span>
                followers
              </li>
              <li>
                <span class="font-semibold text-gray-800 block">302</span>
                following
              </li> */}
            </ul>

            <ul
              class="flex items-center justify-around md:justify-center space-x-12  
                        uppercase tracking-widest font-semibold text-xs text-gray-600
                        border-t"
            >
              <li>
                <a class="inline-block p-3" href="#">
                  <i class="far fa-square text-xl md:text-xs"></i>
                  <span class="hidden md:inline">Posts</span>
                </a>
              </li>
            </ul>
            <div class="flex flex-wrap -mx-px md:-mx-3">
              {post.map((obj) => {
                return (
                  <>
                    {" "}
                    {obj.image ? (
                      <div class="w-1/3 p-px md:px-3">
                        <a href="#">
                          <article class="post bg-gray-100 text-white relative pb-full md:mb-6">
                            <img
                              class="w-full h-full absolute left-0 top-0 object-cover"
                              src={PF + obj.image}
                              alt="image"
                            />

                            <i class="fas fa-square absolute right-0 top-0 m-1"></i>
                            <div
                              class="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute 
                                    left-0 top-0 hidden"
                            >
                              <div
                                class="flex justify-center items-center 
                                        space-x-4 h-full"
                              >
                                <span class="p-2">
                                  <ThumbUpIcon />
                                  {obj.likes.length}
                                </span>
                              </div>
                            </div>
                          </article>
                        </a>
                      </div>
                    ) : (
                      ""
                    )}
                  </>
                );
              })}
            </div>
          </div>
        </div>
        {showMOd ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    {errorMessage && (
                      <div
                        className="p-2 text-center mb-2 text-sm w-44 text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 mx-auto"
                        role="alert"
                      >
                        {" "}
                        {errorMessage}
                      </div>
                    )}

                    <h3 className="text-3xl font-semibold">
                      Edit your details
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => SetShowMod(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  <div className="relative p-6 flex-auto">
                    <label
                      className="p-2 font-semibold text-blue-400"
                      htmlFor=""
                    >
                      Username:
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={profile.username}
                      placeholder="Change Username"
                      onChange={handleProfile}
                    />
                    <label
                      className="p-2 font-semibold text-blue-400"
                      htmlFor=""
                    >
                      Profile Picture:
                    </label>
                    <input
                      className="ml-5"
                      type="file"
                      name="profilePicture"
                      id="file"
                      onChange={fileUpload}
                    />
                    <br /> <br />
                    <label
                      className="p-2 font-semibold text-blue-400"
                      htmlFor=""
                    >
                      Contact-No:
                    </label>
                    <input
                      type="number"
                      name="phone"
                      value={profile.phone}
                      placeholder="Contact-No"
                      onChange={handleProfile}
                    />
                    <label
                      className="p-2 font-semibold text-blue-400"
                      htmlFor=""
                    >
                      Bio:
                    </label>
                    <textarea
                      className="ml-5"
                      type="text"
                      name="bio"
                      value={profile.bio}
                      placeholder="Add bio"
                      onChange={handleProfile}
                    />
                  </div>

                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => SetShowMod(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={handleEdit}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </main>
    </>
  );
}

export default Profile;
