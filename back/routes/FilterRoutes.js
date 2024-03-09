import express from "express";
import {totalSales} from '../controllers/filter_controller.js'
import verifyToken from "../middlewares/isAuth.js";
import checkRole from "../middlewares/roleChecker.js";

const router = express.Router()

router.route('/totalSales/:date').get(verifyToken, checkRole([1,2]), totalSales)


export default router