import { Sequelize, DataTypes } from 'sequelize';
import {sequelize} from '../config/config.js'

const employeeModel = sequelize.define('Employee', {
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
    updatedAt: {
        type: Sequelize.DATE
    },
    year: {
        type: Sequelize.INTEGER
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
        tableName:"employees"
    }
);

export default employeeModel;
