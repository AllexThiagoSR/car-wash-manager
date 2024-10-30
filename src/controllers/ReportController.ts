import { Request, Response } from "express";
import ReportService from "../services/ReportService";

export default class ReportController {
  private service: ReportService

  constructor(service: ReportService = new ReportService()) { this.service = service; }

  public async getTotalIncomeReport(req: Request, res: Response) {
    const response = await this.service.getTotalIncomeReport({
      initDate: req.query.initDate as string | undefined,
      finalDate: req.query.initDate as string | undefined,
      page: req.query.page ? Number(req.query.page) : undefined,
      quantity: req.query.quantity ? Number(req.query.quantity) : undefined,
    });
    return res.status(response.statusCode).json(response.body);
  }
}
