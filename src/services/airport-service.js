const {StatusCodes}=require('http-status-codes')
const { AirportRepository } =require('../repositories');
const { AppError } = require('../utils/errors/app-error');

const airportRepository=new AirportRepository();

async function createAirport(data){
    try{
        const airport=await airportRepository.create(data);
        return airport;
    }catch(error){
        if(error.name=='SequelizeValidationError'){
            let explanation=[];
            error.errors.map((err)=>{
                explanation.push(err.message)
            })
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Can not create a new airport Object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirport(){
    try {
        const airport=await airportRepository.getAll();
        return airport;
    } catch (error) {
        throw new AppError('Something went Wrong while fetching the data',
        StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getAirport(id){
    try {
        const airport=await airportRepository.get(id);
        return airport;
    } catch (error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('The requested airport is not available',error.statusCode)
        }
        throw new AppError('Something went Wrong while fetching the data of the airport',
        StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function destroyAirport(id){
    try {
        const result=await airportRepository.destroy(id)
        return result;
    } catch (error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('The requested airport is not available',error.statusCode)
        }
        throw new AppError('Can not delete this airport',StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function updateAirport(id,data){
    try {
        const result=await airportRepository.update(data,{
            where:{
                id:id
            }
        })
        return result;
    } catch (error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('The requested airport could not be updated',error.statusCode)
        }
        throw new AppError('Can not delete this airport',StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports={createAirport,getAirport,getAirport,destroyAirport,updateAirport}