import ExpenseType from "../types/ExpenseType";
import IExpenseTypeRepository from "../types/IExpenseTypeRepository";
import DatabaseClient from "../types/Client";
import connection from "../database/connection";

export default class ExpenseTypeRepository  extends IExpenseTypeRepository {
  constructor(name: string = 'expense_types', client: DatabaseClient = connection) { super(name, client) }

  async findAll(quantity?: number, page?: number): Promise<ExpenseType[]> {
    const query = {
      text: `SELECT * FROM ${this.tableName}`,
      values: [],
    };
    
    const expenseTypes = (await this.client.query(query)).rows;

    return expenseTypes
  }
}