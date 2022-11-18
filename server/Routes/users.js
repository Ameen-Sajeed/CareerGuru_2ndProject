const express = require('express')
const multer = require('multer')
const { PostSignUp, PostLogin, UpdateUser, deleteUser, followUser, unfollowUser, createPost, 
    updatePost, deletePost, LikePost, getPost, getAllPosts, findUsers, getUserPost, verifyOtp, createComment, addComment, getPostComments } = require('../controllers/users');
const check = require('../middlewares/verify');
const router = express.Router()
var upload = require('../helpers/multer')





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

// CRUD OF POSTS

router.post('/createPost',upload.array('image'),createPost)
router.put('/post/:id',updatePost)
router.delete('/post/:id',deletePost)
router.put('/post/like/:id',LikePost)
router.get('/post/:id',getPost)
router.get('/post/timeline/:userId',getAllPosts)
router.post('/addcomment/:id',addComment)
router.get('/getcomments/:id',getPostComments)

module.exports = router