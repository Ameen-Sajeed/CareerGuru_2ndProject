const express = require('express')
const { getUsers, blockUser, UnblockUser } = require('../controllers/admin')
const router = express.Router()


router.get('/users',getUsers)

router.put('/blockUsers/:id',blockUser)

router.put('/UnblockUsers/:id',UnblockUser)


module.exports = router