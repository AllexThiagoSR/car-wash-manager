import { Request, Response } from "express";
import ReportService from "../services/ReportService";

export default class ReportController {
  private service: ReportService

  constructor(service: ReportService = new ReportService()) { this.service = service; }

  public async getTotalIncomeReport(req: Request, res: Response) {
    const response = await this.service.getTotalIncomeReport();
    return res.status(response.statusCode).json(response.body);
  }
}
