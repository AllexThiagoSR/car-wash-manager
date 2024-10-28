import Joi from "joi";
import Wash from "../types/Wash";
import { NextFunction, Request, Response } from "express";
import APIError from "../utils/ApiError";

export default class WashMiddleware {
  private static validator = Joi.object({
    clientName: Joi.string().required(),
    description: Joi.string().min(5).required(),
    paymentTypeId: Joi.string().required(),
    vehicleModel: Joi.string().required(),
    value:  Joi.number().min(20).required()
  });

  public static washCreation(req: Request, _res: Response, next: NextFunction) {
    const {error} = WashMiddleware.validator.validate(req.body);
    console.log(error);
    if (error) throw new APIError(error.message, 400);
    return next();
  }
}