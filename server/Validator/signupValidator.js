const z=require("zod")

const signupSchema=z.object({
  username:z
  .string({required_error:"Name is required"})
  .trim()
  .min(3,{message:"Name is too short"})
  .max(30,{message:"Name is too long "}),
  email:z
  .string({required_error:"Email is required"})
  .email({message:"Not a valid email"}),
  phone:z
  .string({required_error:"Phone number is required"})
  .trim()
  .min(10,{message:"Not a valid phone number"})
  .max(13,{message:"Not a valid phone number "}),
  password:z
  .string({required_error:"Password is required"})
  .trim()
  .min(5,{message:"Password is too weak"})
  .max(255,{message:"Password is too long "}),


})
module.exports=signupSchema