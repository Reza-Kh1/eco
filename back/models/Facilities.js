import { Sequelize, DataTypes } from 'sequelize';
import {sequelize} from '../config/config.js'

const facilityModel = sequelize.define('Facility', {
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
    name: {
        type: Sequelize.STRING
    },
    year: {
        type: Sequelize.INTEGER
    },
    quantity:{
        type: Sequelize.FLOAT
    },
    type: {
        // role type
        // 0: mali(mostaghim), 1: mali(gheire mostagim) , 2:khedmat, 3:tahsilgar 4:gheir mali
        type: Sequelize.INTEGER,
        // defaultValue: 1,
    },
    motevali:{
        type: Sequelize.STRING
    },
    tedad:{
        type: Sequelize.INTEGER
    },
    evalApproved:{
        type: Sequelize.BOOLEAN,
    },
    msg: {
        type: DataTypes.STRING
    }     
},
    {
        tableName:"facilities"
    }
);

export default facilityModel;
