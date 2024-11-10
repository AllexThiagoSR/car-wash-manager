import { Router } from "express";
import adapter from "../utils/adapter";
import PaymentMethodController from "../controllers/PaymentMethodController";

const paymentMethodRouter = Router();
const controller = new PaymentMethodController();

paymentMethodRouter.get('/', adapter((req, res) => controller.findAll(req, res)));

export default paymentMethodRouter;