const User = require('../Models/user/userSchema')
const bcrypt = require('bcrypt')

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

const PostLogin = async (req,res)=>{
 console.log(req.body,)
    try {
        const {email,password}=req.body;
        const user= await User.findOne({email})
         if(!user){
            return res.json({error:"User not found"})
         }

         const auth = await bcrypt.compare(password,user.password);
         console.log(auth,"hey");

         if(auth){
            console.log("entered");
         }
         if (res.status(201)) {
            console.log('hai');
            return res.json({state:"ok"})
        }else{
            console.log('hello');
            return res.json({error:"error"});
        }
        
    } catch (error) {
        console.log(error);
    }
}

module.exports={PostSignUp,PostLogin}