import { Sequelize, DataTypes } from 'sequelize';
import {sequelize} from '../config/config.js'

const userModel = sequelize.define('User', {
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

    nameAndFamily:{
        type: Sequelize.STRING,
    },
    image: {
        type: Sequelize.STRING,
        defaultValue: "",
    },
    type: {
        // role type
        // 0: normalUser, 1: admin , 2:fullaccess, 3:partial 4: evaluator 5:form compelete
        type: Sequelize.INTEGER,
        defaultValue: 1,
    },
    phoneNumber: {
        type: Sequelize.STRING,
    },
    melliNumber: {
        type: Sequelize.STRING,
        unique: true
    },
    companyNumber:{
        type: Sequelize.STRING,
        unique: true
    },
    phoneNumberVerificationCode: {
        type: Sequelize.STRING,
    },
    phoneNumberVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    sendToEval:{
        type: Sequelize.BOOLEAN,
    },
    // for users who are filling out their forms
    companyDetailsComplete:{
        type: Sequelize.BOOLEAN,
    },
    salesComplete:{
        type: Sequelize.BOOLEAN,
    },
    knowledgeSalesComplete:{
        type: Sequelize.BOOLEAN,
    },
    exportsComplete:{
        type: Sequelize.BOOLEAN,
    },
    employeesComplete:{
        type: Sequelize.BOOLEAN,
    },
    facilitiesComplete:{
        type: Sequelize.BOOLEAN,
    },
    evalApporoved:{
        type: Sequelize.BOOLEAN,
    }   
},
    {
        timestamps: true,
        tableName:"users"
    }
);

export default userModel;
