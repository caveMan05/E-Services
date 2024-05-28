const User=require("../model/userModel")
const payment=require("../model/paymentModel")
const services=require("../model/servicesModel")
const bcrypt=require("bcrypt")
const { promise } = require("../Validator/signupValidator")

//Register
const register=async(req,res)=>{
  try{
    const{username,email,phone,password}=req.body
    const verifyEmail=await User.findOne({email})
    if(verifyEmail){
       res.status(404).json({message:"email already exist "})
    }
    else{
      const createUser=await User.create({username,email,phone,password})
      res.status(200).json({message:"User Created Successfully"})
    }

  }catch(error){
    console.log(error)
  }
}

// GET All user DATA

const allUserData=async(req,res)=>{
  try{
    const fetchData=await User.find().select("-password")
    if(!fetchData){
      return res.status(404).json({message:"No data found"})
    }
    res.status(200).json(fetchData)

  }catch(error){
    console.log(error)
  }
}


//Login 
const loginUser=async(req,res)=>{
  try{
    const {email,password}=req.body
    const validEmail=await User.findOne({email})
    if(!validEmail){
      return res.status(404).json({message:"invalid email"})
    }
    const verifyPassword=await bcrypt.compare(password,validEmail.password)
    if(!verifyPassword){
      return res.status(404).json({message:"Invalid Password"})
    }
    else{
      res.status(200).json({message:"logged in",userId:validEmail._id.toString(),token:await validEmail.generateToken()})
    }

  }catch(error){
    console.log("Backend login error",error)
  }
}

//logged in userData

const userData=async(req,res)=>{
  try{
    const data=req.user
    
    if(!data){
      res.status(404).json({message:"No data found"})
    }
    const userId=data.userId
    const info=await User.findOne({_id:userId}).select("-password")
    res.status(200).json(info)

  }catch(error){
    console.log("fetching error in logged in user data")
  }
}

//subscribed service by user 


const subscribedData=async(req,res)=>{
  try{
    const userData=req.user
    const userId=userData.userId
    if(userId){
      const info=await payment.find({userId})
      if(info){
        const fetchData=info.map(async(item)=>{
            const serviceData=await services.findOne({_id:item.serviceId})
            return serviceData
        })
        const allData=await Promise.all(fetchData)
        res.status(200).json(allData)
            
       


      }
      else {
        res.status(404).json({message:"no info"})
      }
    
    }
    else{
      res.status(404).json({message:"no user found"})
    }


  }catch(error){
    console.log("subscribed data fetching ",error)
  }
}



module.exports={register,allUserData,loginUser,userData,subscribedData}