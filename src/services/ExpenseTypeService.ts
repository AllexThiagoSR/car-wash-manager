import ServiceResponse from "../utils/ServiceRespose";
import ExpenseTypeRepository from "../repositories/ExpenseTypeRepository";
import IExpenseTypeRepository from "../types/IExpenseTypeRepository";
import ExpenseType from "../types/ExpenseType";

export default class ExpenseTypeService {
  private repository: IExpenseTypeRepository;

  constructor(repo: IExpenseTypeRepository = new ExpenseTypeRepository()) { this.repository = repo }

  public async findAll(quantity?: number, page?: number): Promise<ServiceResponse<ExpenseType[]>> {
    const expenseTypes = await this.repository.findAll(quantity, page);
    return new ServiceResponse(
      200,
      expenseTypes.map((expenseType) => (
        new ExpenseType(expenseType.name, expenseType.description, expenseType.id)
      ))
    )
  }
}

