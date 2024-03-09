import express from 'express';
import verifyToken from '../middlewares/isAuth.js';
import { exportsForAllCompanyOnSpecificDate,
        exportsOfCompany,
        allExportsOfCompany,
        postExport,
        updateExport,
        exportsOfCompanyByUserId } from '../controllers/exports_controller.js';
import checkRole from '../middlewares/roleChecker.js';

const router = express.Router()

router.route('/ExportsForAllCompanyOnSpecificDate/:date').get(verifyToken, checkRole([1,2]), exportsForAllCompanyOnSpecificDate)
router.route('/exportsOfCompany/:startDate/:endDate/:id').get(verifyToken, checkRole([1,2]), exportsOfCompany)
router.route('/exportsOfCompanyByUserId/:startDate/:endDate/:id').get(verifyToken, checkRole([0,5]), exportsOfCompanyByUserId)
router.route('/allExportsOfCompany/:id').get(verifyToken, checkRole([0]), allExportsOfCompany)
router.route('/postExport').post(verifyToken, checkRole([0]), postExport)
router.route('/updateExport/:id').put(verifyToken, checkRole([0]), updateExport)

export default router;