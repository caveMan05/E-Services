const mongoose=require("mongoose")

const contactSchema=mongoose.Schema({
  username:{
    type:String,
    require:true
  },
  email:{
    type:String,
    require:true
  },
  message:{
    type:String,
    require:true
  }
})

const contact=new mongoose.model("contact",contactSchema)

module.exports=contact