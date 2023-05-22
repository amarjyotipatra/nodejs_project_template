const express=require('express');
const router=express.Router();
const { CityController } = require('../../controllers');
const { CityMiddlewares }=require('../../middlewares')

// POST  create a new city /api/v1/cities
router.post("/",
           CityMiddlewares.validateCreateRequest,
           CityController.createCity)

//DELETE    delete a city  /api/v1/cities/:id
router.delete("/:id",
                     CityMiddlewares.validateCreateRequest,
                     CityController.destroyCity)        

module.exports=router