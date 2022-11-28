const express = require('express')
const multer = require('multer')
const { PostSignUp, PostLogin, UpdateUser, deleteUser, followUser, unfollowUser, createPost, findJob,
    updatePost, deletePost, LikePost, getPost, getAllPosts, findUsers, getUserPost, verifyOtp, createComment, addComment, getPostComments, createjob, findCloseUsers, userPost, createVidPost, createChat, userChats, findChats, addMessage, getMessages, getUser, ReportPost, addReports, getReport, getJObs, jobRequests } = require('../controllers/users');
const check = require('../middlewares/verify');
const router = express.Router()
var upload = require('../helpers/multer')

//  multer init

// router.post('/post/upload', upload.single('file'), (req, res) => {
//     try {
//         res.json("success")
//     } catch (error) {
//         res.json(error)
//     }
//   })
  


// REGISTER AND LOGIN

router.post('/signup',PostSignUp)
router.post('/login',PostLogin)
router.post('/verifyOtp',verifyOtp)

// CRUD OF USERS

router.put('/:id',UpdateUser )
router.delete('/:id',deleteUser)
router.put('/follow/:id',followUser)
router.put('/unfollow/:id',unfollowUser)
router.get('/findUsers',check,findUsers)
router.get('/:id',getUserPost)
router.get('/closefriends/:id',findCloseUsers)
router.get('/getUser/:id',getUser)

// CRUD OF POSTS

router.post('/createPost',upload.single('image'),createPost)
router.put('/post/:id',updatePost)
router.delete('/delpost/:id',deletePost)
router.put('/post/like/:id',LikePost)
router.get('/post/:id',getPost)
router.get('/post/timeline/:userId',getAllPosts)
router.post('/addcomment/:id',addComment)
router.get('/getcomments/:id',getPostComments)
router.post('/reportPost/:id',ReportPost)
// CRUD OF JOBS

router.post('/createJob',createjob)
router.get('/job/getjob',findJob)
router.get ('/findjob/:id',getJObs)
router.put('/applyjob/:id',jobRequests)



// PROFILE 

router.get('/profile/:id',userPost)


// CHATS

router.post('/createChat',createChat)
router.get('/chat/:userId',userChats)
router.post('/findchat/:firstId/:secondId',findChats)

// MESSAGES

router.post('/addMessage',addMessage)
router.get('/message/:chatId',getMessages)

// router.post('/addreport/:id',addReports)



module.exports = router