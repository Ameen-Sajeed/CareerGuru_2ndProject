const express = require('express')
const { getUsers, blockUser, UnblockUser, adminLogin, getAllPosts, getAllPost, getAllComments, getAllReports, ViewSingleReport } = require('../controllers/admin')
const check = require('../middlewares/verify')
const router = express.Router()




router.post('/login',adminLogin)

// USER MANAGEMENT

router.get('/users',check,getUsers)

router.patch('/blockUsers/:id',blockUser)

router.put('/UnblockUsers/:id',UnblockUser)

// POST MANAGEMENT

router.get('/allpost',getAllPost)

router.get('/allcomments',getAllComments)

router.get('/allreports',getAllReports)

router.get('/singlereports/:id',ViewSingleReport)

module.exports = router