import express from 'express';
import verifyToken from '../middlewares/isAuth.js';
import { facilitiesOfCompany,
        allFacilitiesOfCompany,
        filterFacilities,
        postFacility,
        updateFacility,
        deleteFacility,
        facilitiesOfCompanyByUserId } from '../controllers/facility_controller.js';
import checkRole from '../middlewares/roleChecker.js';

const router = express.Router()


router.route("/facilitiesOfCompany/:startDate/:endDate/:id").get(verifyToken, checkRole([1,2]), facilitiesOfCompany)

router.route('/facilitiesOfCompanyByUserId/:startDate/:endDate/:id').get(verifyToken, checkRole([0,5]), facilitiesOfCompanyByUserId)

router.route("/allFacilitiesOfCompany/:id").get(verifyToken, checkRole([0,1,2]), allFacilitiesOfCompany)

router.route("/filterFacilities/:id").post(verifyToken, checkRole([1,2]), filterFacilities)

router.route("/postFacility").post(verifyToken, checkRole([0]), postFacility)

router.route('/updateFacility/:id').put(verifyToken, checkRole([0]), updateFacility)

router.route('/deleteFacility/:id').delete(verifyToken, checkRole([0]), deleteFacility)

export default router