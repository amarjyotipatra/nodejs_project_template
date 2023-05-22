const express=require('express');
const router=express.Router();
const { AirplaneController } = require('../../controllers');
const { AirplaneMiddlewares }=require('../../middlewares')

router.post("/",
             AirplaneMiddlewares.validateCreateRequest,
             AirplaneController.createAirplane)  //  /api/v1/airplanes

             //GET  /api/v1/airplanes
router.get("/",AirplaneController.getAirplanes)   

           //GET  /api/v1/airplanes/:id
router.get("/:id",AirplaneController.getAirplane) 

//DELETE   /api/v1/airplanes/:id
router.delete("/:id",AirplaneController.destroyAirplane)

//UPDATE  /api/v1/airplanes/:id
router.patch("/:id",AirplaneController.updateAirplane)

module.exports=router