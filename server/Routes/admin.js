const express = require('express')
const { getUsers, blockUser, UnblockUser } = require('../controllers/admin')
const router = express.Router()


router.get('/users',getUsers)

router.post('/blockUsers/:id',blockUser)

router.post('/UnblockUsers/:id',UnblockUser)


module.exports = router