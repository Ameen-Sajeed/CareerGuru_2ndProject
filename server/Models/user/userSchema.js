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
        required:[true, "email is required"],
        unique:[true,"Email already exists"]
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

    },
    verified:{
        type:String,
        default:"false",
    },
        profilePicture:{
            type:String,
            default:"us.webp"
        },
        coverPicture:{
            type:String,
            default:""
        },
        followers:{
            type:Array,
            default:[]
        },
        followings:{
            type:Array,
            default:[]
        },
        bio:{
            type:String
        },
        Recruits:
        [{
           JobId:{
            type:String
           },
           Designation:{
            type:String
           },
           Company:{
            type:String
           },
            location:{
            type:String
            },
            PostedBy:{
            type:String
            },
            time:{
                type:Date,
            }
           
        }],
        Selected:{
            type:Array
        }
    
},
{timestamps:true}

)

const UserModel = mongoose.model('users',UserSchema)
module.exports=UserModel