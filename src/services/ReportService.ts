import ServiceResponse from "../utils/ServiceRespose";
import WashRepository from "../repositories/WashRepository";
import IWashRespository from "../types/IWashRepository";
import Report from "../utils/Report";

export default class ReportService {
  private washRepository: IWashRespository;

  constructor(wRepository: IWashRespository = new WashRepository()) {
    this.washRepository = wRepository;
  }

  public async getTotalIncomeReport(filters?: { initDate?: string, finalDate?: string, quantity?: number, page?: number }): Promise<ServiceResponse<Report>> {
    const history = await this.washRepository.findAllWithDateFilters(filters!);
    return new ServiceResponse(200, new Report(history));
  }
}