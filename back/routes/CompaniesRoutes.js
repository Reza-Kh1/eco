import express from 'express';
import verifyToken from '../middlewares/isAuth.js';
import { getAllComany,
        getComanyInfo,
        getComanyInfoByUserId,
        postCompany,
        updateCompany } from '../controllers/company_controller.js';
import checkRole from '../middlewares/roleChecker.js';

const router = express.Router()

router.route('/getAllComany').get(verifyToken, checkRole([1,2,4]), getAllComany)
router.route('/getComanyInfo/:id').get(verifyToken, checkRole([1,2]), getComanyInfo)
router.route('/getComanyInfoByUserId/:id').get(verifyToken, checkRole([0]), getComanyInfoByUserId)
router.route('/postCompany').post(verifyToken, checkRole([0]), postCompany)
router.route('/updateCompany/:id').put(verifyToken, checkRole([0]), updateCompany)

export default router;