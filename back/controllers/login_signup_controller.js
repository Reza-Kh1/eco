import {userModel} from '../models/index.js';
import { errorHandler } from '../middlewares/errorHandler.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import asyncHandler from "express-async-handler"
import { Op } from 'sequelize';

const register = asyncHandler(async(req, res, next) => {
    const {phoneNumber, type, password, userName, melliNumber} = req.body;
    let newUser
    let hashedPwd

    try {
      
      if( type === 0){
        
        hashedPwd = await bcrypt.hash(password, 10)
        newUser = await userModel.create({phoneNumber, type, password:hashedPwd, companyNumber:userName}, { exclude: ["password"] });
      }
      else {
        hashedPwd = await bcrypt.hash(password || "1234", 10)
        newUser = await userModel.create({phoneNumber, type, password:hashedPwd, melliNumber}, { exclude: ["password"] });
      }
        
        

        const token = jwt.sign({
            user:{
                id: newUser.id,
                type: newUser.type,
                phoneNumber: newUser.phoneNumber
            }
        }, "this is my secret key", {
            expiresIn: "24h"
          });
    
          res.send({
            token: token,
            userName: newUser.userName,
            melliNumber: newUser.melliNumber,
            phoneNumber: newUser.phoneNumber,
            type: newUser.type,
            companyNumber: newUser.companyNumber,
            id: newUser.id

          });
    } catch (error) {
        console.log(error)
        return next(errorHandler(500, error))
        
    }
})

const login = asyncHandler(async(req, res, next) => {
    const {phoneNumber, password} = req.body
    console.log(req.body)

    if(!phoneNumber || !password){
        return next(errorHandler(400, "All fields are required"))
    }
    
    try {
        const user = await userModel.findOne({
            where: {
              phoneNumber,
            },

        });
        console.log(user)
        if (!user) {
            return next(errorHandler(400, "Wrong credentials!"))
        }
       
        const matched = await bcrypt.compare(
            req.body.password,
            user.dataValues.password
        );
  
        if (!matched) {
            return next(errorHandler(400, "Wrong credentials!"));
        }

        const token = jwt.sign({
            user:{
                id: user.id,
                type: user.type,
                phoneNumber: user.phoneNumber
            }
        }, "this is my secret key", {
            expiresIn: "24h"
        });
        
      
        res.send({
            token: token,
            userName: user.userName,
            melliNumber: user.melliNumber,
            phoneNumber: user.phoneNumber,
            type: user.type,
            companyNumber: user.companyNumber,
            id: user.id

          });
        
    } catch (error) {
        console.log(error)
        next(errorHandler(500, error))
        
    }


})

const getAllusers = asyncHandler(async(req, res, next)=>{
    try {
        const users = await userModel.findAll({
      });
        res.send(users);
      } catch (error) {
        console.log(error)
        next(errorHandler(500, error))
      }
})

const changePassword = asyncHandler(async(req, res, next)=>{
    let password = req.body.currentPassword;
    const user = await userModel.findOne({
      where: {
        id: req.params.id,
      },
    });
    try {
      const hash = await bcrypt.hash(req.body.newPassword, 10);
      const matched = await bcrypt.compare(password, user.dataValues.password);

      if (!matched) {
        return res.send({ success: false });
      }
      // const updatedUser = await Users.updateOne({ email }).set({
      //   password: hash
      // })
      const updatedUser = await userModel.update(
        { password: hash },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      if (!updatedUser) {
        return next(errorHandler(500, "server error"))
      }
      return res.send({ success: true });
    } catch (error) {
      // sails.error(e);
      return next(errorHandler(500, error))
    }
})

const findUsers = asyncHandler(async(req, res, next)=>{
  let {text, skip, take} = req.query
  text = text || ""
  skip = skip || 1
  take = take || 10

  
  

  try {
    const users = await userModel.findAndCountAll({
      where:{
        [Op.or]:[{
          nameAndFamily: {[Op.substring]: text}
        },
        {
          phoneNumber: {[Op.substring]: text}
        },
        {
          melliNumber: {[Op.substring]: text}
        },
        {
          companyNumber: {[Op.substring]: text}
        }]
      },
      offset: take * (skip - 1), // Calculating offset
      limit: take,
    })
    
    res.send({users: users.rows, totalPages: Math.ceil(users.count / take)})
  } catch (error) {
    console.log(error)
    return next(errorHandler(500,error))
    
  }
})

const sendToEval = asyncHandler(async(req,res,next)=>{
  try {console.log("hi")
    const user = await userModel.findOne({
      where: {companyId: req.params.id}
    })

    const companyDetailsComplete = user.companyDetailsComplete || false;
    const salesComplete = user.salesComplete || false
    const knowledgeSalesComplete = user.knowledgeSalesComplete || false
    const exportsComplete = user.exportsComplete || false
    const employeesComplete = user.employeesComplete || false
    let sendFlag = true

    if(!companyDetailsComplete || !salesComplete || !knowledgeSalesComplete || !exportsComplete || !employeesComplete){
      sendFlag = false
    }

    const [count, updatedUser] = await userModel.update({
      sendToEval: sendFlag,
      companyDetailsComplete,
      salesComplete,
      knowledgeSalesComplete,
      exportsComplete,
      employeesComplete
      
    }, {
      where: {companyId: req.params.id},
      returning: true
    }) 

    req.user = updatedUser[0].dataValues

    res.send({
      sendToEval: req.user.sendToEval ,
      companyDetailsComplete: req.user.companyDetailsComplete,
      salesComplete: req.user.salesComplete,
      knowledgeSalesComplete: req.user.knowledgeSalesComplete,
      exportsComplete: req.user.exportsComplete,
      employeesComplete: req.user.employeesComplete
    })
    
  } catch (error) {
    console.log(error)
    return next(errorHandler(500, error))
  }
})

export {
    register,
    login,
    getAllusers,
    changePassword,
    findUsers,
    sendToEval
}