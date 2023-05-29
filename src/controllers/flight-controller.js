const { StatusCodes } = require('http-status-codes');
const { FlightService } = require('../services');
const { SuccessResponse,ErrorResponse }=require('../utils/common')

/**
 * POST : /flights 
 * req-body {
 *  flightNumber: 'UK 808',
 *  airplaneId: 'a380',
 *  departureAirportId: 12,
 *  arrivalAirportId: 11,
 *  arrivalTime: '11:10:00',
 *  departureTime: '9:10:00',
 *  price: 2000
 *  boardingGate: '12A',
 *  totalSeats: 120
 * }
 */
async function createFlight(req,res){
    try{
     const flight=await FlightService.createFlight({
        flightNumber:req.body.flightNumber,
        airplaneId:req.body.airplaneId,
        departureAirportId:req.body.departureAirportId,
        arrivalAirportId:req.body.arrivalAirportId,
        departureTime:req.body.departureTime,
        arrivalTime:req.body.arrivalTime,
        price:req.body.price,
        boardingGate:req.body.boardingGate,
        totalSeats:req.body.totalSeats,
     })
      SuccessResponse.data=flight;

     return res.status(StatusCodes.CREATED)
     .json(SuccessResponse)
    }catch(error){
        ErrorResponse.error=error

        return res.status(error.statusCode)
        .json(ErrorResponse)
    }
}

// GET  /flights/query
async function getAllFlights(req,res){
    try{
        const flights=await FlightService.getAllFlights(req.query);
        SuccessResponse.data=flights;
        return res.status(StatusCodes.OK)
        .json(SuccessResponse)
        }catch(error){
            ErrorResponse.error=error;
            return res.status(error.statusCode)
            .json(ErrorResponse)
            }
}


async function updateFlight(req,res){
    try {
        const result=await FlightService.updateFlight(req.params.id,{
            flightNumber:req.body.flightNumber,
        airplaneId:req.body.airplaneId,
        departureAirportId:req.body.departureAirportId,
        arrivalAirportId:req.body.arrivalAirportId,
        departureTime:req.body.departureTime,
        arrivalTime:req.body.arrivalTime,
        price:req.body.price,
        boardingGate:req.body.boardingGate,
        totalSeats:req.body.totalSeats,
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

async function getFlight(req,res){
    try {
        const flight=await FlightService.getFlight(req.params.id);
        return flight;
    } catch (error) {
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError('The requested flight is not available',error.statusCode)
        }
        throw new AppError('Something went Wrong while fetching the data of the flight',
        StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function updateSeats(req,res){
    try {
        const updatedSeats=await FlightService.updateSeats({
            flightId:req.params.flightId,
            seats:req.body.seats,
            dec:req.body.dec,
        })
        SuccessResponse.data=updatedSeats;
        return res.status(StatusCodes.OK)
        .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error=error;
        return res.status(error.statusCode)
        .json(ErrorResponse)
    }
}

module.exports={createFlight,getAllFlights,updateFlight,getFlight,updateSeats,}