import express from 'express';
import { salesForAllCompanyOnSpecificDate,
        salesOfCompany,
        allSalesOfCompany,
        postSale,
        updateSales,
        salesOfCompanyByUserId } from '../controllers/sales_controller.js';
import verifyToken from '../middlewares/isAuth.js';
import checkRole from '../middlewares/roleChecker.js';

const router = express.Router()


router.route('/SalesForAllCompanyOnSpecificDate/:date').get(verifyToken, checkRole([1,2]), salesForAllCompanyOnSpecificDate)
router.route('/salesOfCompany/:startDate/:endDate/:id').get(verifyToken, checkRole([1,2]), salesOfCompany)
router.route('/salesOfCompanyByUserId/:startDate/:endDate/:id').get(verifyToken, checkRole([0,5]), salesOfCompanyByUserId)
router.route('/allSalesOfCompany/:id').get(verifyToken, checkRole([0]), allSalesOfCompany)
router.route('/postSale').post(verifyToken, checkRole([0]), postSale )
router.route('/updateSales/:id').put(verifyToken, checkRole([0]), updateSales)

export default router