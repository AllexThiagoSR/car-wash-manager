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

  findAllWithDateFilters(filters: { initDate?: string, finalDate?: string }): Promise<Expense[]> {
    throw new APIError('Some method was not implemented', 500);
  }

  getTotalReport(filters: { initDate?: string; finalDate?: string; }): Promise<{expensetypeid: string, value: string}[]> {
    throw new APIError('Some method was not implemented', 500);
  }
}