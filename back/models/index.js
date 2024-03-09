import {sequelize} from '../config/config.js'
import companyModel from './Companies.js'
import connectionModel from './Connections.js'
import employeeModel from './Employees.js'
import facilityModel from './Facilities.js'
import knowledgeSalesModel from './KnowledgeSales.js'
import loginHistoryModel from './LoginHistory.js'
import messagesModel from './Messages.js'
import nodesModel from './Nodes.js'
import saleModel from './Sales.js'
import userModel from './Users.js'
import exportModel from './Exports.js'


companyModel.hasOne(userModel, {
    foreignKey: "companyId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

userModel.belongsTo(companyModel, {
    foreignKey: "companyId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
})

companyModel.hasMany(employeeModel, {
    foreignKey: "companyId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
})
employeeModel.belongsTo(companyModel, {
    foreignKey: "companyId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
})

companyModel.hasMany(facilityModel, {
    foreignKey: "companyId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
})

facilityModel.belongsTo(companyModel, {
    foreignKey: "companyId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
})

companyModel.hasMany(knowledgeSalesModel, {
    foreignKey: "companyId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
})

knowledgeSalesModel.belongsTo(companyModel, {
    foreignKey: "companyId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
})

companyModel.hasMany(saleModel, {
    foreignKey: "companyId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
})

saleModel.belongsTo(companyModel, {
    foreignKey: "companyId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
})

companyModel.hasMany(messagesModel, {
    foreignKey: "companyId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
})

messagesModel.belongsTo(companyModel, {
    foreignKey: "companyId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
})

companyModel.hasMany(exportModel,{
    foreignKey: "companyId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
})

exportModel.belongsTo(companyModel, {
    foreignKey: "companyId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
})

userModel.hasMany(loginHistoryModel, {
    foreignKey: "userId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
})

loginHistoryModel.belongsTo(userModel, {
    foreignKey: "userId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
})

// sequelize.sync({ force: true })
sequelize.sync()

export {
    companyModel,
    connectionModel,
    employeeModel,
    facilityModel,
    knowledgeSalesModel,
    loginHistoryModel,
    messagesModel,
    nodesModel,
    saleModel,
    userModel,
    exportModel
}