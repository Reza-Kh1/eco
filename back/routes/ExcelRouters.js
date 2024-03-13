import express from 'express';
import { excel } from '../controllers/excel_controller.js';
import verifyToken from '../middlewares/isAuth.js';
import checkRole from '../middlewares/roleChecker.js';

const router = express.Router()

router.route('/exceldata').post(verifyToken, checkRole([1,2]), excel)

export default router