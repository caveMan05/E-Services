const express=require("express")
const Router=express.Router()
const adminController=require("../controller/adminController")
const verifyTokenMiddleware = require("../middleware/verifyTokenMiddleware")

Router.route("/users").get(verifyTokenMiddleware,adminController.getAllUsers)
Router.route("/deleteuser/:id").delete(verifyTokenMiddleware,adminController.deleteUser)
Router.route("/updateuser/:id").patch(verifyTokenMiddleware,adminController.updateUser)
Router.route("/userinfo/:id").get(verifyTokenMiddleware,adminController.getUserInfo)
Router.route("/contacts").get(verifyTokenMiddleware,adminController.getAllContacts)
Router.route("/deletecontact/:id").delete(verifyTokenMiddleware,adminController.deleteContact)




module.exports=Router