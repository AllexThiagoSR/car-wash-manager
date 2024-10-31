import APIError from "../utils/ApiError";
import BaseRepository from "./BaseRepository";
import DatabaseClient from "./Client";
import Expense from "./Expense";

export default abstract class IExpenseRepository extends BaseRepository<Expense> {
  protected client: DatabaseClient;

  constructor(name: string, databaseClient: DatabaseClient) {
    super(name)
    this.client = databaseClient;
  }

  findAllWithDateFilters(filters: { initDate?: string, finalDate?: string ,quantity?: number, page?: number }): Promise<Expense[]> {
    throw new APIError('Some method was not implemented', 500);
  }
}