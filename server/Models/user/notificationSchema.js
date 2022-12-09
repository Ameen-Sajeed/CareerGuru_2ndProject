const mongoose = require('mongoose')
const NotificationSchema = new mongoose.Schema({

   userId:{
    type:String,
    required:true,
   },

   notification:[{

   user:{
    type:String,
    ref:"users",
   },
   desc:{
    type:String
   },
   status:{
      type:String,
      default:"true"
   },

    time:{
      type:Date,
      default:new Date()
    }

}]
    
},
// {timestamps:true}

)

const NotificationModel = mongoose.model('Notifications',NotificationSchema)
module.exports=NotificationModel