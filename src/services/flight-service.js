const {StatusCodes}=require('http-status-codes')
const { FlightRepository } =require('../repositories');
const { AppError } = require('../utils/errors/app-error');
const { Op } = require('sequelize')

const flightRepository=new FlightRepository();

async function createFlight(data){
    try{
        const flight=await flightRepository.create(data);
        return flight;
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


async function updateFlight(id,data){
    try {
        const result=await flightRepository.update(data,{
            where:{
                id:id
            }
        })
        return result;
    } catch (error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('The requested flight could not be updated',error.statusCode)
        }
        throw new AppError('Can not delete this flight',StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getAllFlights(query){
 let customFilter={};
 const endingTripTime=" 23:59:00";
 let sortFilter=[];
 //trips- MUM-DEL
 if(query.trips){
     [departureAirportId,arrivalAirportId]=query.trips.split("-");
     customFilter.departureAirportId=departureAirportId;
     customFilter.arrivalAirportId=arrivalAirportId;
 }
 if(query.price){
    [minPrice,maxPrice]=query.split("-");
    customFilter.price= {
        [Op.between] : [minPrice,(maxPrice==undefined)? 20000 : maxPrice]
    }
 }
 if(query.travellers){
    customFilter.totalSeats={
        [Op.gte]:query.travellers
    }
 }
 if(query.tripDate){
    customFilter.tripDate={
        [Op.between]:[query.tripDate,query.tripDate + endingTripTime]
    }
 }
 if(query.sort){
    let params=query.sort.split(",");
    let sorts=params.map((param)=>{
        param.split("_");
    })
    sortFilter=sorts
 }
 try {
    const flights=await flightRepository.getAllFlights(customFilter,sortFilter);
    return flights;
 } catch (error) {
    throw new AppError('Something went Wrong while fetching al the flights',
        StatusCodes.INTERNAL_SERVER_ERROR)
 }
}

module.exports={createFlight,getAllFlights,updateFlight}