import { Request, Response } from "express";
import PaymentMethodService from "../services/PaymentMethodService";

export default class PaymentMethodController {
  private service: PaymentMethodService;

  constructor(service: PaymentMethodService = new PaymentMethodService()) { this.service = service }

  public async findAll(req: Request, res: Response) {
    const response = await this.service.findAll(req.query.quantity as string | undefined, req.query.page as string | undefined);
    return res.status(response.statusCode).json(response.body);
  }
}