const { StatusCodes } = require('http-status-codes');
const { AirplaneService } = require('../services');
const { SuccessResponse,ErrorResponse }=require('../utils/common')

//   expecting a post request ==>  '/airplane'
// req.body {modelNumber:'Airbus A320',capacity:280}

async function createAirplane(req,res){
    try{
     const airplane=await AirplaneService.createAirplane({
        modelNumber:req.body.modelNumber,
        capacity:req.body.capacity
     })
      SuccessResponse.data=airplane;

     return res.status(StatusCodes.CREATED)
     .json(SuccessResponse)
    }catch(error){
        ErrorResponse.error=error

        return res.status(error.statusCode)
        .json(ErrorResponse)
    }
}

async function getAirplanes(req,res){
    try {
        const airplanes=await AirplaneService.getAirplanes();
        SuccessResponse.data=airplanes;

        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error=error

        return res.status(error.statusCode)
        .json(ErrorResponse)
    }
}

// GET  /airplanes/:id
async function getAirplane(req,res){
    try {
        const airplane=await AirplaneService.getAirplane(req.params.id);
        SuccessResponse.data=airplane;

        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error=error

        return res.status(error.statusCode)
        .json(ErrorResponse)
    }
}

async function destroyAirplane(req,res){
    try {
        const result=await AirplaneService.destroyAirplane(req.params.id)
        SuccessResponse.data=result;

        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error=error

        return res.status(error.statusCode)
        .json(ErrorResponse)
    }
}

async function updateAirplane(req,res){
    try {
        const result=await AirplaneService.updateAirplane(req.params.id,{
            modelNumber:req.body.modelNumber,
            capacity:req.body.capacity,
        }
        )
        SuccessResponse.data=result;

        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('The requested airplane could not be updated',error.statusCode)
        }
        throw new AppError('Can not delete this airplane',StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports={createAirplane,getAirplanes,getAirplane,destroyAirplane,updateAirplane}