const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const userRouter = require("./Routes/users");
const adminRouter = require("./Routes/admin");
const cookieParser = require("cookie-parser");
const path = require("path");
dotenv.config();

// DB CONNECTION
const { connectDb } = require("../server/helpers/Dbconnect");
connectDb();

// MIDDLEWARES
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/", userRouter);
app.use("/admin", adminRouter);

//PORT
app.listen(5000, () => console.log(`server is running on port 5000`));
