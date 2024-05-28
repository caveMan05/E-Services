const validate=(schema)=>async(req,res,next)=>{
  try{
    const parseBody=await schema.parseAsync(req.body);
    req.body=parseBody
    next()

  }catch(err){
    const status=404;
    const message=err.errors[0].message
    //console.log(message)
    const error={
      status,message
    }
    next(error)
  }
}
module.exports=validate