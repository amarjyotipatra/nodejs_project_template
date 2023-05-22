const { StatusCodes } = require('http-status-codes');
const { AirportService } = require('../services');
const { SuccessResponse,ErrorResponse }=require('../utils/common')

//   expecting a post request ==>  '/airports'

async function createAirport(req,res){
    try{
     const airport=await AirportService.createAirport({
        name:req.body.name,
        code:req.body.code,
        address:req.body.address,
        cityId:req.body.address,
     })
      SuccessResponse.data=airport;

     return res.status(StatusCodes.CREATED)
     .json(SuccessResponse)
    }catch(error){
        ErrorResponse.error=error

        return res.status(error.statusCode)
        .json(ErrorResponse)
    }
}

async function getAirports(req,res){
    try {
        const airports=await AirportService.getAirports();
        SuccessResponse.data=airports;

        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error=error

        return res.status(error.statusCode)
        .json(ErrorResponse)
    }
}

// GET  /airplanes/:id
async function getAirport(req,res){
    try {
        const airport=await AirportService.getAirport(req.params.id);
        SuccessResponse.data=airport;

        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error=error

        return res.status(error.statusCode)
        .json(ErrorResponse)
    }
}

async function destroyAirport(req,res){
    try {
        const result=await AirportService.destroyAirport(req.params.id)
        SuccessResponse.data=result;

        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error=error

        return res.status(error.statusCode)
        .json(ErrorResponse)
    }
}

async function updateAirport(req,res){
    try {
        const result=await AirportService.updateAirport(req.params.id,{
            name:req.body.name,
            code:req.body.code,
            address:req.body.address,
            cityId:req.body.address,
        }
        )
        SuccessResponse.data=result;

        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('The requested airport could not be updated',error.statusCode)
        }
        throw new AppError('Can not delete this airport',StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports={createAirport,getAirports,getAirport,destroyAirport,updateAirport}