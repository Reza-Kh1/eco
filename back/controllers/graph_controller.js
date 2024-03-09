import asyncHandler from "express-async-handler";
import { connectionModel, nodesModel } from "../models/index.js";
import { errorHandler } from "../middlewares/errorHandler.js";
import { Op } from "sequelize";

const getAllConnections = asyncHandler(async(req, res, next)=>{
    try {
        const connections = await connectionModel.findAll({
          where: {
            year: req.params.date
          }
          // attributes can be specified here if you only need certain fields,
          // but since we're transforming the result, it's not necessary
        });
    
        // Transform each connection into the desired format
        const transformedConnections = connections.map(connection => ({
          source: connection.firstComapyName, // Change to firstComapyName if that's not a typo
          target: connection.secondCompanyName
        }));
    
        res.send(transformedConnections);
      } catch (error) {
        console.log(error);
        next(errorHandler(500, error))
      }
})

const getAllNodesOfCompanies = asyncHandler(async(req, res, next)=>{
  try {
    // Fetch all nodes that match the provided name or are within the specified set of IDs
    const nodes = await nodesModel.findAll({
      where: {
        [Op.or]: [
          { name: req.params.name },
          { id: { [Op.in]: [
                '9846bddc-608f-4a80-bb47-732eb18e5141', '1401b505-b262-4f97-8224-796191134197',
                '2f563ea5-4666-4fd9-90ed-9b2147da3018', '1014014f-65ca-4fe7-91d5-2838259da4b2',
                '22dc4bfd-656f-414e-a7a5-98e7e6618e9e', 'a4ed409b-2d90-4b11-badb-5f26a7594000',
                '2ce85ff3-fa6c-4c77-8c16-657ba72b2703', '8322882c-f58b-4d4a-81dc-07157efe8236',
                '2e1e0b86-c7ac-4a01-a213-4c9bc087f652', 'd7129d16-bafa-4d21-979d-73906862d56f'
              ] } 
          },
        ]
      },
    });
    const updatedNodes = await Promise.all(nodes.map(async (node) => {
      const connection = await connectionModel.findOne({
        where: {
          year: req.params.date,
          secondCompanyName: node.id
        }
      });
      
      // If a matching connection is found, update the node's value to the connection's level
      if (connection) {
        node.dataValues.value = connection.level;
      } else {
        // If no matching connection is found, you can decide to set a default value or leave as is
        node.dataValues.value = node.dataValues.value || 'No matching connection';
      }

      return node;
    }));

    // Prepare and send the response
    res.send(updatedNodes);
  } catch (error) {
    console.log(error);
    next(errorHandler(500, error))
  }
})

export {
    getAllConnections,
    getAllNodesOfCompanies
}