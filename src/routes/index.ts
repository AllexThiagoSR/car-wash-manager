import { Router } from "express";
import adapter from "../utils/adapter";
import LoginController from "../controllers/LoginController";
import washRouter from "./wash.routes";
import reportRouter from "./report.routes";

const indexRouter = Router();
const loginController = new LoginController();

indexRouter.post('/auth', adapter((req, res) => loginController.login(req, res)));

indexRouter.use('/washes', washRouter);

indexRouter.use('/reports', reportRouter);

export default indexRouter;
