const contacts=require("../model/contactsModel")
const user=require("../model/userModel")
// send message 

const sendMessage=async(req,res)=>{
  try{
    const {username,email,message}=req.body
      const data=await contacts.create({username,email,message})
      return res.status(200).json(data)
    
  }catch(error){
    console.log("message sending error")
  }
}

const allMessages=async(req,res)=>{
  try{
    const data=await contacts.find()
    return res.status(200).json(data)

  }catch(error){
    console.log("message fetching error")
  }
}


module.exports={sendMessage,allMessages}