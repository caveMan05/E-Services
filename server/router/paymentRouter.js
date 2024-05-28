const express=require("express")
const Router=express.Router()
const paymentController=require("../controller/paymentController")

Router.route("/order").post(paymentController.order)
Router.route("/validate").post(paymentController.validatePayment)
Router.route("/paymentInfo").post(paymentController.paymentInfo)

module.exports=Router