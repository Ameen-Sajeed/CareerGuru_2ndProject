const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({

   userId:{
    type:String,
   //  required:true
   },
   desc:{
    type:String,
    max:500
   },

   image:{
    type:String
   },
   video:{
      type:String
   },

   likes:{
    type:Array,
    default:[],
   },
   Reports:{
      type:Array,
      default:[],
     },

   Created: Date,


},
{timestamps:true})

const PostModel = mongoose.model('post',PostSchema)
module.exports=PostModel