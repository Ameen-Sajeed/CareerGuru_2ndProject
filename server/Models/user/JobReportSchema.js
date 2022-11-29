const mongoose = require('mongoose')
const JobReportSchema = new mongoose.Schema({

   userId:{
    type:String,
    required:true,
    ref:"users"


   },

   JobId:{
    type:String,
    required:true,

   },

   Content:{
    type:String,
   },      
    
},
{timestamps:true}

)

const JobReportModel = mongoose.model('JobReports',JobReportSchema)
module.exports=JobReportModel