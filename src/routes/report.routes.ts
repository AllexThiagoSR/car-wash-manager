import { Router } from "express";
import adapter from "../utils/adapter";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import ReportController from "../controllers/ReportController";

const reportRouter = Router();
const controller = new ReportController();

reportRouter.use(adapter(AuthMiddleware.middleware));

reportRouter.get('/total-income', adapter((req, res) => controller.getTotalIncomeReport(req, res)));

reportRouter.get('/total-expense', adapter((req, res) => controller.getTotalExpenseReport(req, res)));

export default reportRouter;