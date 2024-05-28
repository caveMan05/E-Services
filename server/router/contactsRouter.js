const express=require("express")
const Router=express.Router()

const contactsController=require("../controller/contactsController")

Router.route("/sendmessage").post(contactsController.sendMessage)
Router.route("/allmessages").get(contactsController.allMessages)


module.exports=Router