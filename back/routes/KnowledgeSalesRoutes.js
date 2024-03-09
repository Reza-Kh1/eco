import express  from "express";
import verifyToken from "../middlewares/isAuth.js";
import { knowledgeSalesForAllCompanyOnSpecificDate,
        knowledgeSalesOfCompany,
        allKnowledgeSalesOfCompany,
        postKnowledgeSale,
        updateKnowledgeSale,
        knowledgeSalesOfCompanyByUserId } from "../controllers/knowledgesales_controller.js";
import checkRole from "../middlewares/roleChecker.js";
 
const router = express.Router()

router.route('/KnowledgeSalesForAllCompanyOnSpecificDate/:date').get(verifyToken, checkRole([1,2]), knowledgeSalesForAllCompanyOnSpecificDate)
router.route('/knowledgeSalesOfCompany/:startDate/:endDate/:id').get(verifyToken, checkRole([1,2]), knowledgeSalesOfCompany)
router.route('/knowledgeSalesOfCompanyByUserId/:startDate/:endDate/:id').get(verifyToken, checkRole([0,5]), knowledgeSalesOfCompanyByUserId)
router.route('/allKnowledgeSalesOfCompany/:id').get(verifyToken, checkRole([0]), allKnowledgeSalesOfCompany)
router.route('/postKnowledgeSale').post(verifyToken, checkRole([0]), postKnowledgeSale)
router.route('/updateKnowledgeSale/:id').put(verifyToken, checkRole([0]), updateKnowledgeSale )

export default router;