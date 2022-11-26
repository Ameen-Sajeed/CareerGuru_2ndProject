const mongoose = require('mongoose')
const posts = require('../user/PostSchema')
const ReportSchema = new mongoose.Schema({

   userId:{
    type:String,
    required:true,

   },

   postId:{
    type:String,
    required:true,
    ref:posts

   },

   Content:{
    type:String,
   },      
    
},
{timestamps:true}

)

const ReportModel = mongoose.model('Reports',ReportSchema)
module.exports=ReportModel