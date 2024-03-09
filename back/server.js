import express from "express";
import { connectDb } from "./config/config.js";
//const errorHandler = require("./middlewares/errorHandler")
import dotenv from "dotenv";
import cors from "cors";
import login_signup_router from "./routes/login_signup_routes.js";
import EmployeesRouter from "./routes/EmployeesRoutes.js";
import FilterRouter from "./routes/FilterRoutes.js";
import SalesRouter from "./routes/SalesRoutes.js";
import KnowledgeSalesRouter from "./routes/KnowledgeSalesRoutes.js";
import ExportsRouter from "./routes/ExportsRouter.js";
import CompaniesRouter from "./routes/CompaniesRoutes.js";
import FacilitiesRouter from "./routes/FacilitiesRoutes.js";
import GraphRouter from "./routes/GraphRoutes.js";
import MassagesRouter from "./routes/MassagesRoutes.js";
import EvalRouter from "./routes/evalRoutes.js";
//const cookieParser = require("cookie-parser")

dotenv.config();
connectDb();
const app = express();

const PORT = process.env.PORT || 1330;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://ecobef.com",
      "http://194.62.43.197",
      "http://www.ecobef.com",
    ], // Replace with your frontend domain
    credentials: true, // Allow credentials
  })
);

app.use(express.json());
//app.use(cookieParser())
//app.use('/Images', express.static('./Images'));

app.use("/api/v1/users", login_signup_router);
app.use("/api/v1/employees", EmployeesRouter);
app.use("/api/v1/filters", FilterRouter);
app.use("/api/v1/sales", SalesRouter);
app.use("/api/v1/knowledge", KnowledgeSalesRouter);
app.use("/api/v1/exports", ExportsRouter);
app.use("/api/v1/company", CompaniesRouter);
app.use("/api/v1/facilities", FacilitiesRouter);
app.use("/api/v1/graph", GraphRouter);
app.use("/api/v1/massages", MassagesRouter);
app.use("/api/v1/eval", EvalRouter);
app.get("/api/v1/test", (req, res) => {
  res.send({ message: "متصل شدین" });
});
//app.use("/users", require("./routes/usersRoutes"))
//app.use("/assessments", require("./routes/assessmentsRoutes"))
//app.use("/admin", require("./routes/adminRoutes"))
//app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
