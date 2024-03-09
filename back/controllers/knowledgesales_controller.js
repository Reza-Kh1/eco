import asyncHandler from "express-async-handler";
import { errorHandler } from "../middlewares/errorHandler.js";
import { knowledgeSalesModel, companyModel, userModel } from "../models/index.js";
import { Op } from "sequelize";

const knowledgeSalesForAllCompanyOnSpecificDate = asyncHandler(async(req, res, next)=>{

    try {
        const knowledgeSales = await knowledgeSalesModel.findAll({
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
    
        function convertToPersianNumbers(input) {
          const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
          return input.toString().replace(/\d/g, x => persianNumbers[x]);
        }
    
        const totalQuantity = knowledgeSales.reduce((acc, sale) => acc + sale.quantity, 0);
    
        // Sort sales by quantity in ascending order
        const sortedSales = knowledgeSales.sort((a, b) => a.quantity - b.quantity);
    
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
    
        // Since we're adding "Others" last, the final list may not be sorted by quantity or percentage.
        // If you need it sorted by percentage, you can sort `salesAboveThreshold` here.
    
        res.send(salesAboveThreshold);
      } catch (error) {
        console.log(error);
        next(errorHandler(500,"server error"))
      }
    
})

const knowledgeSalesOfCompany = asyncHandler(async(req, res, next)=>{
  try {
    const knowledgeSales = await knowledgeSalesModel.findAll({
      
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

  const formattedKnowledgeSales = knowledgeSales.map(sale => ({
    companyId: sale.companyId,
    quantity: sale.quantity,
    date: sale.year,
    knowledgeSalesCompanies: sale.Company
  }))


    res.send(formattedKnowledgeSales);
  } catch (error) {
    console.log(error)
    next(errorHandler(500, error))
  }
})

const knowledgeSalesOfCompanyByUserId = asyncHandler(async(req, res, next)=>{
  try {
    const user = await userModel.findByPk(req.params.id)

    const knowledgeSales = await knowledgeSalesModel.findAll({
      
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

  const formattedKnowledgeSales = knowledgeSales.map(sale => ({
    companyId: sale.companyId,
    quantity: sale.quantity,
    date: sale.year,
    knowledgeSalesCompanies: sale.Company
  }))


    res.send(formattedKnowledgeSales);
  } catch (error) {
    console.log(error)
    next(errorHandler(500, error))
  }
})

const allKnowledgeSalesOfCompany = asyncHandler(async(req, res, next)=>{
  try {
    const kSales = await knowledgeSalesModel.findAll({
      where:{companyId: req.params.id}
    })

    const user = await userModel.findOne({
      where: {companyId: req.params.id}
    })

    const modifiedKSales = kSales.map(kSale => ({
      ...kSale.toJSON(),
      date: kSale.year, // Rename 'year' to 'date'
      year: undefined // Remove the 'year' property
    }));
    
    res.send({list:modifiedKSales, flags:{
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

const postKnowledgeSale = asyncHandler(async(req, res, next)=>{
  const {companyId, quantity, date} = req.body

  if(!companyId || !quantity || !date){
    return next(errorHandler(404, "All fields are required"))
  }

  try {
    const newKSaleRecord = await knowledgeSalesModel.create({companyId, quantity, year:date})
    const company = await companyModel.findByPk(companyId)
    const eYear = company.dataValues.date


    const kSaleLength = await knowledgeSalesModel.count({
      where:{companyId:companyId}
    })
    if ((parseInt(process.env.LAST_YEAR) - eYear + 1) === kSaleLength){
      const user = userModel.update({knowledgeSalesComplete: true},{
        where:{id: req.user.id}
      })
    }else {
      const user = userModel.update({knowledgeSalesComplete: false},{
        where:{id: req.user.id}
      })
    }
    res.send(newKSaleRecord)
  } catch (error) {
    console.log(error)
    return next(errorHandler(404, error))
    
  }
})

const updateKnowledgeSale = asyncHandler(async(req, res, next)=>{
  try {
    const updatedRecord = knowledgeSalesModel.update(
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
    knowledgeSalesForAllCompanyOnSpecificDate,
    knowledgeSalesOfCompany,
    allKnowledgeSalesOfCompany,
    postKnowledgeSale,
    updateKnowledgeSale, 
    knowledgeSalesOfCompanyByUserId
}