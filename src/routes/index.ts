import { Router } from "express";
import adapter from "../utils/adapter";
import LoginController from "../controllers/LoginController";

const indexRouter = Router();
const loginController = new LoginController();

indexRouter.post('/auth', adapter((req, res) => loginController.login(req, res)));

export default indexRouter;
