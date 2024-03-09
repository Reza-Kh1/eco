import express from "express";
import verifyToken from "../middlewares/isAuth.js";
import { getAllCompanyMassages,
postMessage,
updateMessage,
deleteMessage } from "../controllers/massages_controller.js";
import checkRole from "../middlewares/roleChecker.js";

const router = express.Router()

router.route("/getAllCompanyMassages/:id").get(verifyToken, checkRole([1]), getAllCompanyMassages)

router.route("/postMessage").post(verifyToken, checkRole([1]), postMessage)

router.route("/updateMessage/:id").put(verifyToken, checkRole([1]), updateMessage)

router.route("/deleteMessage/:id").delete(verifyToken, checkRole([1]), deleteMessage )
export default router;