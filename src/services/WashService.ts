import ServiceResponse from "../utils/ServiceRespose";
import APIError from "../utils/ApiError";
import IWashRespository from "../types/IWashRepository";
import WashRepository from "../repositories/WashRepository";
import Wash from "../types/Wash";

export default class WashService {
  private repository: IWashRespository;

  constructor(repository: IWashRespository = new WashRepository()) { this.repository = repository; }

  public async findAll(quantity?: string, page?: string): Promise<ServiceResponse<Wash[]>> {
    const washes = await this.repository.findAll();
    return new ServiceResponse(200, washes);
  }
}