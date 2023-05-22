const { StatusCodes }=require('http-status-codes');
const { ErrorResponse }= require('../utils/common');
const { AppError } = require('../utils/errors/app-error');

function validateCreateRequest(req,res,next){
    if(!req.body.modeNumber){
        ErrorResponse.message='Something went wrong while creating Model Number';
        ErrorResponse.error=new AppError(['Model number not found in the incoming request in correct format'],StatusCodes.BAD_REQUEST)

        return res.status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse)
    }
    next();
}

module.exports={validateCreateRequest}