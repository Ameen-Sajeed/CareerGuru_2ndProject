const express = require('express')
const { PostSignUp, PostLogin, UpdateUser, deleteUser, followUser, unfollowUser, createPost, updatePost, deletePost, LikePost, getPost, getAllPosts } = require('../controllers/users')
const router = express.Router()

// REGISTER AND LOGIN

router.post('/signup',PostSignUp)
router.post('/login',PostLogin)

// CRUD OF USERS

router.put('/:id',UpdateUser )
router.delete('/:id',deleteUser)
router.put('/:id/follow',followUser)
router.put('/:id/unfollow',unfollowUser)

// CRUD OF POSTS

router.post('/post',createPost)
router.put('/post/:id',updatePost)
router.delete('/post/:id',deletePost)
router.put('/post/:id/like',LikePost)
router.get('/post/:id',getPost)
router.get('/post/timeline/all',getAllPosts)

module.exports = router