import { Router } from "express";
import adapter from "../utils/adapter";
import ExpenseTypeController from "../controllers/ExpenseTypeController";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const expenseTypeRouter = Router();
const controller = new ExpenseTypeController();

expenseTypeRouter.use(adapter(AuthMiddleware.middleware));

expenseTypeRouter.get('/', adapter((req, res) => controller.findAll(req, res)));

export default expenseTypeRouter