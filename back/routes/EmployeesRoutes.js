import express from 'express';
import verifyToken from '../middlewares/isAuth.js';
import { employeesForAllCompanyOnSpecificDate,
        employeesOfCompany,
        allEmployeesOfCompany,
        postEmployees,
        updateEmployee,
        employeesOfCompanyByUserId } from '../controllers/employees_controller.js';
import checkRole from '../middlewares/roleChecker.js';
const router = express.Router()

router.route('/employeesForAllCompanyOnSpecificDate/:date').get(verifyToken, checkRole([1,2]), employeesForAllCompanyOnSpecificDate)
router.route('/employeesOfCompany/:startDate/:endDate/:id').get(verifyToken, checkRole([1,2]), employeesOfCompany )
router.route('/employeesOfCompanyByUserId/:startDate/:endDate/:id').get(verifyToken, checkRole([0,5]), employeesOfCompanyByUserId)
router.route('/allEmployeesOfCompany/:id').get(verifyToken, checkRole([0]), allEmployeesOfCompany)
router.route('/postEmployees').post(verifyToken, checkRole([0]), postEmployees)
router.route('/updateEmployee/:id').put(verifyToken, checkRole([0]), updateEmployee)




export default router