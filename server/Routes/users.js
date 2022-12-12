const express = require("express");
const multer = require("multer");
const {
  PostSignUp,
  PostLogin,
  UpdateUser,
  deleteUser,
  followUser,
  unfollowUser,
  createPost,
  findJob,
  updatePost,
  deletePost,
  LikePost,
  getPost,
  getAllPosts,
  findUsers,
  getUserPost,
  verifyOtp,
  addComment,
  getPostComments,
  createjob,
  findCloseUsers,
  userPost,
  createChat,
  userChats,
  findChats,
  addMessage,
  getMessages,
  getUser,
  ReportPost,
  getJObs,
  jobRequests,
  ReportJob,
  deleteJob,
  JobApply,
  viewJobRequests,
  rejectJobRequests,
  EditProfile,
  SearchUsers,
  getUserLastChats,
  findNotications,
  getMyFollowers,
  getMyFollowings,
  ReadNotification,
  resendOTP,
  acceptJobRequests,
  ResetPassword,
  ForgotPassword,
} = require("../controllers/users");
const check = require("../middlewares/verify");
const router = express.Router();
var upload = require("../helpers/multer");

 /* --------------------------- REGISTER AND LOGIN --------------------------- */

router.post("/signup", PostSignUp);
router.post("/login", PostLogin);
router.post("/verifyOtp", verifyOtp);
router.post("/resendOtp", resendOTP);


 /* ------------------------------ CRUD OF USERS ----------------------------- */

router.put("/:id", check, UpdateUser);
router.delete("/:id", check, deleteUser);
router.put("/follow/:id", check, followUser);
router.put("/unfollow/:id", check, unfollowUser);
router.get("/findUsers", check, findUsers);
router.get("/:id", check, getUserPost);
router.get("/closefriends/:id", check, findCloseUsers);
router.get("/getUser/:id", check, getUser);
router.get("/search/users/:id", check, SearchUsers);
router.put('/resetPassword/:id',ResetPassword)
router.post('/forgotPassword',ForgotPassword)

 /* ------------------------------ CRUD OF POSTS ----------------------------- */

router.post("/createPost", upload.single("image"),createPost);
router.put("/post/:id", check, updatePost);
router.delete("/delpost/:id", check, deletePost);
router.put("/post/like/:id", check, LikePost);
router.get("/post/:id", check, getPost);
router.get("/post/timeline/:userId", check, getAllPosts);
router.post("/addcomment/:id", check, addComment);
router.get("/getcomments/:id", check, getPostComments);
router.post("/reportPost/:id", check, ReportPost);
router.get('/notifications/:id',check,findNotications)
router.put('/notification/viewed/:userId' ,check ,ReadNotification)


 /* ------------------------------ CRUD OF JOBS ------------------------------ */

router.post("/createJob", check, createjob);
router.get("/job/getjob", check, findJob);
router.get("/findjob/:id", check, getJObs);
router.put("/applyjob/:id", check, jobRequests);
router.post("/reportJob/:id", check, ReportJob);
router.delete("/deljob/:id", check, deleteJob);
router.post("/applyJob", upload.single("file"),JobApply);
router.get("/viewJobRequests/:id",check, viewJobRequests);
router.put("/rejectjob/:id", check, rejectJobRequests);
router.put('/job/acceptRequest',check,acceptJobRequests)

 /* --------------------------------- PROFILE -------------------------------- */

router.get("/profile/:id", check, userPost);
router.post( "/editProfile/:id",upload.single("profilePicture"),EditProfile);
router.get('/profile/followers/:id',check,getMyFollowers)
router.get('/profile/followings/:id',check,getMyFollowings)


 /* ---------------------------------- CHATS --------------------------------- */

router.post("/createChat", check, createChat);
router.get("/chat/:userId",check, userChats);
router.post("/findchat/:firstId/:secondId", check,findChats);

 /* -------------------------------- MESSAGES -------------------------------- */

router.post("/addMessage", check, addMessage);
router.get("/message/:chatId", check, getMessages);
router.get('/usermessages/:id',check,getUserLastChats)

module.exports = router;
