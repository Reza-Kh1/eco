import { Sequelize, DataTypes } from 'sequelize';
import {sequelize} from '../config/config.js'

const loginHistoryModel = sequelize.define('LoginHistory', {
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
    userId: {
        type: Sequelize.UUID,
        allowNull: false
    }   
},
    {
        tableName:"log_in_history"
    }
);

export default loginHistoryModel;
