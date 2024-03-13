import asyncHandler from "express-async-handler";
import {
  companyModel,
  userModel,
  employeeModel,
  knowledgeSalesModel,
  saleModel,
  exportModel
} from "../models/index.js";
import { errorHandler } from "../middlewares/errorHandler.js";
import { Op } from "sequelize";

const excel = asyncHandler(async (req, res, next) => {
  try {

    const filterYear = req.body.filterYear || 1401
    const name = req.body.name || ""
    const application = req.body.application || ""
    const product = req.body.product || ""
    const technologyField = req.body.technologyField || ""
    const companyCode = req.body.companyCode || ""
    const sort = parseInt(req.query.sort) || 5
    const take = parseInt(req.query.take, 10) || 10; // Provide a default value if not specified
    const skip = parseInt(req.query.skip, 10) || 1;  // Provide a default value if not specified
    


    let result = null
    let response = null
    let final = []


    const result_seed = await companyModel.findAndCountAll({
      where: {
        userId: null,
        name: { [Op.substring]: name },
        application: { [Op.substring]: application },
        product: { [Op.substring]: product },
        technologyField: { [Op.substring]: technologyField },
        companyCode: { [Op.substring]: companyCode }

      },

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
        name: { [Op.substring]: name },
        application: { [Op.substring]: application },
        product: { [Op.substring]: product },
        technologyField: { [Op.substring]: technologyField },
        companyCode: { [Op.substring]: companyCode }
      }

      //offset: take * (skip - 1), 
      //limit: take, 
    });

    result = result_seed.rows.concat(result_type5.rows)

    for (let i = 0; i < result.length; i++) {
      let employee = await employeeModel.findOne({
        where: {
          year: filterYear,
          companyId: result[i].id
        }

      })
      if (!employee) {
        employee = {
          year: filterYear,
          quantity: 0,
          companyId: result[i].id
        }
      }

      let sale = await saleModel.findOne({
        where: {
          year: filterYear,
          companyId: result[i].id
        }
      })

      if (!sale) {
        sale = {
          year: filterYear,
          quantity: 0,
          compantId: result[i].id
        }
      }

      let ksale = await knowledgeSalesModel.findOne({
        where: {
          year: filterYear,
          companyId: result[i].id
        }
      })
      if (!ksale) {
        ksale = {
          year: filterYear,
          quantity: 0,
          compantId: result[i].id
        }
      }

      let exp = await exportModel.findOne({
        where: {
          year: filterYear,
          companyId: result[i].id
        }
      })

      if (!exp) {
        exp = {
          year: filterYear,
          quantity: 0,
          compantId: result[i].id
        }
      }

            final.push({
                id: result[i].id,
                companyCode: result[i].companyCode,
                name: result[i].name,
                application: result[i].application,
                technologyField: result[i].technologyField,
                product: result[i].product,
                date: result[i].date,
                filterYear: filterYear,
                employee : employee.quantity,
                sale : sale.quantity,
                ksale : ksale.quantity,
                exp : exp.quantity,

      })


    }


    if (sort === 1) {
      final.sort((a, b) => b.employee - a.employee);
    }
    else if (sort === 2) {
      final.sort((a, b) => b.sale - a.sale);
    }
    else if (sort === 3) {
      final.sort((a, b) => b.ksale - a.ksale);
    }
    else if (sort === 4) {
      final.sort((a, b) => b.exp - a.exp);
    }


    response = {
      totalPages: Math.ceil(final.length / take),
      companies: final.slice((skip - 1) * take, skip * take)
    };

        
        
        
    
        res.send(response);
      } catch (error) {
        console.log(error);
        next(errorHandler(500, error))
      }
    
})

export {
  excel
}