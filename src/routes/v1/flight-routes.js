const express=require('express');
const router=express.Router();
const { FlightController } = require('../../controllers');
const { FlightMiddlewares }=require('../../middlewares')

router.post("/",
             FlightMiddlewares.validateCreateRequest,
             FlightController.createFlight)  //  /api/v1/flights

//GET  /api/v1/flights?trip=MUM-DEL
router.get("/",FlightController.getAllFlights)

//UPDATE  /api/v1/flights/:id
router.patch("/:id",FlightController.updateFlight)

//GET  /api/v1/flights/:id
router.get("/:id",FlightController.getFlight)

//PATCH /api/v1/flights/seats
router.patch("/:flightId/seats",
              FlightMiddlewares.validateUpdateSeatsRequest,
              FlightController.updateSeats
            );

module.exports=router