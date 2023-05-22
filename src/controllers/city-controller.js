const { StatusCodes } = require('http-status-codes');
const { CityService } = require('../services');
const { SuccessResponse,ErrorResponse }=require('../utils/common')

//   expecting a post request ==>  '/cities'
// req.body {name:'Banglore'}

async function createCity(req,res){
    try{
     const city=await CityService.createCity({
        name:req.body.name,
     })
      SuccessResponse.data=city;

     return res.status(StatusCodes.CREATED)
     .json(SuccessResponse)
    }catch(error){
        ErrorResponse.error=error

        return res.status(error.statusCode)
        .json(ErrorResponse)
    }
}

async function destroyCity(req,res){
    try {
        const result=await CityService.destroyAirplane(req.params.id)
        SuccessResponse.data=result;

        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error=error

        return res.status(error.statusCode)
        .json(ErrorResponse)
    }
}

module.exports={
    createCity,
    destroyCity,
}