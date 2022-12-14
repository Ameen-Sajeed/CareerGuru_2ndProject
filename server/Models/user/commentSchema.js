const mongoose = require('mongoose')
const posts = require('../../Models/user/PostSchema')
const CommentSchema = new mongoose.Schema({

   userId:{
    type:String,
    required:true,
    ref:"users",
   },

   postId:{
    type:String,
    required:true,

   },

   comment:{
    type:String,
    max:500,
    ref:posts

   },

   likes:{
    type:Array,
    default:[],
   }
   
        
    
},
{timestamps:true}

)

const CommentModel = mongoose.model('Comments',CommentSchema)
module.exports=CommentModel