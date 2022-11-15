const express = require('express')
const multer = require('multer')
const { PostSignUp, PostLogin, UpdateUser, deleteUser, followUser, unfollowUser, createPost, 
    updatePost, deletePost, LikePost, getPost, getAllPosts, findUsers, getUserPost } = require('../controllers/users');
const check = require('../middlewares/verify');
const router = express.Router()


// Multer init
const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, './public/images');
    },
    filename(req, file, callback) {
        callback(null,file.originalname);
    },
});

const upload = multer({ storage:storage});


// for Uploading Images

router.post('/upload', upload.single('file'), (req, res) => {
    console.log("hey reached");
    try {
        res.json("success")
    } catch (error) {
        res.json(error)
    }
})

// REGISTER AND LOGIN

router.post('/signup',PostSignUp)
router.post('/login',PostLogin)

// CRUD OF USERS

router.put('/:id',UpdateUser )
router.delete('/:id',deleteUser)
router.put('/:id/follow',followUser)
router.put('/:id/unfollow',unfollowUser)
router.get('/findUsers',check,findUsers)
router.get('/:id',getUserPost)

// CRUD OF POSTS

router.post('/createPost',createPost)
router.put('/post/:id',updatePost)
router.delete('/post/:id',deletePost)
router.put('/post/:id/like',LikePost)
router.get('/post/:id',getPost)
router.get('/post/timeline/:userId',getAllPosts)

module.exports = router