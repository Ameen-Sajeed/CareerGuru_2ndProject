const User = require('../Models/user/userSchema')



/* -------------------------------------------------------------------------- */
/*                                 ADMIN LOGIN                                */
/* -------------------------------------------------------------------------- */


const adminLogin = (req,res)=>{

   try {
    
    const {ADMIN_EMAIL,ADMIN_PWD}=process.env
    const {email,password}=req.body

    if(email==ADMIN_EMAIL && password==ADMIN_PWD ){
        console.log("email is matched");
        res.status(200).json("Login Success")
}
else{
    console.log("incorrect email");
    res.status(500).json("Invalid Credentials")

}

   } catch (error) {
    
    console.log(error);
   }
}



/* -------------------------------------------------------------------------- */
/*                                 VIEW USERS                                 */
/* -------------------------------------------------------------------------- */

const getUsers = (req,res)=>{
    // console.log("hiiiii");
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
/*                                 BLOCK USERS                                */
/* -------------------------------------------------------------------------- */

const blockUser = async(req,res)=>{
  try {
    User.findByIdAndUpdate({_id: req.params.id},{
        $set:{
            status:"inactive"
        }
    }).then(response =>{
        if(response) res.status(200).json("user has blocked")
    }).catch(error =>{
        res.json(error)
    })
    
  } catch (error) {
    console.log(error);
  }
}

/* -------------------------------------------------------------------------- */
/*                                UNBLOCK USERS                               */
/* -------------------------------------------------------------------------- */

const UnblockUser = (req,res)=>{
    try {
        User.findByIdAndUpdate({_id: req.params.id},{
            $set:{
                status:"active"
            }
        }).then(response =>{
            if(response) res.status(200).json("user has Unblocked")
        }).catch(error =>{
            res.json(error)
        })
        
      } catch (error) {
        console.log(error);
      }
}


module.exports={getUsers,
    blockUser,UnblockUser,adminLogin}