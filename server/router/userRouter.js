const express=require("express")
const Router=express.Router()
const userController=require("../controller/userController")
const verifyTokenMiddleware=require("../middleware/verifyTokenMiddleware")
const validateMiddleware=require("../middleware/validateMiddleware")
const zodSignup=require("../Validator/signupValidator")
const zodSignin=require('../Validator/signinValidator')

Router.route("/register").post(validateMiddleware(zodSignup),userController.register)
Router.route("/allusers").get(userController.allUserData)
Router.route("/login").post(validateMiddleware(zodSignin),userController.loginUser)
Router.route("/login/user").get(verifyTokenMiddleware,userController.userData)
Router.route("/subscribed").get(verifyTokenMiddleware,userController.subscribedData)

module.exports=Router