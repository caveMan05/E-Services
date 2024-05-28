const express=require("express");
const Router=express.Router()
const servicesController=require("../controller/servicesController")

Router.route("/services").get(servicesController.getallServices)
Router.route("/singleservice/:id").get(servicesController.singleService)

module.exports=Router