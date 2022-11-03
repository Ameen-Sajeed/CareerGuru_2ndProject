const express = require('express')
const { PostSignUp, PostLogin } = require('../controllers/users')
const router = express.Router()

router.post('/signup',PostSignUp)
router.post('/login',PostLogin)


module.exports = router