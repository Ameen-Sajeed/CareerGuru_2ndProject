const User = require('../Models/user/userSchema')


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


module.exports={getUsers,blockUser,UnblockUser}