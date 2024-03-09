import asyncHandler from "express-async-handler";
import { employeeModel, companyModel, userModel } from "../models/index.js";
import { errorHandler } from "../middlewares/errorHandler.js";
import { Op } from "sequelize";

const allEmployeesOfCompany = asyncHandler(async (req, res, next)=>{
    try {
      const employees = await employeeModel.findAll({
        where:{companyId: req.params.id}
      })

      const user = await userModel.findOne({
        where: {companyId: req.params.id}
      })

    

      const modifiedEmployees = employees.map(employee => ({
        ...employee.toJSON(),
        date: employee.year, // Rename 'year' to 'date'
        year: undefined // Remove the 'year' property
      }));
      
      res.send({list:modifiedEmployees, flags:{
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

const employeesForAllCompanyOnSpecificDate = asyncHandler(async(req, res, next) =>{
    try {
        const employees = await employeeModel.findAll({
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
    
        if (employees.length === 0) {
          return res.send([]);
        }
    
        function convertToPersianNumbers(input) {
          const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
          return input.toString().replace(/\d/g, x => persianNumbers[x]);
        }
    
        const totalQuantity = employees.reduce((acc, employee) => acc + employee.quantity, 0);
    
        // Sort employees by quantity in ascending order
        const sortedEmployees = employees.sort((a, b) => a.quantity - b.quantity);
    
        let cumulativePercentage = 0;
        let othersQuantity = 0;
        const employeesAboveThreshold = [];
        sortedEmployees.forEach(employee => {
          const percentage = (employee.quantity / totalQuantity) * 100;
          if (cumulativePercentage + percentage <= 5) {
            othersQuantity += employee.quantity;
            cumulativePercentage += percentage;
          } else {
            employeesAboveThreshold.push({
              value: employee.quantity,
              name: `${employee.Company.name} - ${'%' + convertToPersianNumbers(percentage.toFixed(2))}`,
            });
          }
        });
    
        // Add the "Others" category if there is any quantity accumulated
        if (othersQuantity > 0) {
          employeesAboveThreshold.push({
            name: `سایر - ${'%' + convertToPersianNumbers(cumulativePercentage.toFixed(2))}`,
            value: othersQuantity,
          });
        }
    
        res.send(employeesAboveThreshold);
      } catch (error) {
        console.log(error);
        next(errorHandler(500,"server error!"))
      }
})

const employeesOfCompany = asyncHandler(async(req, res, next)=>{
  try {
    const employees = await employeeModel.findAll({
      
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

  const formattedEmployees = employees.map(employee => ({
    companyId: employee.companyId,
    quantity: employee.quantity,
    date: employee.year,
    employeesCompanies: employee.Company
  }))

    res.send(formattedEmployees);
  } catch (error) {
    console.log(error)
    next(errorHandler(500,error))
  }
})

const employeesOfCompanyByUserId = asyncHandler(async(req, res, next)=>{
  try {
    const user = await userModel.findByPk(req.params.id)

    const employees = await employeeModel.findAll({
      
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

  const formattedEmployees = employees.map(employee => ({
    companyId: employee.companyId,
    quantity: employee.quantity,
    date: employee.year,
    employeesCompanies: employee.Company
  }))

    res.send(formattedEmployees);
  } catch (error) {
    console.log(error)
    next(errorHandler(500,error))
  }
})

const postEmployees = asyncHandler(async(req, res, next)=>{
  const {companyId, quantity, date} = req.body

  if(!companyId || !quantity || !date){
    return next(errorHandler(404, "All fields are required"))
  }

  try {
    const newEmployeeRecord = await employeeModel.create({companyId, quantity, year:date})
    const company = await companyModel.findByPk(companyId)
    const eYear = company.dataValues.date


    const employeeLength = await employeeModel.count({
      where:{companyId:companyId}
    })
    if ((parseInt(process.env.LAST_YEAR) - eYear + 1) === employeeLength){
      const user = userModel.update({employeesComplete: true},{
        where:{id: req.user.id}
      })
    }else {
      const user = userModel.update({employeesComplete: false},{
        where:{id: req.user.id}
      })
    }
    res.send(newEmployeeRecord)
  } catch (error) {
    console.log(error)
    return next(errorHandler(404, error))
    
  }
})

const updateEmployee = asyncHandler(async(req, res, next)=>{

  try {
    const updatedRecord = employeeModel.update(
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
    allEmployeesOfCompany,
    employeesForAllCompanyOnSpecificDate,
    employeesOfCompany,
    postEmployees,
    updateEmployee,
    employeesOfCompanyByUserId
}