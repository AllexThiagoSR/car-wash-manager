import ServiceResponse from "../utils/ServiceRespose";
import APIError from "../utils/ApiError";
import IExpenseRepository from "../types/IExpenseRepository";
import ExpenseRepository from "../repositories/ExpenseRepository";
import Expense from "../types/Expense";
import ExpenseType from "../types/ExpenseType";

export default class ExpenseService {
  private repository: IExpenseRepository;

  constructor(repository: IExpenseRepository = new ExpenseRepository()) { this.repository = repository; }

  public async findAll(quantity?: string, page?: string): Promise<ServiceResponse<Expense[]>> {
    const expenses = await this.repository.findAll();
    const parsedExpense = expenses.map((expense: any) => new Expense(expense?.date, expense?.id, parseFloat(expense?.value), expense?.description));
    return new ServiceResponse(200, parsedExpense);
  }

  public async findOne(id: string) {
    const expense = await this.repository.findOne(id) as any;
    if (!expense) throw new APIError('Expense not found', 404);
    const parsedExpense = new Expense(
      expense.date,
      expense.id,
      parseFloat(expense.value),
      expense.description,
      expense.expensetypeid,
      new ExpenseType(expense.name, expense.expensetypedescription, expense.expensetypeid),
    );
    return new ServiceResponse(200, parsedExpense);
  }

  public async create(data: Partial<Expense>): Promise<ServiceResponse<Expense>> {
    const createdExpense = await this.repository.create(data) as any;
    const parsedExpense = new Expense(
      createdExpense.date,
      createdExpense.id,
      parseFloat(createdExpense.value),
      createdExpense.description,
    );
    return new ServiceResponse(201, parsedExpense);
  }
}