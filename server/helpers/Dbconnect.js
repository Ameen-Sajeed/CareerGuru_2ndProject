const mongoose = require("mongoose")
const uri = process.env.DATABASE_ACCESS

 const connectDb = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
    },()=>console.log("Mongo db connected"))
  } catch (error) {
    console.log(error.message)
  }
}

module.exports= {connectDb}