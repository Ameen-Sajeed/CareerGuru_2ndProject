const User = require('../Models/user/userSchema')
const bcrypt = require('bcrypt');
const Post = require('../Models/user/PostSchema')
const jwt= require('jsonwebtoken')
const multer = require('multer')
const nodemailer = require('nodemailer')



/* -------------------------------------------------------------------------- */
/*                               REGISTER USERS                               */
/* -------------------------------------------------------------------------- */

const PostSignUp = async(req,res)=>{
    console.log(req.body);

    try {
        
        let {username,email,phone,password}=req.body
        password= await bcrypt.hash(password,10)
      const user =  new User({
        username,
        email,
        phone,
        password
      })
      console.log(user);
      await user.save()
      res.status(200).json({res:user})
        
    } catch (error) {
        console.log("error");
    }
}

/* -------------------------------------------------------------------------- */
/*                               LOGIN FOR USERS                              */
/* -------------------------------------------------------------------------- */

const PostLogin = async (req,res)=>{
 console.log(req.body,)
    try {
        const {email,password}=req.body;
        const user= await User.findOne({email})
        console.log(user,"lklklklk");
        if(!user || user.status==="inactive"){
         return  res.status(400).json("user not found")

        }


         const auth = await bcrypt.compare(password,user.password);

         if(!auth)
        return res.status(400).json("wrong password")

        const id='8394n43x14n384n1njk'
        const usertoken=jwt.sign({id}, process.env.JWT_KEY,{
            expiresIn:"365d",
        })
         console.log(usertoken);
      
        return res.status(200).json({state:"ok",usertoken:usertoken,user:user})
        
    } catch (error) {
        console.log(error);
    }
}


/* -------------------------------------------------------------------------- */
/*                                UPDATE USERS                                */
/* -------------------------------------------------------------------------- */

const UpdateUser =async(req,res)=>{
    if(req.body.userId === req.params.id){
 
        if(req.body.password){
            try{
                req.body.password= await bcrypt.hash(req.body.password,10)

            }catch(err){
                return res.status(500).json(err)
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id,{
                $set: req.body,
            })
            res.status(200).json("Account has been updated")
        }catch(err){
            return res.status(500).json(err)
        }
    } 
    else {
        return res.status(403).json("You can update only your account")
    }

}

/* -------------------------------------------------------------------------- */
/*                                 DELETE USER                                */
/* -------------------------------------------------------------------------- */

const deleteUser=async(req,res)=>{
    if(req.body.userId === req.params.id){
 
        try{
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted succesfully")

        } catch(err) {
            return res.status(500).json(err)
        }
    } 
    else {
        return res.status(403).json("You can delete only your account")
    }
}

/* -------------------------------------------------------------------------- */
/*                                 FOLLOW USER                                */
/* -------------------------------------------------------------------------- */

const followUser = async(req,res)=>{

    console.log("heeyey");
    console.log(req.body.id);
    console.log(req.params.id);

    if(req.body.id !== req.params.id){
        try{

        
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.id)
            if(!user.followers.includes(req.body.id)){
                await user.updateOne({ $push: {followers: req.body.id}});
                await currentUser.updateOne({ $push: {followings: req.params.id}});
                res.status(200).json("user has been followed")

            } else{
                res.status(403).json("you already follow this user")
            }

        }catch(err){
            res.status(500).json(err)
        }
    } else{
        res.status(403).json("you can't follow yourself")
    }
}

/* -------------------------------------------------------------------------- */
/*                                UNFOLLOW USER                               */
/* -------------------------------------------------------------------------- */

const unfollowUser = async (req,res)=>{

    if(req.body.userId !== req.params.id){
        try{

            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({ $pull: {followers: req.body.userId}});
                await currentUser.updateOne({ $pull: {followings: req.params.id}});
                res.status(200).json("user has been unfollowed")

            } else{
                res.status(403).json("you don't follow this user")
            }

        }catch(err){
            res.status(500).json(err)
        }
    } else{
        res.status(403).json("you can't unfollow yourself")
    }
}

/* -------------------------------------------------------------------------- */
/*                                CREATE A POST                               */
/* -------------------------------------------------------------------------- */



const createPost = async (req,res)=>{
    // console.log(req.body);
    // console.log(req.file);
    // try{
    //     const post = new Post({
    //         userId:req.params.id,
    //         image: req.file.filename,
    //         post: req.body.post,
    //     })

    //     post.save().then(data => {
    //         console.log(data);
    //         res.json(data)
    //     }).catch(error => {
    //         res.json(error)
    //     })
    // } catch (error) {
    //     console.log(error);
    // }

    console.log(req.body);
    const newPost = new Post(req.body)
    try {

        const savedPost = await newPost.save();
        res.status(200).json(savedPost)
    } catch (err) {
        res.status(500).json(err)
        
    }
}



/* -------------------------------------------------------------------------- */
/*                               UPDATE  A POST                               */
/* -------------------------------------------------------------------------- */

const updatePost=async(req,res)=>{

    try {

        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
    
            await post.updateOne({$set:req.body});
            res.status(200).json("the post has been updated")
    
        }
        else{
            res.status(403).json("you can update only your post")
        }
        
    } catch (err) {
        res.status(500).json(err)
    }

  
}

/* -------------------------------------------------------------------------- */
/*                                DELETE A POST                               */
/* -------------------------------------------------------------------------- */

const deletePost= async(req,res)=>{
    try {

        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
    
            await post.deleteOne();
            res.status(200).json("the post has been deleted")
    
        }
        else{
            res.status(403).json("you can delete only your post")
        }
        
    } catch (err) {
        res.status(500).json(err)
    }
}

/* -------------------------------------------------------------------------- */
/*                                 LIKE A POST                                */
/* -------------------------------------------------------------------------- */

const LikePost = async(req,res)=>{

    try {

        const post = await Post.findById(req.params.id)
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes: req.body.userId}});
            res.status(200).json("The Post has been liked")
        }
        else {
            await post.updateOne({$pull:{likes: req.body.userId}});
            res.status(200).json("The post has been disliked")
        }
        
    } catch (err) {
        res.status(500).json(err)
        
    }
}

/* -------------------------------------------------------------------------- */
/*                                 GET A POST                                 */
/* -------------------------------------------------------------------------- */

const getPost=async(req,res)=>{

    try {

        const post =  await Post.findById(req.params.id)
           res.status(200).json(post)
        
    } catch (err) {
        res.status(500).json(err)
        
    }

}

/* -------------------------------------------------------------------------- */
/*                           GET ALL TIMELINE POSTS                           */
/* -------------------------------------------------------------------------- */

const getAllPosts = async (req,res)=>{

    try {
        const currentUser=await User.findById(req.params.userId)
        const userPosts=await Post.find({userId:currentUser._id}).sort({createdAt:-1})
        const friendPosts=await Promise.all(
            currentUser.followings.map((friendId)=>{
                return Post.find({userId:friendId}).sort({createdAt:-1})
            })
        )
        res.json(userPosts.concat(...friendPosts))
    } catch (error) {
        res.json(error)
        
    }

}

/* -------------------------------------------------------------------------- */
/*                                 FIND USERS                                 */
/* -------------------------------------------------------------------------- */

const findUsers = async(req,res)=>{
    try {

        User.find().sort({_id:-1}).limit(3).then(response =>{
            res.status(200).json(response)
        }).catch(error =>{
            res.json(error)
        })
        
    } catch (error) {
        console.log(error);
    }

}

/* -------------------------------------------------------------------------- */
/*                              GET USER BY POST                              */
/* -------------------------------------------------------------------------- */

const getUserPost=async(req,res)=>{
    console.log('kkkkkkkkkkkkkkkkkkkkk');
   
    const userId = req.query.userId;
    console.log(userId);
    const username = req.query.username;
    try {
      const user = userId
        ? await User.findById(userId)
        : await User.findOne({ username: username });
      const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
  }


module.exports={PostSignUp,PostLogin,
    UpdateUser,deleteUser,
    followUser,
    unfollowUser,createPost,
    updatePost,
    deletePost,LikePost,
    getPost,getAllPosts,findUsers,getUserPost}