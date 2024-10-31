import DatabaseClient from "../types/Client";
import connection from "../database/connection";
import Expense from "../types/Expense";
import IExpenseRepository from "../types/IExpenseRepository";

export default class ExpenseRepository extends IExpenseRepository {
  constructor(name: string = 'wash_history', client: DatabaseClient = connection) { super(name, client) }

  override async findOne(id: string): Promise<Expense> {
    const query = {
      text: `
      SELECT
        ${this.tableName}.id,
        value,
        ${this.tableName}.description,
        date,
        name,
        expense_types.description as 'expensetypedescription',
        expense_type_id as 'expenseTypeId'
      FROM ${this.tableName}
      LEFT JOIN expense_types ON ${this.tableName}.expense_type_id = expense_types.id
      WHERE ${this.tableName}.id = $1;
      `,
      values: [id]
    };
    const expenseFound = (await this.client.query(query)).rows[0];
    return expenseFound
  }

  override async findAll(quantity?: number, page?: number): Promise<Expense[]> {
    const query = {
      text: `
      SELECT
        id,
        description,
        date,
        value
      FROM ${this.tableName}
      LIMIT $1 OFFSET $2
      `,
      values: [quantity, quantity && page ? quantity * page : undefined]
    };

    const expenses = (await this.client.query(query)).rows;
    return expenses;
  }

  private async getInsertedExpense({ description, value, date, expenseTypeId }: Partial<Expense>): Promise<Expense> {
    const query = {
      text: `
      SELECT description, date, value, id FROM ${this.tableName}
      WHERE description = $1 AND "value" = $2 AND "date" = $3 ${expenseTypeId ? 'AND expense_type_id = $4' : ''};
      `,
      values: expenseTypeId ? [description, value, date, expenseTypeId] : [description, value, date],
    };
    const expenses = (await this.client.query(query)).rows;
    const createdExpense = expenses[expenses.length - 1];
    return createdExpense
  }

  override async create({ description, value, date, expenseTypeId }: Partial<Expense>): Promise<Expense> {
    const query = {
      text: `INSERT INTO ${this.tableName} (vehicle_model, description, client_name, "value", payment_type_id) VALUES ($1, $2, $3, $4, $5);`,
      values: [description, value, date, expenseTypeId],
    };
    await this.client.query(query);
    const createdExpense = await this.getInsertedExpense({ description, value, date, expenseTypeId });
    return createdExpense;
  }

  override async findAllWithDateFilters(filters?: { initDate?: string; finalDate?: string; quantity?: number; page?: number; }): Promise<Expense[]> {
    const query: { text: string, values: any[] } = { text: '', values: [] };

    if (filters) {
      const { initDate, finalDate, quantity, page } = filters;
      const whereInitDateOnly = 'WHERE date <= $3';
      const whereFinalDateOnly = 'WHERE date >= $3';
      const whereComplete = `WHERE date >= $3 AND date <= $4`;
      query.text = `
        SELECT
          value,
          date,
          name,
          expense_types.description as expenseTypeDescription,
          expense_type_id as expenseTypeId
        FROM ${this.tableName}
        LEFT JOIN expense_types ON ${this.tableName}.expense_type_id = expense_types.id
        ${(initDate && finalDate) ? whereComplete : ''}${(!initDate && finalDate) ? whereFinalDateOnly : ''}${(initDate && !finalDate) ? whereInitDateOnly : ''}
        LIMIT $1 OFFSET $2;
      `;
      query.values = [quantity, quantity && page ? quantity * page : undefined, initDate ? initDate : finalDate, finalDate];
    } else {
      query.text = `
        SELECT
          value,
          date,
          name,
          expense_types.description as expenseTypeDescription,
          expense_type_id as expenseTypeId
        FROM ${this.tableName}
        LEFT JOIN expense_types ON ${this.tableName}.expense_type_id = expense_types.id;
      `;
    }
    const washes = (await this.client.query(query)).rows;
    return washes;
  }
}