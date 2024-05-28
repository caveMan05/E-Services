const user=require("../model/userModel")
const contacts=require("../model/contactsModel")


//All users in data base


const getAllUsers=async(req,res)=>{
  try{
    const verifyAdmin=req.user
    
    if(verifyAdmin.isAdmin){
      const data= await user.find().select("-password")
      if(!data){
        return res.status(404).json({message:"No data found"})
      }
      else{
        return res.status(200).json(data)
      }
    }else{
      return res.status(404).json({message:"Access denied"})
    }

  }catch(error){
    console.log("admin all users fetching error")
  }
}


//delete User from Database

const deleteUser=async(req,res)=>{
  try{
    const verifyAdmin=req.user
    if(verifyAdmin.isAdmin){
      const userId=req.params.id
      const removeItem=await user.deleteOne({_id:userId})
      //console.log(removeItem)
      if(removeItem.deletedCount>0){
        return res.status(200).json({message:"User deleted"})
      }
      else{
        return res.status(404).json({message:"Deletion error"})
      }
  }else{
    res.status(404).json({messgae:"Access Denied"})
  }


  }catch(error){
    console.log("user deletion error",error)
  }
}

//single user info to update

const getUserInfo=async(req,res)=>{
  try{
    const verifyAdmin=req.user
    if(verifyAdmin.isAdmin){
      const userId=req.params.id
      const userInfo=await user.findOne({_id:userId}).select("-password")
      if(!userInfo){
        return res.status(404).json({message:"No data found"})
      }
      else{
        return res.status(200).json(userInfo)
      }
    }else{
      return res.status(404).json({message:"Access denied "})
    }

  }catch(error){
    console.log(error)
  }
}

//update user

const updateUser=async(req,res)=>{
  try{
    const updatedData=req.body
    const id=req.params.id
    const verifyAdmin=req.user
    if(verifyAdmin.isAdmin){
      const editUser=await user.updateOne({_id:id},{
        $set:updatedData
      })
      //console.log(editUser)
      if(editUser.modifiedCount>0){
        return res.status(200).json({message:"user updated"})
      }
      else{
        return res.status(404).json({messgae:"Backend Error 404"})
      }
    }

  }catch(error){
    console.log(error)
  }
}



//all contacts in db 

const getAllContacts=async(req,res)=>{
  try{
    const verifyAdmin=req.user
    if(verifyAdmin.isAdmin){
      const data=await contacts.find()
      if(!data){
        return res.status(404).json({message:"No data found"})
      }
      else{
        res.status(200).json(data)

      }
    }
    else{
      return res.status(404).json({message:"Access denied"})
    }

  }catch(error){
    console.log("error in fetching all contacts")
  }
}


//delete contact 

const deleteContact=async(req,res)=>{
  try{
    const verifyAdmin=req.user
    if(verifyAdmin.isAdmin){
      const id=req.params.id
      const removeItem=await contacts.deleteOne({_id:id}) 
      if(removeItem.deletedCount>0){
        return res.status(200).json({message:"Message Deleted"})
      }
      else{
        return res.status(404).json({message:"Deletion error"})
      }

    }
    else{
      return res.status(404).json({message:"Access Denied"})
    }


  }catch(error){
    console.log("admin contact removing error")
  }
}





module.exports={getAllUsers,getAllContacts,deleteUser,updateUser,getUserInfo,deleteContact}