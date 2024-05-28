const jwt=require("jsonwebtoken")
const verifyTokenMiddleware=async(req,res,next)=>{
  const token=req.header("Authorization")
  if(!token){
    return res.status(404).json({message:"Unauthorized http request"})
  }
  const jwtToken=token.replace("Bearer", "").trim()
  try{
  const verifiedToken= jwt.verify(jwtToken,process.env.JWT_SECRET_KEY)
  req.user=verifiedToken
  next()

  }catch(error){
    console.log("token verification error")
  }
}

module.exports=verifyTokenMiddleware