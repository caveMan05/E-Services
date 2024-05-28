require("dotenv").config()
const express=require("express");
const connectDB=require("./utilities/db")
const errorMiddleware=require("./middleware/errorMiddleware")
const cors=require("cors")
const port=process.env.PORT
const app=express()

const corsOption={
  origin:"http://localhost:5173",
  method:"GET,POST,PUT,DELETE,PATCH",
  credentials:true
}

app.use(cors(corsOption))
app.use(express.json())
app.use("/api",require("./router/userRouter"))
app.use("/api",require("./router/contactsRouter"))
app.use("/api",require("./router/servicesRouter"))
app.use("/payment",require("./router/paymentRouter"))
app.use("/admin",require("./router/adminRouter"))

app.use(errorMiddleware)
connectDB().then(()=>{
  app.listen(port,()=>{
    console.log(`server running on port : ${port}`)
  })
})
