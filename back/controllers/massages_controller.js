import asyncHandler from "express-async-handler";
import { messagesModel } from "../models/index.js";
import { errorHandler } from "../middlewares/errorHandler.js";

const getAllCompanyMassages = asyncHandler(async(req, res, next)=>{
    try {
        const massages = await messagesModel.findAll({
          where: {
            companyId: req.params.id
          },

        });
        res.send(massages);
      } catch (error) {
        console.log(error)
        next(errorHandler(500, error))
      }
})

const postMessage = asyncHandler(async(req, res, next)=>{
    try {
        const {text, companyId} = req.body
        if(!companyId){
            return next(errorHandler(400, "companyId not provided!"))
        }

        if(!text || text===""){
            return next(errorHandler(400, "Text is empty!"))
        }
        const newMessages = await messagesModel.create(req.body);
        res.send(newMessages);
      } catch (error) {
        console.log(error)
        next(errorHandler(500, error))
      }
})

const updateMessage = asyncHandler(async(req, res, next)=>{
    try {
        const {text} = req.body
        if(!text || text === ""){
            return next(errorHandler(400,"Text is empty!"))
        }
        const foundMsg = await messagesModel.findOne({
            where: {
                id: req.params.id
            }
        })

        if(!foundMsg){
            return next(errorHandler(404, "Massage not found!"))
        }
        const result = await messagesModel.update(
          req.body, {
          where: {
            id: req.params.id
          }
        })
  
  
        res.send(result);
  
      } catch (error) {
        console.log(error)
        return next(errorHandler(500,error))
  
      }
})

const deleteMessage = asyncHandler(async(req, res, next)=>{
    try {
        const destroyed = await messagesModel.destroy(
            {
              where: {
                id : req.params.id,
              }
            })
            
        res.send("destroyed")
    } catch (error) {
        next(errorHandler(500,error))
        
    }
})

export {
    getAllCompanyMassages,
    postMessage,
    updateMessage,
    deleteMessage
}