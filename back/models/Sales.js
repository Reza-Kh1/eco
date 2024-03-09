import { Sequelize, DataTypes } from 'sequelize';
import {sequelize} from '../config/config.js'

const saleModel = sequelize.define('Sale', {
  // Model attributes are defined here
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        validate: {
            isUUID: 4,
        },
    },
    createdAt: {
        type: Sequelize.DATE
    },
    year: {
        type: Sequelize.INTEGER
    },
    updatedAt: {
        type: Sequelize.DATE
    },
    quantity:{
        type: Sequelize.FLOAT
    },
    evalApproved:{
        type: Sequelize.BOOLEAN,
    },
    msg: {
        type: DataTypes.STRING
    }     
},
    {
        tableName:"sales"
    }
);

export default saleModel;
