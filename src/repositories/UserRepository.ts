import User from "../types/User";
import connection from "../database/connection";
import DatabaseClient from "../types/Client";
import IUserRespository from "../types/IUserRepository";

export default class UserRepository extends IUserRespository {
  constructor(name: string = 'users', client: DatabaseClient = connection) {
    super(name, client);
  }

  async findByEmail(email: string): Promise<any> {
    await this.client.connect();
    const query = {
      text: `SELECT id, name, email, password FROM users WHERE email=$1`,
      values: [email]
    };
    const result = (await this.client.query(query)).rows[0];
    
    return new User(result.name, result.email, result.password, result.id);
  }
}