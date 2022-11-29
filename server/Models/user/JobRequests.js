const mongoose = require('mongoose')
const JobRequetsSchema = new mongoose.Schema({

    Applicant:{
    type:String,
    // required:true,

   },
   
   AppliedBy:{
    type:String,

   },


   JobId:{
    type:String,
    required:true,

   },

    PostedBy:{
    type:String,
    required:true,

   },

   Resume:{
    type:String,
   },      
    
},
{timestamps:true}

)

const JobRequestModel = mongoose.model('JobRequests',JobRequetsSchema)
module.exports=JobRequestModel