import asyncHandler from "express-async-handler";
import {saleModel, companyModel, userModel} from '../models/index.js'
import { errorHandler } from "../middlewares/errorHandler.js";
import { Op } from "sequelize";

const salesForAllCompanyOnSpecificDate = asyncHandler(async(req,res,next)=>{
    
    try {
        const sales = await saleModel.findAll({
            where: {
              year: req.params.date
            },
            include: [{
              model: companyModel,
              attributes: ['name']
            }],
            attributes: ['companyId', 'quantity'],
          });

          if (sales.length === 0) {
            return res.send([]);
          }

          function convertToPersianNumbers(input) {
            const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
            return input.toString().replace(/\d/g, x => persianNumbers[x]);
          }
      
          const totalQuantity = sales.reduce((acc, sale) => acc + sale.quantity, 0);
      
          // Sort sales by quantity in ascending order
          const sortedSales = sales.sort((a, b) => a.quantity - b.quantity);
      
          let cumulativePercentage = 0;
          let othersQuantity = 0;
          const salesAboveThreshold = [];
          sortedSales.forEach(sale => {
            const percentage = (sale.quantity / totalQuantity) * 100;
            if (cumulativePercentage + percentage <= 5) {
              othersQuantity += sale.quantity;
              cumulativePercentage += percentage;
            } else {
              salesAboveThreshold.push({
                value: sale.quantity,
                name: `${sale.Company.name} - ${'%' + convertToPersianNumbers(percentage.toFixed(2))}`,
              });
            }
          });
      
          // Add the "Others" category if there is any quantity accumulated
          if (othersQuantity > 0) {
            salesAboveThreshold.push({
              name: `سایر - ${'%' + convertToPersianNumbers(cumulativePercentage.toFixed(2))}`,
              value: othersQuantity,
            });
          }
      
          res.send(salesAboveThreshold);
    } catch (error) {
        console.log(error)
        return next(errorHandler(500, error))
        
    }
})

const salesOfCompany = asyncHandler(async(req, res, next)=>{
    try {
        const sales = await saleModel.findAll({
          where: {
            [Op.and]: [
              {
                year: {
                  [Op.between]: [req.params.startDate, req.params.endDate]
                },
              },
              {
                companyId: req.params.id
              }
            ]
          },
          include: {
            model: companyModel,
            attributes: ['name']
          },
          attributes: [
            'companyId', 'quantity', 'year'
          ],
        });
    
        // Map over sales to include the company name directly
        // const formattedSales = sales.map(sale => ({
        //   ...sale.get({ plain: true }), // This extracts the Sequelize object into a plain JS object
        //   companyName: sale.salesCompanies.name // Add the company name at the top level
        // }));

        const formatterSales = sales.map(sale => ({
          companyId: sale.companyId,
          quantity: sale.quantity,
          date: sale.year,
          salesCompanies: sale.Company
        }))
    
        res.send(formatterSales); // Send back the formatted sales
      } catch (error) {
        console.log(error);
        next(errorHandler(500, error))
  }
})

const salesOfCompanyByUserId = asyncHandler(async(req, res, next)=>{
  try {
    const user = await userModel.findByPk(req.params.id)

    const sales = await saleModel.findAll({
      where: {
        [Op.and]: [
          {
            year: {
              [Op.between]: [req.params.startDate, req.params.endDate]
            },
          },
          {
            companyId: user.companyId
          }
        ]
      },
      include: {
        model: companyModel,
        attributes: ['name']
      },
      attributes: [
        'companyId', 'quantity', 'year'
      ],
    });
    
    const formatterSales = sales.map(sale => ({
      companyId: sale.companyId,
      quantity: sale.quantity,
      date: sale.year,
      salesCompanies: sale.Company
    }))

    res.send(formatterSales); // Send back the formatted sales
  } catch (error) {
    console.log(error);
    next(errorHandler(500, error))
}
})

const allSalesOfCompany = asyncHandler(async(req, res, next) =>{
  try {
    const sales = await saleModel.findAll({
      where:{companyId: req.params.id}
    })

    const user = await userModel.findOne({
      where: {companyId: req.params.id}
    })

    const modifiedSales = sales.map(sale => ({
      ...sale.toJSON(),
      date: sale.year, // Rename 'year' to 'date'
      year: undefined // Remove the 'year' property
    }));
    
    res.send({list: modifiedSales, flags:{
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

const postSale = asyncHandler(async(req, res, next)=>{
  const {companyId, quantity, date} = req.body

  if(!companyId || !quantity || !date){
    return next(errorHandler(404, "All fields are required"))
  }

  try {
    const newSaleRecord = await saleModel.create({companyId, quantity, year:date})
    const company = await companyModel.findByPk(companyId)
    const eYear = company.dataValues.date


    const salesLength = await saleModel.count({
      where:{companyId:companyId}
    })
    if ((parseInt(process.env.LAST_YEAR) - eYear + 1) === salesLength){
      const user = userModel.update({salesComplete: true},{
        where:{id: req.user.id}
      })
    }else {
      const user = userModel.update({salesComplete: false},{
        where:{id: req.user.id}
      })
    }
    res.send(newSaleRecord)
  } catch (error) {
    console.log(error)
    return next(errorHandler(404, error))
    
  }
})

const updateSales = asyncHandler(async(req, res, next)=>{
  try {
    const updatedRecord = saleModel.update(
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
    salesForAllCompanyOnSpecificDate,
    salesOfCompany,
    allSalesOfCompany,
    postSale,
    updateSales,
    salesOfCompanyByUserId
}