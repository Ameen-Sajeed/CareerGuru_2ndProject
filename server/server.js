const express = require('express')
const app = express()
const dotenv =require('dotenv')
const cors=require('cors')
const userRouter = require('./Routes/users')
const adminRouter = require('./Routes/admin')
const cookieParser = require("cookie-parser")

dotenv.config()





const {connectDb}=require('../server/helpers/Dbconnect')
connectDb()


app.use(cors())
app.use(cookieParser()) 
app.use(express.json())
app.use('/',userRouter)
app.use('/admin',adminRouter)


app.listen(5000,()=>


    console.log(`server is running on port 5000`)
)