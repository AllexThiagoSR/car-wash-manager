import ServiceResponse from "../utils/ServiceRespose";
import APIError from "../utils/ApiError";
import IWashRespository from "../types/IWashRepository";
import WashRepository from "../repositories/WashRepository";
import Wash from "../types/Wash";
import PaymentMethod from "../types/PaymentMethod";

export default class WashService {
  private repository: IWashRespository;

  constructor(repository: IWashRespository = new WashRepository()) { this.repository = repository; }

  public async findAll(quantity?: string, page?: string): Promise<ServiceResponse<Wash[]>> {
    const washes = await this.repository.findAll();
    const parsedWashes = washes.map((wash: any) => new Wash(wash?.clientname, wash?.washdate, wash?.id, undefined, wash?.value));
    return new ServiceResponse(200, parsedWashes);
  }

  public async findOne(id: string) {
    const washFind = await this.repository.findOne(id) as any;
    const parsedWash = new Wash(
      washFind?.clientname,
      washFind?.washdate,
      washFind?.id,
      washFind?.vehiclemodel,
      parseFloat(washFind?.value),
      washFind?.description,
      washFind?.paid,
      washFind?.paymenttypeid,
      new PaymentMethod(washFind?.name, washFind?.paymentdescription, washFind?.paymenttypeid),
    );
    return new ServiceResponse(200, parsedWash);
  }

  public async create(data: Partial<Wash>): Promise<ServiceResponse<Wash>> {
    const createdWash = await this.repository.create(data) as any;
    const parsedWash = new Wash(
      createdWash.clientname,
      createdWash.date,
      createdWash.id,
    );
    return new ServiceResponse(201, parsedWash);
  }
}