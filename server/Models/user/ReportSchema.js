const mongoose = require('mongoose')
const posts = require('../user/PostSchema')
const ReportSchema = new mongoose.Schema({

   userId:{
    type:String,
    required:true,
    ref:"users"


   },

   postId:{
    type:String,
    required:true,

   },

   Content:{
    type:String,
   },      
    
},
{timestamps:true}

)

const ReportModel = mongoose.model('Reports',ReportSchema)
module.exports=ReportModel