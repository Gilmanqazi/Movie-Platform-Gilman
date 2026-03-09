const jwt = require("jsonwebtoken")
const redis = require("../config/redis")

 const identifyUser = async (req,res,next)=>{

  const token = req.cookies.token

  if(!token){
    return res.status(404).json({
      message:"Token Not Found"
    })
  }

  const isBlacklisted = await redis.get(token); 

  if (isBlacklisted) {
    return res.status(401).json({ 
      message: "Session expired or logged out. Please login again." 
    });
  }
  

let decoded = null
try{
  decoded = jwt.verify(token,process.env.JWT_SECRET)

  req.user = decoded

  next()

}catch(err){
console.log(err)
return res.status(404).json({
  message:"Token not authorized"
})
}
 }


module.exports = identifyUser