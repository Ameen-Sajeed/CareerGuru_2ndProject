const User = require('../Models/user/userSchema')
const bcrypt = require('bcrypt')




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
        !user && res.status(400).json("user not found")


         const auth = await bcrypt.compare(password,user.password);
         !auth && res.status(400).json("wrong password")
      
         res.status(200).json(user)
        
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

    if(req.body.userId !== req.params.id){
        try{

            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({ $push: {followers: req.body.userId}});
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



module.exports={PostSignUp,PostLogin,
    UpdateUser,deleteUser,followUser,unfollowUser}