const express = require('express')
const { getUsers, blockUser, UnblockUser, adminLogin, getAllPosts, getAllPost, getAllComments, getAllReports, ViewSingleReport, blockReport, ViewSingleReportJob, getAllJob, blockJob } = require('../controllers/admin')
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

router.get('/allreports',check,getAllReports)

router.get('/singlereports/:id',ViewSingleReport)

router.patch('/blockPosts/:id',blockReport)

// JOB MANAGEMENT

router.get('/singleJobreport/:id',ViewSingleReportJob)

router.get('/allJobs',check,getAllJob)

router.patch('/blockJobs/:id',blockJob)





module.exports = router