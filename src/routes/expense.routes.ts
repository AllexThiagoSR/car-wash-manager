import { Router } from "express";
import adapter from "../utils/adapter";
import ExpenseController from "../controllers/ExpenseController";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const expenseRouter = Router();
const controller = new ExpenseController();

expenseRouter.use(adapter(AuthMiddleware.middleware));

expenseRouter.get('/', adapter((req, res) => controller.findAll(req, res)));

expenseRouter.get('/:id', adapter((req, res) => controller.findOne(req, res)));

expenseRouter.post('/', adapter((req, res) => controller.create(req, res)));


export default expenseRouter;