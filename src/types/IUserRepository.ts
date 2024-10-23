import APIError from "../utils/ApiError";
import DatabaseClient from "./Client";
import User from "./User";

export default abstract class IUserRespository{
  protected tableName: string;
  protected client: DatabaseClient;

  constructor(name: string, databaseClient: DatabaseClient) {
    this.tableName = name;
    this.client = databaseClient;
  }

  async findByEmail(email: string): Promise<User> {
    throw new APIError('Some method was not implemented', 500);
  }
}