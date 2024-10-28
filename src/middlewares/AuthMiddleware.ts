import { NextFunction, Request, Response } from "express";
import APIError from "../utils/ApiError";
import JWTUtils from "../utils/JWTUtils";

export default class AuthMiddleware {
  public static middleware(req: Request, res: Response, next: NextFunction) {
    const token = req.header('Authorization')
    if (token === undefined) throw new APIError('Token not provided', 404);
    if (!token.includes('Bearer')) throw new APIError('Invalid token', 401);
    const payload = new JWTUtils().verify(token.replace('Bearer ', '')!);
    res.locals.user = payload;
    return next();
  }
}