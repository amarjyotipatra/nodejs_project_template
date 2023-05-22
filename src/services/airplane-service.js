const {StatusCodes}=require('http-status-codes')
const { AirplaneRepository } =require('../repositories');
const { AppError } = require('../utils/errors/app-error');

const airplaneRepository=new AirplaneRepository();

async function createAirplane(data){
    try{
        const airplane=await airplaneRepository.create(data);
        return airplane;
    }catch(error){
        if(error.name=='SequelizeValidationError'){
            let explanation=[];
            error.errors.map((err)=>{
                explanation.push(err.message)
            })
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Can not create a new Airplane Object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplanes(){
    try {
        const airplanes=await airplaneRepository.getAll();
        return airplanes;
    } catch (error) {
        throw new AppError('Something went Wrong while fetching the data',
        StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getAirplane(id){
    try {
        const airplane=await airplaneRepository.get(id);
        return airplane;
    } catch (error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('The requested airplane is not available',error.statusCode)
        }
        throw new AppError('Something went Wrong while fetching the data of the plane',
        StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function destroyAirplane(id){
    try {
        const result=await airplaneRepository.destroy(id)
        return result;
    } catch (error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('The requested airplane is not available',error.statusCode)
        }
        throw new AppError('Can not delete this airplane',StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function updateAirplane(id,data){
    try {
        const result=await airplaneRepository.update(data,{
            where:{
                id:id
            }
        })
        return result;
    } catch (error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('The requested airplane could not be updated',error.statusCode)
        }
        throw new AppError('Can not delete this airplane',StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports={createAirplane,getAirplanes,getAirplane,destroyAirplane,updateAirplane}