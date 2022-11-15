
const jwt = require("jsonwebtoken")


const check =async (req, res, next) => {
    try {
        console.log("Check middleware")

        let token = req.headers["x-access-token"]
        console.log(req.headers,"hey");
        if(token){
            // authHeader = authHeader.replaceAll('"',"")
            // const token = authHeader.split(" ")[1]

            console.log(token,"yuyuyuy");
        }
        const user = jwt.verify(token, process.env.JWT_KEY)
        console.log(user,"jkjkj");
       if(user){
        req.user=user
        next()
       }else{
        res.send({ status: "errors", data: "no user" })
       }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: "errors", data: error.message })
    }

}

module.exports = check;