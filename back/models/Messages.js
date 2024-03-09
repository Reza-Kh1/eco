import { Sequelize, DataTypes } from 'sequelize';
import {sequelize} from '../config/config.js'

const messagesModel = sequelize.define('Message', {
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

    text: {
        type: Sequelize.STRING
    },
   
},
    {
        tableName:"messages"
    }
);

export default messagesModel;
