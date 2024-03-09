import express from 'express';
import { evalgetInfo,
        checkInfo,
        sendmsg,
        completeEval } from '../controllers/eval_controller.js';
import verifyToken from '../middlewares/isAuth.js';
import checkRole from '../middlewares/roleChecker.js';

const router = express.Router()

router.route('/evalgetInfo/:id').get(verifyToken, checkRole([4]), evalgetInfo)

router.route('/checkInfo').put(verifyToken, checkRole([4]), checkInfo)

router.route('/sendmsg').put(verifyToken, checkRole([4]), sendmsg)

router.route('/completeEval/:id').get(verifyToken, checkRole([4]), completeEval )

export default router