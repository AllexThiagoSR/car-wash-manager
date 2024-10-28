import { Router } from "express";
import adapter from "../utils/adapter";
import WashController from "../controllers/WashController";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import WashMiddleware from "../middlewares/WashMiddleware";

const washRouter = Router();
const controller = new WashController();

washRouter.get('/', adapter(AuthMiddleware.middleware), adapter((req, res) => controller.findAll(req, res)));

washRouter.get('/:id', adapter(AuthMiddleware.middleware), adapter((req, res) => controller.findOne(req, res)));

washRouter.post('/', adapter(WashMiddleware.washCreation));

export default washRouter;