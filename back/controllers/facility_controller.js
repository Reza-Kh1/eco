import asyncHandler from "express-async-handler";
import { facilityModel, companyModel, userModel } from "../models/index.js";
import { errorHandler } from "../middlewares/errorHandler.js";
import { Op, Sequelize } from "sequelize";

const facilitiesOfCompany = asyncHandler(async(req, res, next)=>{
    try {
        const facilities = await facilityModel.findAll({
          where: {
            [Op.and]: [
              {
                year: { // Use table name or alias here to specify the date column
                  [Op.between]: [req.params.startDate, req.params.endDate]
                },
              },
              {
                companyId: req.params.id
              },
              {
                type: {
                  [Op.or]: [0, 1] // Condition for type to be 0 or 1
                }
              }
            ]
          },
          include: {
            model: companyModel,
            attributes: ['name']
          },
          attributes: [
            'companyId',
            [Sequelize.fn('SUM', Sequelize.col('quantity')), 'quantity'], // Use table name or alias for quantity
            'year' // Ensure this references the correct date column explicitly if needed
          ],
          group: [Sequelize.col('Facility.companyId'), Sequelize.col('Facility.year'), 'Company.id'], // Specify table for grouping
          // Adjust the sequelize.col references according to your actual table name or alias
        });

        const formattedFacilities = facilities.map(fc => ({
            companyId: fc.companyId,
            quantity: fc.quantity,
            date: fc.year,
            facilitiesCompanies: fc.Company
          }))
    
        res.send(formattedFacilities);
      } catch (error) {
        console.log(error);
        next(errorHandler(500, error))
      }
})

const facilitiesOfCompanyByUserId = asyncHandler(async(req, res, next)=>{
  try {
    const user = await userModel.findByPk(req.params.id)

    const facilities = await facilityModel.findAll({
      where: {
        [Op.and]: [
          {
            year: { // Use table name or alias here to specify the date column
              [Op.between]: [req.params.startDate, req.params.endDate]
            },
          },
          {
            companyId: user.companyId
          },
          {
            type: {
              [Op.or]: [0, 1] // Condition for type to be 0 or 1
            }
          }
        ]
      },
      include: {
        model: companyModel,
        attributes: ['name']
      },
      attributes: [
        'companyId',
        [Sequelize.fn('SUM', Sequelize.col('quantity')), 'quantity'], // Use table name or alias for quantity
        'year' // Ensure this references the correct date column explicitly if needed
      ],
      group: [Sequelize.col('Facility.companyId'), Sequelize.col('Facility.year'), 'Company.id'], // Specify table for grouping
      // Adjust the sequelize.col references according to your actual table name or alias
    });

    const formattedFacilities = facilities.map(fc => ({
        companyId: fc.companyId,
        quantity: fc.quantity,
        date: fc.year,
        facilitiesCompanies: fc.Company
      }))

    res.send(formattedFacilities);
  } catch (error) {
    console.log(error);
    next(errorHandler(500, error))
  }
})

const allFacilitiesOfCompany = asyncHandler(async(req, res, next)=>{
  try {
    const facilities = await facilityModel.findAll({
      where: {
            companyId: req.params.id
      },

    });

    const modifiedFacilities = facilities.map(facility => ({
      ...facility.toJSON(),
      date: facility.year, // Rename 'year' to 'date'
      year: undefined // Remove the 'year' property
    }));


    if(req.user.type === 0){
      const user = await userModel.findOne({
        where: {companyId: req.params.id}
      })
  
      
      res.send({list:modifiedFacilities, flags:{
        sendToEval: user.sendToEval,
        companyDetailsComplete: user.companyDetailsComplete,
        salesComplete: user.salesComplete,
        knowledgeSalesComplete: user.knowledgeSalesComplete,
        exportsComplete: user.exportsComplete,
        employeesComplete: user.employeesComplete,
        facilitiesComplete: user.facilitiesComplete
      }});
    }
    else{
      res.send(modifiedFacilities)
    }
     

  } catch (error) {
    console.log(error);
    next(errorHandler(500, error))
  }
})

const filterFacilities = asyncHandler(async(req, res, next)=>{
  const {title, trustee} = req.body.obj1
  const {orderBy, tashilate, year} = req.body.obj2



  let whereCondition={}
  whereCondition[Op.and] = [
    {companyId: req.params.id},
    { name: {[Op.substring]: title} },
    { motevali: {[Op.substring]: trustee } }
  ];

  if(year){
    whereCondition[Op.and].push({ year: parseInt(year) });
  }

  if(tashilate){
    whereCondition[Op.and].push({ type: parseInt(tashilate) })
  }

  let orderOption = [];
  if (orderBy === "newest") {
    orderOption.push(["year", "DESC"]);
  } else if (orderBy === "oldest") {
    orderOption.push(["year", "ASC"]);
  } else if (orderBy === "price_ascending") {
    orderOption.push(["quantity", "ASC"]);
  } else if (orderBy === "price_descending") {
    orderOption.push(["quantity", "DESC"]);
  }else if (orderBy === "amount_ascending") {
    orderOption.push(["tedad", "ASC"]);
  } else if (orderBy === "amount_descending") {
    orderOption.push(["tedad", "DESC"]);
  }

  try {
    const facilities = await facilityModel.findAll({
      where: whereCondition,
      order: orderOption.length > 0 ? orderOption : null
    })

    const modifiedFacilities = facilities.map(facility => ({
      ...facility.toJSON(),
      date: facility.year, // Rename 'year' to 'date'
      year: undefined // Remove the 'year' property
    }));

    
    res.send(modifiedFacilities)
  } catch (error) {
    console.log(error)
    return next(errorHandler(500, error))
  }
})

const postFacility = asyncHandler(async(req, res, next)=>{
  const {companyId, name, motevali, type, date, quantity, tedad} = req.body

  if(!companyId || !name || !motevali || !type || !date || !(quantity || tedad)){
    return next(errorHandler(404, "All fields are required"))
  }

  try {
    let newFacilityRecord = {}
    if(quantity){
      newFacilityRecord = await facilityModel.create({companyId, name, motevali, type, quantity, year:date})
    }else if(tedad){
      newFacilityRecord = await facilityModel.create({companyId, name, motevali, type, tedad, year:date})
    }
    
    const user = userModel.update({facilitiesComplete: true},{
      where:{id: req.user.id}
    })
    
    res.send(newFacilityRecord)
  } catch (error) {
    console.log(error)
    return next(errorHandler(404, error))
    
  }
})

const updateFacility = asyncHandler(async(req, res, next)=>{
  const {companyId, name, motevali, type, date, quantity, tedad} = req.body

  try {
    let updatedRecord = {}
    if(quantity){
      updatedRecord = await facilityModel.update({
        ...req.body, 
        msg:"",
        quantity: parseFloat(quantity),
        tedad:null, 
        year:date}, {
          where: {id: req.params.id}
        })
    }else if(tedad){
      updatedRecord = await facilityModel.update({
        ...req.body, 
        msg:"",
        tedad: parseInt(tedad),
        quantity:null, 
        year:date}, {
          where: {id: req.params.id}
        })
    }

    res.send(updatedRecord)
  } catch (error) {
    console.log(error)
    return next(errorHandler(500, error))
    
  }
})

const deleteFacility = asyncHandler(async(req, res, next)=>{
  try {
    const deleted = await facilityModel.destroy({where:{id:req.params.id}})

    if (deleted > 0) {
      res.send("successfully deleted")
    } else {
      return next(errorHandler(400,'No facility found with the provided ID'));
    }
  } catch (error) {
    console.log(error)
    return next(errorHandler(500, error))
    
  }
})

export {
    facilitiesOfCompany,
    allFacilitiesOfCompany,
    filterFacilities,
    postFacility,
    updateFacility,
    deleteFacility,
    facilitiesOfCompanyByUserId
}