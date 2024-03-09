import asyncHandler from "express-async-handler";
import { employeeModel, saleModel, knowledgeSalesModel, exportModel, facilityModel, companyModel, userModel } from "../models/index.js";
import { errorHandler } from "../middlewares/errorHandler.js";

const evalgetInfo = asyncHandler(async (req, res, next) => {
    try {
        const employees = await employeeModel.findAll({
            where: { companyId: req.params.id }
        })

        const sales = await saleModel.findAll({
            where: { companyId: req.params.id }
        })

        const kSales = await knowledgeSalesModel.findAll({
            where: { companyId: req.params.id }
        })

        const exports = await exportModel.findAll({
            where: { companyId: req.params.id }
        })

        const facilities = await facilityModel.findAll({
            where: { companyId: req.params.id }
        })

        const companies = await companyModel.findByPk(req.params.id)

        res.send({
            companyInfo: companies,
            facilityInfo: facilities,
            exportInfo: exports,
            kSaleInfo: kSales,
            saleInfo: sales,
            employeeInfo: employees
        })
    } catch (error) {

        console.log(error)
        return next(errorHandler(500, error))

    }
})

const checkInfo = asyncHandler(async (req, res, next) => {
    const { section, id, evalApproved } = req.body

    console.log(req.body)

    if (!section || !id || !evalApproved) {
        return next(errorHandler(404, "All fields are required!"))
    }

    try {
        let updated = null
        switch (section) {
            case "companyInfo":
                updated = await companyModel.update({ evalApproved: evalApproved }, { where: { id: id } })
                break;
            case "facilityInfo":
                updated = await facilityModel.update({ evalApproved: evalApproved }, { where: { id: id } })
                break;
            case "exportInfo":
                updated = await exportModel.update({ evalApproved: evalApproved }, { where: { id: id } })
                break;
            case "kSaleInfo":
                updated = await knowledgeSalesModel.update({ evalApproved: evalApproved }, { where: { id: id } })
                break;
            case "saleInfo":
                updated = await saleModel.update({ evalApproved: evalApproved }, { where: { id: id } })
                break;
            case "employeeInfo":
                updated = await employeeModel.update({ evalApproved: evalApproved }, { where: { id: id } })
                break;
        }

        res.send(updated)
    } catch (error) {
        console.log(error)
        return next(errorHandler(500, error))
    }
})


const sendmsg = asyncHandler(async (req, res, next) => {
    const { section, id, msg } = req.body

    if (!section || !id || !msg) {
        return next(errorHandler(404, "All fields are required!"))
    }

    try {
        let updated = null
        switch (section) {
            case "companyInfo":
                updated = await companyModel.update({ msg: msg }, { where: { id: id } })
                break;
            case "facilityInfo":
                updated = await facilityModel.update({ msg: msg }, { where: { id: id } })
                break;
            case "exportInfo":
                updated = await exportModel.update({ msg: msg }, { where: { id: id } })
                break;
            case "kSaleInfo":
                updated = await knowledgeSalesModel.update({ msg: msg }, { where: { id: id } })
                break;
            case "saleInfo":
                updated = await saleModel.update({ msg: msg }, { where: { id: id } })
                break;
            case "employeeInfo":
                updated = await employeeModel.update({ msg: msg }, { where: { id: id } })
                break;
        }

        res.send(true)
    } catch (error) {
        console.log(error)
        return next(errorHandler(500, error))
    }
})

const completeEval = asyncHandler(async (req, res, next) => {
    try {
        await userModel.update({ type: 5 }, { where: { companyId: req.params.id } })
        res.send({ status: true })
    } catch (error) {
        console.log(error)
        return next(errorHandler(500, error))

    }
})

export {
    evalgetInfo,
    checkInfo,
    sendmsg,
    completeEval
}