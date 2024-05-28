const z=require("zod")
const signinSchema=z.object({
  email:z
  .string({required_error:"email is required"})
  .email(),
  password:z
  .string({required_error:"Password is required"})
  .trim()
  .min(3,{message:"invalid Password"})
  .max(50,{message:"invalid Password"})
})

module.exports=signinSchema