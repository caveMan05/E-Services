const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema = mongoose.Schema({
  username: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  phone: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
})

//Hashing password 

userSchema.pre("save",async function(next){
  if(!this.isModified("password")){
    next()
  }
  try{
    const saltRound=await bcrypt.genSalt(10)
    const hashPassword=await bcrypt.hash(this.password,saltRound)
    this.password=hashPassword
  }catch(error){
    console.log("hashing password error",error)
  }
    
})


//generating token 

userSchema.methods.generateToken=async function(){
  try{
    return jwt.sign({
        userId:this._id.toString(),
        isAdmin:this.isAdmin,
        email:this.email,
        username:this.userSchema
      },
       process.env.JWT_SECRET_KEY,
       {
        expiresIn:"5d"
       }
    )
    
  }catch(error){
    console.log(error)
  }
}

const User=new mongoose.model("User",userSchema)

module.exports=User