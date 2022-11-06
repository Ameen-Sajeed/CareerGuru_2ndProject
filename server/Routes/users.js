const express = require('express')
const { PostSignUp, PostLogin, UpdateUser, deleteUser, followUser, unfollowUser } = require('../controllers/users')
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



module.exports = router