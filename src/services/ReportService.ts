import ServiceResponse from "../utils/ServiceRespose";
import WashRepository from "../repositories/WashRepository";
import IWashRespository from "../types/IWashRepository";
import Report from "../utils/Report";
import Wash from "../types/Wash";
import PaymentMethod from "../types/PaymentMethod";
import IExpenseRepository from "../types/IExpenseRepository";
import ExpenseRepository from "../repositories/ExpenseRepository";

export default class ReportService {
  private washRepository: IWashRespository;
  private expenseReposiory: IExpenseRepository;

  constructor(wRepository: IWashRespository = new WashRepository(), eRepository: IExpenseRepository = new ExpenseRepository()) {
    this.washRepository = wRepository;
    this.expenseReposiory = eRepository;
  }

  public async getTotalIncomeReport(filters: { initDate?: string, finalDate?: string, }): Promise<ServiceResponse<Report>> {
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
    return new ServiceResponse(200, Report.totalIncome(parsedHistory));
  }

  public async getTotalExpenseReport(filters: { initDate?: string, finalDate?: string, }): Promise<ServiceResponse<Report>> {
    const history = await this.expenseReposiory.getTotalReport(filters);
    return new ServiceResponse(200, Report.totalExpense(history));
  }
}