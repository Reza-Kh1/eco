import asyncHandler from "express-async-handler";
import {exportModel, 
    companyModel, 
    knowledgeSalesModel,
    saleModel} from '../models/index.js';
import { Sequelize } from "sequelize";
import { errorHandler } from '../middlewares/errorHandler.js';

const totalSales = asyncHandler(async(req,res,next)=>{
    
    try {
        const exports = await exportModel.findAll({
            where: {
                year: req.params.date
            },
            include: [
                {
                    model: companyModel,
                    attributes: ['name'] // Retrieve only the 'name' attribute of the company
                }
            ],
            attributes: [
                [Sequelize.literal('"Company"."name"'), 'companyName'], // Use sequelize.literal to access nested properties
                'quantity'
            ]
        });

        const formattedExports = exports.map(sale => ({
            // companyId: sale.companyId,
            value: sale.quantity,
            name: sale.Company.name// Move the company name up a level
          }));

          const knowledgeSales = await knowledgeSalesModel.findAll({
            
            where:{
                year: req.params.date
                
            },
            include:[
              {
                model : companyModel,
                attributes: ['name']
              }
            ],
            attributes: [
                [Sequelize.literal('"Company"."name"'), 'companyName'], // Use sequelize.literal to access nested properties
                'quantity'
            ],
            

        });
        const formattedKnowledgeSales = knowledgeSales.map(sale => ({
          // companyId: sale.companyId,
          value: sale.quantity,
          name: sale.Company.name // Move the company name up a level
        }));
        

        const sales = await saleModel.findAll({
            
            where:{
                year: req.params.date
                
            },
            include:[
              {
                model : companyModel,
                attributes: ['name']
              }
            ],
            attributes: [
                [Sequelize.literal('"Company"."name"'), 'companyName'], // Use sequelize.literal to access nested properties
                'quantity'
            ],
            

        });
        const formattedSales = sales.map(sale => ({
          // companyId: sale.companyId,
          value: sale.quantity,
          name: sale.Company.name // Move the company name up a level
      }));


      
            const combinedLists = [
                ...formattedKnowledgeSales.map(item => ({ ...item, listName: 'دانش بنیان' })),
                ...formattedExports.map(item => ({ ...item, listName: 'صادرات' })),
                ...formattedSales.map(item => ({ ...item, listName: 'فروش' }))
            ];
            

            const salesSumByCompany = {};

            combinedLists.forEach((element) => {
                const companyName = element.name;
                const value = parseFloat(element.value);
                const listName = element.listName;
            
                // Initialize the company object if it doesn't exist
                if (!salesSumByCompany[companyName]) {
                    salesSumByCompany[companyName] = { total: 0, children: [] };
                }
            
                // Update the total value for the company
                salesSumByCompany[companyName].total += value;
            
                // Check if there's already a child for the listName, and update or add accordingly
                let childIndex = salesSumByCompany[companyName].children.findIndex(child => child.name === listName);
                if (childIndex !== -1) {
                    // Update existing child's value
                    salesSumByCompany[companyName].children[childIndex].value += value;
                } else {
                    // Add a new child for the listName
                    salesSumByCompany[companyName].children.push({ name: listName, value });
                }
            });
            const totalValue = Object.values(salesSumByCompany).reduce((acc, company) => acc + company.total, 0);
            function convertToPersianNumbers(input) {
                const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
                return input.toString().replace(/\d/g, x => persianNumbers[x]);
              }
            // Construct the result with percentages
            const result = Object.keys(salesSumByCompany).map(companyName => {
              const companyTotal = salesSumByCompany[companyName].total;
              const companyPercentage = '%'+ convertToPersianNumbers((companyTotal / totalValue * 100).toFixed(2)) ;
              
              // Calculate percentage for each child
              const childrenWithPerc = salesSumByCompany[companyName].children.map(child => {
                const childPerc = '%'+ convertToPersianNumbers((child.value / companyTotal * 100).toFixed(2)) ;
                return {
                  name: `${child.name} - ${childPerc}`, // Concatenate percentage with name
                  value: child.value
                };
              });
              
              return {
                name: `${companyName} - ${companyPercentage}`,
                value: companyTotal,
                children: childrenWithPerc
              };
            });

            
        res.send(result)
    } catch (error) {
        console.log(error)
        return next(errorHandler(500, error))
        
    }
   
})

export { 
    totalSales
}