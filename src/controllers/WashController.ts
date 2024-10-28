import { Request, Response } from "express";
import WashService from "../services/WashService";

export default class WashController {
  private service: WashService

  constructor(service: WashService = new WashService()) { this.service = service; }

  async findAll(req: Request, res: Response) {
    const response = await this.service.findAll(req.query.quantity as string | undefined, req.query.page as string | undefined)
    return res.status(response.statusCode).json(response.body)
  }

  async findOne(req: Request, res: Response) {
    const response = await this.service.findOne(req.params.id)
    return res.status(response.statusCode).json(response.body)
  }
  
  async create(req: Request, res: Response) {
    const response = await this.service.create(req.body);
    return res.status(response.statusCode).json(response.body)
  }
}
