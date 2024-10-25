import { Router } from "express";
import adapter from "../utils/adapter";
import WashController from "../controllers/WashController";

const washRouter = Router();
const controller = new WashController();

washRouter.get('/', adapter((req, res) => controller.findAll(req, res)))

washRouter.get('/:id', adapter((req, res) => controller.findOne(req, res)));

export default washRouter;