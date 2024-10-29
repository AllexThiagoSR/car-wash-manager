import ServiceResponse from "../utils/ServiceRespose";
import WashRepository from "../repositories/WashRepository";
import IWashRespository from "../types/IWashRepository";
import Report from "../utils/Report";
import Wash from "../types/Wash";
import PaymentMethod from "../types/PaymentMethod";

export default class ReportService {
  private washRepository: IWashRespository;

  constructor(wRepository: IWashRespository = new WashRepository()) {
    this.washRepository = wRepository;
  }

  public async getTotalIncomeReport(filters?: { initDate?: string, finalDate?: string, quantity?: number, page?: number }): Promise<ServiceResponse<Report>> {
    const history = await this.washRepository.findAllWithDateFilters(filters!);
    const parsedHistory = history.map((wash: any) => (
      new Wash(
        wash?.clientname,
        wash?.washdate,
        wash?.id,
        wash?.vehiclemodel,
        parseFloat(wash?.value),
        wash?.description,
        wash?.paid,
        wash?.paymenttypeid,
        new PaymentMethod(wash?.name, wash?.paymentdescription, wash?.paymenttypeid),
      )
    ));
    return new ServiceResponse(200, new Report(parsedHistory));
  }
}