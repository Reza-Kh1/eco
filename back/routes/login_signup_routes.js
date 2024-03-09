import express from 'express';
import {register,
        login,
        getAllusers,
        changePassword,
        findUsers,
        sendToEval} from '../controllers/login_signup_controller.js';
import verifyToken from '../middlewares/isAuth.js';
import checkRole from '../middlewares/roleChecker.js';

const router = express.Router()

router.route('/register').post(register)

router.route('/login').post(login)

router.route('/getAllusers').get(verifyToken, checkRole([1]), getAllusers)

router.route('/changePasswordGeneral/:id').put(verifyToken, checkRole(0,1,2,3,4,5), changePassword)

router.route('/findUsers' ).get(verifyToken, checkRole([1]), findUsers)

router.route('/sendToEval/:id').get(verifyToken, checkRole([0]), sendToEval)

export default router