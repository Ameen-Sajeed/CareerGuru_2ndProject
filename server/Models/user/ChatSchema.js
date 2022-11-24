const mongoose = require('mongoose')

const ChatSchema = new mongoose.Schema({

  
   members:{
    type:Array,
   }
     
    
},
{timestamps:true}

)

const ChatModel = mongoose.model('Chats',ChatSchema)
module.exports=ChatModel