import { Request, Response } from "express";
import UserService from "../services/UserService";

export default class LoginController {
  private service: UserService
  constructor(service: UserService = new UserService()) { this.service = service; }

  public async login(req: Request, res: Response) {
    const response = await this.service.login(req.body.email, req.body.password);
    return res.status(response.statusCode).json(response.body);
  }
}