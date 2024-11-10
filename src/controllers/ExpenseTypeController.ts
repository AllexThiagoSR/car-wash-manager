import { Request, Response } from "express";
import ExpenseTypeService from "../services/ExpenseTypeService";

export default class ExpenseTypeController {
  private service: ExpenseTypeService

  constructor(service: ExpenseTypeService = new ExpenseTypeService()) { this.service = service }

  public async findAll(req: Request, res: Response) {
    const quantity = Number.isNaN(Number(req.query.quantity)) ? undefined : Number(req.query.quantity);
    const page = Number.isNaN(Number(req.query.page)) ? undefined : Number(req.query.page);
    const response = await this.service.findAll(quantity, page);
    return res.status(response.statusCode).json(response.body);
  }
}