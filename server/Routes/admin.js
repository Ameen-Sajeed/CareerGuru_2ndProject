const express = require('express')
const { getUsers, blockUser, UnblockUser, adminLogin, getAllPosts, getAllPost } = require('../controllers/admin')
const check = require('../middlewares/verify')
const router = express.Router()




router.post('/login',adminLogin)

router.get('/users',check,getUsers)

router.patch('/blockUsers/:id',blockUser)

router.put('/UnblockUsers/:id',UnblockUser)

router.get('/allpost',getAllPost)

module.exports = router