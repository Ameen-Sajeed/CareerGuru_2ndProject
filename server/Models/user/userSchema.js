const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    phone:{
        type:Number,
        required:[true, "Phone is required"]
    },
    username:{
        type:String,
        required:[true, "name is required"]
    },
    email:{
        type:String,
        required:[true, "email is required"]
    },
    password:{
        type:String,
        required:[true, "Password is required"]
    },
    date:{
        type:Date,
        default:Date.now

    },
    status:{
        type:String,
        default:"active"

    }
})

const UserModel = mongoose.model('users',UserSchema)
module.exports=UserModel