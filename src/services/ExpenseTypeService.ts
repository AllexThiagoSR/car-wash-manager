import ServiceResponse from "../utils/ServiceRespose";
import ExpenseTypeRepository from "../repositories/ExpenseTypeRepository";
import IExpenseTypeRepository from "../types/IExpenseTypeRepository";
import ExpenseType from "../types/ExpenseType";

export default class ExpenseTypeService {
  private repository: IExpenseTypeRepository;

  constructor(repo: IExpenseTypeRepository = new ExpenseTypeRepository()) { this.repository = repo }

  public async findAll(qtd?: string, p?: string): Promise<ServiceResponse<ExpenseType[]>> {
    const quantity = Number.isNaN(Number(qtd)) ? undefined : Number(qtd);
    const page = Number.isNaN(Number(p)) ? undefined : Number(p);
    const expenseTypes = await this.repository.findAll(quantity, page);
    return new ServiceResponse(
      200,
      expenseTypes.map((expenseType) => (
        new ExpenseType(expenseType.name, expenseType.description, expenseType.id)
      ))
    )
  }
}

