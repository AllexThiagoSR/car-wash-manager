import { Router } from "express";
import adapter from "../utils/adapter";
import WashController from "../controllers/WashController";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import WashMiddleware from "../middlewares/WashMiddleware";

const washRouter = Router();
const controller = new WashController();

washRouter.use(adapter(AuthMiddleware.middleware));

washRouter.get('/', adapter((req, res) => controller.findAll(req, res)));

washRouter.get('/:id', adapter((req, res) => controller.findOne(req, res)));

washRouter.post('/', adapter(WashMiddleware.washCreation), adapter((req, res) => controller.create(req, res)));


export default washRouter;