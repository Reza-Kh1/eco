import { Sequelize, DataTypes } from 'sequelize';
import {sequelize} from '../config/config.js'

const companyModel = sequelize.define('Company', {
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
    companyCode: {
        type: Sequelize.STRING
    },
    userId: {
        type: Sequelize.UUID,
        //allowNull: false
    },
    healthIndex: {
        type: Sequelize.STRING
    },
    application: {
        type: Sequelize.STRING
    },
    product: {
        type: Sequelize.STRING
    },
    technologyField: {
        type: Sequelize.STRING
    },
    about: {
        type: Sequelize.TEXT
    },
    date:{
        type: Sequelize.INTEGER,
    },
    evalApproved:{
        type: Sequelize.BOOLEAN,
    },
    nameApproved:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    healthIndexApproved:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    applicationApproved:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    productApproved:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    technologyFieldApproved:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    aboutApproved:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    dateApproved:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    msg: {
        type: DataTypes.STRING
    }  
},
    {
        tableName:"companies"
    }
);

export default companyModel;
