const {StatusCodes}=require('http-status-codes')
const { CityRepository } =require('../repositories');
const { AppError } = require('../utils/errors/app-error');

const cityRepository=new CityRepository();

async function createCity(data){
    try {
        const city=await airplaneRepository.create(data);
        return city;
    } catch (error) {
        if(error.name=='SequelizeValidationError' || error.name=='SequelizeUniqueConstraintError'){
            let explanation=[];
            error.errors.map((err)=>{
                explanation.push(err.message)
            })
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Can not create a new Airplane Object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyCity(id){
    try {
        const result=await cityRepository.destroy(id)
        return result;
    } catch (error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('The requested city is not available',error.statusCode)
        }
        throw new AppError('Can not delete this city',StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports={
    createCity,
    destroyCity
}