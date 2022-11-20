const User = require('../Models/user/userSchema')
const bcrypt = require('bcrypt');
const Post = require('../Models/user/PostSchema')
const jwt= require('jsonwebtoken')
const multer = require('multer')
const nodemailer = require('nodemailer');
const userVerification = require('../Models/user/userVerification');
const CommentModel = require('../Models/user/commentSchema');
const { create } = require('../Models/user/userSchema');
const JobModel = require('../Models/user/JobSchema');
const Jobs = require('../Models/user/JobSchema')

/* ----------------------------- NODEMAILER INIT ---------------------------- */

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "jobseekerj010@gmail.com",
        pass: "onqchtjlalxoxazh",
    }
})

/* -------------------------------------------------------------------------- */
/*                               OTP GERNERATION                              */
/* -------------------------------------------------------------------------- */


const sendOtp = async (result, res) => {
console.log(result,"hey there");
    try {
        const OTP = await (Math.floor(100000 + Math.random() * 900000)).toString()
        console.log("OTP");
        console.log(OTP);
        var senEMail = {
            from: "jobseekerj010@gmail.com",
            to: result.email,
            subject: 'Sending Email My Instagram',
            text: `Hi ${result.username} Your OTP pin has been generated `,
            html: `<h1>Hi ${result.username}</h1><p>Your OTP is ${OTP}</p>`
        }


        let hashOTP = await bcrypt.hash(OTP, 10)
        let verify = await userVerification.findOne({ userId: result._id })
        if (!verify) {
            const userverification = new userVerification({
                userId: result._id,
                Otp: hashOTP,
                Created: Date.now(),
                Expiry: Date.now() + 100000
            })
            await userverification.save()
        } else {
            await userVerification.updateOne({ userId: result._id }, { otp: hashOTP })
        }

        transporter.sendMail(senEMail, function (error, info) {
            console.log("oioioioi");
            if (error) {
                console.log(error,"yuyuuy");
            } else {
                res.json({
                    status: "pending",
                    msg: "Verification otp mail sent",
                    mail: result.email,
                    user: result
                })
            }
        });
    } catch (error) {
        console.log(error);
    }
}

/* -------------------------------------------------------------------------- */
/*                                 VERIFY OTP                                 */
/* -------------------------------------------------------------------------- */


const verifyOtp= async (req, res) => {
    // console.log(req.body.OTP);
    let OtpVerify = await userVerification.findOne({ userId: req.body.user })
    console.log(OtpVerify,"tttttt");
    let correctOtp = await bcrypt.compare(req.body.OTP, OtpVerify.Otp)
    console.log("correctOtp");
    console.log(correctOtp);
    if (correctOtp) {
        await User.updateOne({ _id: req.body.user }, { $set: { verified: 'true' } })
        res.status(200).json({ verified: true })
    } else {
        res.status(200).json({ verified: false, msg: "Incorrect OTP" })
    }
}


/* -------------------------------------------------------------------------- */
/*                               REGISTER USERS                               */
/* -------------------------------------------------------------------------- */

const PostSignUp = async(req,res)=>{
    // console.log(req.body);

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
      await user.save().then((result)=>{
         sendOtp(result,res)
        res.status(200).json({res:user})

      })
        
    } catch (error) {
        console.log(error);
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


    if(req.body.id !== req.params.id){
        try{

        
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.id)
            if(!user.followings.includes(req.body.id)){
              const userF= await user.updateOne({ $push: {followings: req.body.id}});
               const curruser= await currentUser.updateOne({ $push: {followers: req.params.id}});
                res.status(200).json({msg:"user has been followed",user:userF})

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

    console.log(req.body.id,'call reached');
    if(req.body.id !== req.params.id){
        try{

            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.id)
            if(user.followings.includes(req.body.id)){
             const userData=   await user.updateOne({ $pull: {followings: req.body.id}});
                await currentUser.updateOne({ $pull: {followers: req.params.id}});
                res.status(200).json({msg:"user has been unfollowed",user:userData})

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
    // console.log(req.body,"ghjk")
    

    try {
        const postData = new Post({
            userId: req.body.User,
            image: req.file.filename,
            Created: Date.now(),
            description: req.body.Caption
        })
        let result = postData.save()
        if (result) {
            res.status(200).json({ status: true })
        } else {
            res.status(200).json({ status: false })
        }
    } catch (error) {
        console.log(error);
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
//     console.log("hey reached");
// console.log(req.body.userId,"popopo");
// console.log(req.params.id);

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

        User.find().sort({_id:-1}).then(response =>{
            res.status(200).json(response)
        }).catch(error =>{
            res.json(error)
        })
        
    } catch (error) {
        console.log(error);
    }

}


/* -------------------------------------------------------------------------- */
/*                             FIND CLOSE FRIENDS                             */
/* -------------------------------------------------------------------------- */


const findCloseUsers = async(req,res)=>{
console.log("hey");
console.log(req.params.id,"gvhbjn");
    const id = req.params.id
    try {

        User.find({followings
            :id}).then(response =>{
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
    // console.log('kkkkkkkkkkkkkkkkkkkkk');
   
    const userId = req.query.userId;
    // console.log(userId);
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

  /* -------------------------------------------------------------------------- */
  /*                               POST A COMMENT                               */
  /* -------------------------------------------------------------------------- */

  const addComment=async(req,res)=>{
    const comment=new CommentModel(req.body)
    try {
        const comments=await comment.save()
        res.json(comments)
    } catch (error) {
        res.json(error)
    }
 }

 /* -------------------------------------------------------------------------- */
 /*                              GET POST COMMENTS                             */
 /* -------------------------------------------------------------------------- */

 const getPostComments=async(req,res)=>{
    console.log(req.params.id);
    try {
      const postComment=await CommentModel.find({postId:req.params.id}).populate("userId","username")
      res.json(postComment)
        
    } catch (error) {
       res.json(error) 
    }
 }

 /* -------------------------------------------------------------------------- */
 /*                                  ADD A JOB                                 */
 /* -------------------------------------------------------------------------- */

const createjob = async(req,res)=>{
   console.log( req.body,"hjkl;");
    try {
        const newJob = new JobModel(req.body)
         await newJob.save()
         res.status(200).json(newJob)
        
    } catch (error) {
        console.log(error);
    }
}

/* -------------------------------------------------------------------------- */
/*                                 FIND A JOB                                 */
/* -------------------------------------------------------------------------- */
const findJob = async(req,res)=>{
    try {

        JobModel.find().sort({_id:-1}).then(response =>{
            res.status(200).json(response)
        }).catch(error =>{
            res.json(error)
        })
        
    } catch (error) {
        console.log(error);
    }
  
}




module.exports={PostSignUp,PostLogin,
    UpdateUser,deleteUser,
    followUser,
    unfollowUser,createPost,
    updatePost,
    deletePost,LikePost,
    getPost,getAllPosts,findUsers,getUserPost,verifyOtp,addComment,getPostComments,createjob,findJob,findCloseUsers
}