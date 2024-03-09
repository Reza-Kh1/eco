import express from 'express';
import verifyToken from '../middlewares/isAuth.js';
import { getAllConnections,getAllNodesOfCompanies } from '../controllers/graph_controller.js';
import checkRole from '../middlewares/roleChecker.js';

const router = express.Router()

router.route('/getAllConnections/:date').get(verifyToken, checkRole([1,2]), getAllConnections)
router.route('/getAllNodesOfCompanies/:name/:date').get(verifyToken, checkRole([1,2]), getAllNodesOfCompanies)

export default router;