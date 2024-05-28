const service=require("../model/servicesModel")
const getallServices=async(req,res)=>{
  try{
    const data=await service.find()
    if(!data){
      res.status(404).json({message:"no data found"})
    }
    else{
      res.status(200).json(data)
    }

  }catch(error){
    console.log("services fetching error")
  }
}


const singleService=async(req,res)=>{
  try{
    const id=req.params.id
    const data=await service.findOne({_id:id})
    if(!data){
      res.status(404).json({message:"No data found"})
    }
    else{
      res.status(200).json(data)
    }

  }catch(error){
    console.log("fetching single service error",error)
  }
}




module.exports={getallServices,singleService}