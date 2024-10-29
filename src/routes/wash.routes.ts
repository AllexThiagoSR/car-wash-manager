import { Router } from "express";
import adapter from "../utils/adapter";
import WashController from "../controllers/WashController";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import WashMiddleware from "../middlewares/WashMiddleware";
import ReportController from "../controllers/ReportController";

const washRouter = Router();
const controller = new WashController();
const reportController = new ReportController();

washRouter.get('/', adapter(AuthMiddleware.middleware), adapter((req, res) => controller.findAll(req, res)));

washRouter.get('/total-income-report', adapter(AuthMiddleware.middleware), adapter((req, res) => reportController.getTotalIncomeReport(req, res)));

washRouter.get('/:id', adapter(AuthMiddleware.middleware), adapter((req, res) => controller.findOne(req, res)));

washRouter.post('/', adapter(AuthMiddleware.middleware), adapter(WashMiddleware.washCreation), adapter((req, res) => controller.create(req, res)));


export default washRouter;