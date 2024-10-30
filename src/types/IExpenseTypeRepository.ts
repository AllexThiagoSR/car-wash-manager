import BaseRepository from "./BaseRepository";
import DatabaseClient from "./Client";
import ExpenseType from "./ExpenseType";

export default abstract class IExpenseTypeRepository extends BaseRepository<ExpenseType> {
  protected client: DatabaseClient;
  constructor(name: string, databaseClient: DatabaseClient) {
    super(name);
    this.client = databaseClient;
  }
}