
//order 

const Razorpay = require("razorpay")
const crypto=require("crypto")
const payments=require("../model/paymentModel")

const order=async(req,res)=>{
  try{
    const razorpay=new Razorpay({
      key_id:process.env.RAZOR_KEY_ID,
      key_secret:process.env.RAZOR_KEY_SECRET
      
    })
    if(!req.body){
      res.status(404).json({message:"Bad Request"})
    }
    const options=req.body 
    const order=await razorpay.orders.create(options)
    if(!order){
      res.status(404).json({message:"Bad request"})
    }
    else{
      res.status(200).json(order)
    }

  }
  catch(error){
    console.log("payment order error",error)
  }
}

const validatePayment=async(req,res)=>{
  try{
    const{razorpay_payment_id,razorpay_order_id,razorpay_signature}=req.body

    const sha=crypto.createHmac("sha256",process.env.RAZOR_KEY_SECRET)
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`)
    const digest=sha.digest("hex")
    if(!digest==razorpay_signature){
      res.status(404).json({message:"Not a valid transaction"})
    }
    else{
      res.status(200).json({message:"valid transaction ",orderId:razorpay_order_id,paymentId:razorpay_payment_id})
    }




  }catch(error){
    console.log("payment validation error" , error)
  }
}

//PAYMENT INFO 

const paymentInfo=async(req,res)=>{
  try{
    const {orderId,paymentId,amount,serviceId,userId}=req.body;
    /*if(!orderId || !paymentId || !amount ){
      return res.status(404).json({message:"Bad Request"})
    }*/
    const Info=await payments.create({orderId,paymentId,amount,serviceId,userId})
    if(!Info){
      res.status(404).json({message:"Payment Unsuccessful"})
    }
    res.status(200).json({message:"Payment Successful "})

  }catch(error){
    console.log(error)
  }
}




module.exports={order,validatePayment,paymentInfo}