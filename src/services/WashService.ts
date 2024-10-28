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

  public async findOne(id: string) {
    const wash = await this.repository.findOne(id);
    return new ServiceResponse(200, wash);
  }

  public async create(data: Partial<Wash>): Promise<ServiceResponse<Wash>> {
    const createdWash = await this.repository.create(data);
    return new ServiceResponse(201, createdWash);
  }
}