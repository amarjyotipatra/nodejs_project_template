const express=require('express');
const router=express.Router();
const { AirportController } = require('../../controllers');
const { AirportMiddlewares }=require('../../middlewares')

router.post("/",
             AirportMiddlewares.validateCreateRequest,
             AirportController.createAirport)  //  /api/v1/airports

             //GET  /api/v1/airports
router.get("/",AirportController.getAirports)   

           //GET  /api/v1/airports/:id
router.get("/:id",AirportController.getAirport) 

//DELETE   /api/v1/airports/:id
router.delete("/:id",AirportController.destroyAirport)

//UPDATE  /api/v1/airports/:id
router.patch("/:id",AirportController.updateAirport)

module.exports=router