import { Router } from "express";
import adapter from "../utils/adapter";
import LoginController from "../controllers/LoginController";
import washRouter from "./wash.routes";

const indexRouter = Router();
const loginController = new LoginController();

indexRouter.post('/auth', adapter((req, res) => loginController.login(req, res)));

indexRouter.use('/washes', washRouter);

export default indexRouter;
