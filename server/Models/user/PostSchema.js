const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({

   userId:{
    type:String,
    required:true
   },
   description:{
    type:String,
    max:500
   },

   image:{
    type:Array
   },

   likes:{
    type:Array,
    default:[],
   },
   Created: Date,


},
{timestamps:true})

const PostModel = mongoose.model('post',PostSchema)
module.exports=PostModel