import asyncHandler from "express-async-handler";
import { companyModel, userModel } from "../models/index.js";
import { errorHandler } from "../middlewares/errorHandler.js";
import { Op } from "sequelize";

const getAllComany = asyncHandler(async(req, res, next)=>{
    try {
      

        
        // Parsing integers from request query parameters
        const take = parseInt(req.query.take, 10) || 10; // Provide a default value if not specified
        const skip = parseInt(req.query.skip, 10) || 1;  // Provide a default value if not specified
        const text = req.query.text || ""
    
        let result = null
        let response = null
        if(req.user.type === 4){
          result = await companyModel.findAndCountAll({
            include: [{
              model: userModel,
              where: { [Op.and]:{type: 0, sendToEval: true} }
            }],
            where: {
              userId: { [Op.not]: null },
              name: {[Op.substring]: text}},
            offset: take * (skip - 1), 
            limit: take, 
          });

          response = {
            totalPages: Math.ceil(result.count / take), // Total pages, not total items
            companies: result.rows,
          };
        }
        else {
          
          const result_seed = await companyModel.findAndCountAll({
            
            where: {
              
              userId: null ,
              name: {[Op.substring]: text}},
            //offset: take * (skip - 1), 
            //limit: take, 
          });

          const result_type5 = await companyModel.findAndCountAll({
            include: [{
              model: userModel,
              where: { type: 5 }
            }],
            where: {
              
              userId: { [Op.not]: null },
              name: {[Op.substring]: text}},
            //offset: take * (skip - 1), 
            //limit: take, 
          });

          result = result_seed.rows.concat(result_type5.rows)

          
          
          response = {
            totalPages: Math.ceil(result.length / take),
            companies:result.slice((skip-1)*take, skip*take)
          };

        }
        
        
    
        // The result object contains both the count of total records matching the criteria
        // and the array of records for the current page based on limit and offset
        // const response = {
        //   totalPages: Math.ceil(result.count / take), // Total pages, not total items
        //   companies: result.rows,
        // };
    
        res.send(response);
      } catch (error) {
        console.log(error);
        next(errorHandler(500, error))
      }
})

const getComanyInfo = asyncHandler(async(req, res, next)=>{
  try {
    const company = await companyModel.findOne({
       where: { id: req.params.id }

  });
    res.send(company);
  } catch (error) {
    console.log(error)
    next(errorHandler(500, error))
  }
})

const getComanyInfoByUserId = asyncHandler(async(req, res, next)=>{
  try {
    const company = await companyModel.findOne({
      where: {userId: req.params.id}
    })

    const formattedCompany = {
      name: company?.name || "",
      id: company?.id || "",
      application: company?.application || "",
      product: company?.product || "",
      technologyField: company?.technologyField || "",
      date: company?.date || "",
      msg:company?.msg || ""
    }

    const user = await userModel.findByPk(req.params.id)
    const companyDetailsComplete = user.companyDetailsComplete || false;
    const salesComplete = user.salesComplete || false
    const knowledgeSalesComplete = user.knowledgeSalesComplete || false
    const exportsComplete = user.exportsComplete || false
    const employeesComplete = user.employeesComplete || false
    const facilitiesComplete = user.facilitiesComplete || false
    const sendToEval = user.sendToEval|| false


    const [count, updatedUser] = await userModel.update({
      sendToEval,
      companyDetailsComplete,
      salesComplete,
      knowledgeSalesComplete,
      exportsComplete,
      employeesComplete,
      facilitiesComplete
      
    }, {
      where: {id: req.params.id},
      returning: true
    }) 

    req.user = updatedUser[0].dataValues

    res.send({list:formattedCompany, flags:{
      sendToEval: req.user.sendToEval,
      companyDetailsComplete: req.user.companyDetailsComplete,
      salesComplete: req.user.salesComplete,
      knowledgeSalesComplete: req.user.knowledgeSalesComplete,
      exportsComplete: req.user.exportsComplete,
      employeesComplete: req.user.employeesComplete,
      facilitiesComplete: req.user.facilitiesComplete
    }})
  } catch (error) {
    console.log(error)
    next(errorHandler(500, error))
  }
  //console.log("hi")
})

const postCompany = asyncHandler(async(req, res, next)=>{
  const {name, userId, application, product, technologyField, date} = req.body

  

  if(!name || !userId || !application || !product || !technologyField || !date){
    return next(errorHandler(404, "All fields are required!"))
  }

  try {
    const newCompany = await companyModel.create({userId, name, application, product, technologyField, date})
    const data = await userModel.findByPk(userId)

    data.companyDetailsComplete = true
    data.companyId = newCompany.id
    
   await data.save()
    
  const formattedCompany = {
    userId: newCompany.userId,
    companyId: newCompany.id,
    name: newCompany.name, 
    application: newCompany.application, 
    product: newCompany.product, 
    technologyField: newCompany.technologyField, 
    date: newCompany.date,
    msg: newCompany.msg
  }

  res.send(formattedCompany)
  } catch (error) {
    console.log(formattedCompany)
    return next(errorHandler(500, error))
  }
})

const updateCompany = asyncHandler(async(req, res, next)=>{
  const {userId} = req.body

  if(!userId){
    return next(errorHandler(404, "UserId not found"))
  }
  try {
    const company = await companyModel.update(
      {...req.body,
      msg:""}, {
        where: { userId: userId}
    })
    res.send(company)
  } catch (error) {
      console.log(error)
      return next(errorHandler(500,error))
  }
})

export {
    getAllComany, 
    getComanyInfo,
    getComanyInfoByUserId,
    postCompany,
    updateCompany
}