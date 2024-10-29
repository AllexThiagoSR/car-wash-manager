import { Router } from "express";
import adapter from "../utils/adapter";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import ReportController from "../controllers/ReportController";

const reportRouter = Router();
const controller = new ReportController();

reportRouter.get('/total-income-report', adapter(AuthMiddleware.middleware), adapter((req, res) => controller.getTotalIncomeReport(req, res)));

export default reportRouter;