const errorMiddleware=(err,req,res,next)=>{
  const status= err.status||"400";
  const message=err.message||"backend error"

  //console.log(message)
  return res.status(status).json({message})
}
module.exports=errorMiddleware