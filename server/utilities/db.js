const mongoose=require("mongoose")
const dbUrl=process.env.DB
const connectDB=async()=>{
  try{
    await mongoose.connect(dbUrl);
    console.log("Database connected successfully")

  }catch(error){
    console.log("Database connection error",error)
  }
}

module.exports=connectDB