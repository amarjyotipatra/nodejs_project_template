const { StatusCodes } = require('http-status-codes');
const Logger=require('../config');
const { AppError } = require('../utils/errors/app-error');

class CrudRepository{

    constructor(model){
        this.model=model;
    }
    
    async create(data){
            const result=await this.model.create(data);
            return result;
    }

    async destroy(data){
            const result=await this.model.destroy({
                where:{
                    id:data
                }
            });
            if(!result){
                throw new AppError('Not able toi find the resource',StatusCodes.NOT_FOUND)
            }
            return result;
    }

    async get(data){
            const result=await this.model.findByPk(data);
            if(!result){
                return new AppError('Not able to find the resource',StatusCodes.NOT_FOUND)
            }
            return result;
    }

    async getAll(){
            return await this.model.findAll()
    }

    async update(id,data){
            return await this.model.update(data,{
                where:{
                    id:id
                }
            })
    }
}

module.exports=CrudRepository