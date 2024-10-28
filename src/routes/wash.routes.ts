import { Router } from "express";
import adapter from "../utils/adapter";
import WashController from "../controllers/WashController";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const washRouter = Router();
const controller = new WashController();

washRouter.get('/', AuthMiddleware.middleware, adapter((req, res) => controller.findAll(req, res)))

washRouter.get('/:id', AuthMiddleware.middleware, adapter((req, res) => controller.findOne(req, res)));

export default washRouter;