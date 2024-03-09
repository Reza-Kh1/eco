import asyncHandler from "express-async-handler";
import { exportModel, companyModel, userModel } from "../models/index.js";
import { errorHandler } from "../middlewares/errorHandler.js";
import { Op } from "sequelize";


const exportsForAllCompanyOnSpecificDate = asyncHandler(async(req,res,next)=>{
    try {
        const exports = await exportModel.findAll({
          where: {
            year: req.params.date
          },
          include: [
            {
              model: companyModel,
              attributes: ['name']
            }
          ],
          attributes: ['companyId', 'quantity'],
        });
    
        if (exports.length === 0) {
          return res.send([]);
        }
    
        function convertToPersianNumbers(input) {
          const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
          return input.toString().replace(/\d/g, x => persianNumbers[x]);
        }
    
        const totalQuantity = exports.reduce((acc, exportItem) => acc + exportItem.quantity, 0);
    
        // Sort exports by quantity in ascending order
        const sortedExports = exports.sort((a, b) => a.quantity - b.quantity);
    
        let cumulativePercentage = 0;
        let othersQuantity = 0;
        const exportsAboveThreshold = [];
        sortedExports.forEach(exportItem => {
          const percentage = (exportItem.quantity / totalQuantity) * 100;
          if (cumulativePercentage + percentage <= 5) {
            othersQuantity += exportItem.quantity;
            cumulativePercentage += percentage;
          } else {
            exportsAboveThreshold.push({
              value: exportItem.quantity,
              name: `${exportItem.Company.name} - ${'%' + convertToPersianNumbers(percentage.toFixed(2))}`,
            });
          }
        });
    
        // Add the "Others" category if there is any quantity accumulated
        if (othersQuantity > 0) {
          exportsAboveThreshold.push({
            name: `سایر - ${'%' + convertToPersianNumbers(cumulativePercentage.toFixed(2))}`,
            value: othersQuantity,
          });
        }
    
        res.send(exportsAboveThreshold);
      } catch (error) {
        console.log(error);
        next(errorHandler(500,"server error"))
      }
})

const exportsOfCompany = asyncHandler(async(req, res, next)=>{
  try {
    const exports = await exportModel.findAll({
      
      where:{
        [Op.and]:[
          {year :{
            [Op.between]: [req.params.startDate, req.params.endDate]
            // [Op.l]: req.params.startdate
        },

        },
        {
          companyId : req.params.id
        }
        ]

          
      },
      include: {
        model: companyModel,
        attributes: ['name']
      },
      attributes: [
          'companyId','quantity', 'year'
      ],
      

  });
  const formattedExports = exports.map(exp => ({
    companyId: exp.companyId,
    quantity: exp.quantity,
    date: exp.year,
    exportsCompanies: exp.Company
  }))


    res.send(formattedExports);
  } catch (error) {
    console.log(error)
    next(errorHandler(500, error))
  }
})

const exportsOfCompanyByUserId = asyncHandler(async(req, res, next)=>{
  try {
    const user = await userModel.findByPk(req.params.id)

    const exports = await exportModel.findAll({
      
      where:{
        [Op.and]:[
          {year :{
            [Op.between]: [req.params.startDate, req.params.endDate]
            // [Op.l]: req.params.startdate
        },

        },
        {
          companyId : user.companyId
        }
        ]

          
      },
      include: {
        model: companyModel,
        attributes: ['name']
      },
      attributes: [
          'companyId','quantity', 'year'
      ],
      

  });
  const formattedExports = exports.map(exp => ({
    companyId: exp.companyId,
    quantity: exp.quantity,
    date: exp.year,
    exportsCompanies: exp.Company
  }))


    res.send(formattedExports);
  } catch (error) {
    console.log(error)
    next(errorHandler(500, error))
  }
})

const allExportsOfCompany = asyncHandler(async(req, res, next)=>{
  try {
    const exports = await exportModel.findAll({
      where:{companyId: req.params.id}
    })

    const user = await userModel.findOne({
      where: {companyId: req.params.id}
    })

    const modifiedExports = exports.map(exp => ({
      ...exp.toJSON(),
      date: exp.year, // Rename 'year' to 'date'
      year: undefined // Remove the 'year' property
    }));
    
    res.send({list:modifiedExports, flags:{
      sendToEval: user.sendToEval,
      companyDetailsComplete: user.companyDetailsComplete,
      salesComplete: user.salesComplete,
      knowledgeSalesComplete: user.knowledgeSalesComplete,
      exportsComplete: user.exportsComplete,
      employeesComplete: user.employeesComplete,
      facilitiesComplete: user.facilitiesComplete
    }})
  } catch (error) {
    console.log(error)
    next(errorHandler(500, error))
    
  }
})

const postExport = asyncHandler(async(req, res, next)=>{
  const {companyId, quantity, date} = req.body

  if(!companyId || !quantity || !date){
    return next(errorHandler(404, "All fields are required"))
  }

  try {
    const newExportRecord = await exportModel.create({companyId, quantity, year:date})
    const company = await companyModel.findByPk(companyId)
    const eYear = company.dataValues.date


    const exportLength = await exportModel.count({
      where:{companyId:companyId}
    })
    if ((parseInt(process.env.LAST_YEAR) - eYear + 1) === exportLength){
      const user = userModel.update({exportsComplete: true},{
        where:{id: req.user.id}
      })
    }else {
      const user = userModel.update({exportsComplete: false},{
        where:{id: req.user.id}
      })
    }
    res.send(newExportRecord)
  } catch (error) {
    console.log(error)
    return next(errorHandler(404, error))
    
  }
})

const updateExport = asyncHandler(async(req, res, next)=>{
  try {
    const updatedRecord = exportModel.update(
      {...req.body,
      msg:""}, {
      where: {id: req.params.id}
    })

    res.send(updatedRecord)
  } catch (error) {
    console.log(error)
    return next(errorHandler(500, error))
    
  }
  
})

export {
    exportsForAllCompanyOnSpecificDate,
    exportsOfCompany,
    allExportsOfCompany,
    postExport,
    updateExport,
    exportsOfCompanyByUserId
}