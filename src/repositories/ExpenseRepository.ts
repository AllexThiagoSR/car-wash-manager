import DatabaseClient from "../types/Client";
import connection from "../database/connection";
import Expense from "../types/Expense";
import IExpenseRepository from "../types/IExpenseRepository";
import ExpenseReport from "../types/ExpenseReport";

export default class ExpenseRepository extends IExpenseRepository {
  constructor(name: string = 'expenses', client: DatabaseClient = connection) { super(name, client) }

  override async findOne(id: string): Promise<Expense> {
    const query = {
      text: `
      SELECT
        ${this.tableName}.id,
        value,
        ${this.tableName}.description,
        date,
        name,
        expense_types.description as expensetypedescription,
        expense_type_id as expenseTypeId
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

  private async getInsertedExpense({ description, value, expenseTypeId }: Partial<Expense>): Promise<Expense> {
    const query = {
      text: `
      SELECT description, date, value, id FROM ${this.tableName}
      WHERE description = $1 AND "value" = $2 ${expenseTypeId ? 'AND expense_type_id = $3' : ''};
      `,
      values: expenseTypeId ? [description, value, expenseTypeId] : [description, value],
    };
    const expenses = (await this.client.query(query)).rows;
    const createdExpense = expenses[expenses.length - 1];
    return createdExpense
  }

  override async create({ description, value, expenseTypeId }: Partial<Expense>): Promise<Expense> {
    const query = {
      text: `INSERT INTO ${this.tableName} (description, "value", expense_type_id) VALUES ($1, $2, $3);`,
      values: [description, value, expenseTypeId],
    };
    await this.client.query(query);
    const createdExpense = await this.getInsertedExpense({ description, value, expenseTypeId });
    return createdExpense;
  }

  override async findAllWithDateFilters(filters: { initDate?: string; finalDate?: string; }): Promise<Expense[]> {
    const query: { text: string, values: any[] } = { text: '', values: [] };

    if (Object.values(filters).some((value) => value)) {
      const { initDate, finalDate } = filters;
      const whereInitDateOnly = 'WHERE date <= $1';
      const whereFinalDateOnly = 'WHERE date >= $1';
      const whereComplete = `WHERE date >= $1 AND date <= $2`;
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
      `;
      query.values = [initDate ? initDate : finalDate, finalDate];
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
    const expenses = (await this.client.query(query)).rows;
    return expenses;
  }

  override async getTotalReport(filters: { initDate?: string; finalDate?: string; }): Promise<{expensetypeid: string, value: string}[]> {
    const query: { text: string, values: any[] } = { text: '', values: [] };

    if (Object.values(filters).some((value) => value)) {
      const { initDate, finalDate } = filters;
      const whereInitDateOnly = 'WHERE date <= $1';
      const whereFinalDateOnly = 'WHERE date >= $1';
      const whereComplete = `WHERE date >= $1 AND date <= $2`;
      query.text = `
        SELECT
          expense_type_id AS expensetypeid,
          SUM(value) AS value
        FROM ${this.tableName}
        ${(initDate && finalDate) ? whereComplete : ''}${(!initDate && finalDate) ? whereFinalDateOnly : ''}${(initDate && !finalDate) ? whereInitDateOnly : ''}
        GROUP BY expense_type_id;
      `;
      query.values = [initDate ? initDate : finalDate, finalDate];
    } else {
      query.text = `
        SELECT
          expense_type_id AS expensetypeid,
          SUM(value) AS value
        FROM ${this.tableName}
        GROUP BY expense_type_id;
      `;
    }
    const expenses = (await this.client.query(query)).rows;
    return expenses;
  }
}