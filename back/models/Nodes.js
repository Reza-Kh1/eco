import { Sequelize, DataTypes } from 'sequelize';
import {sequelize} from '../config/config.js'

const nodesModel = sequelize.define('Node', {
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
    value: {
        type: Sequelize.FLOAT
    },
    symbolSize: {
        type: Sequelize.FLOAT
    },
    category: {
        type: Sequelize.INTEGER,
    }   
},
    {
        tableName:"nodes"
    }
);

export default nodesModel;
