import DatabaseClient from "../types/Client";
import connection from "../database/connection";
import PaymentMethod from "../types/PaymentMethod";
import IPaymentMethodRepository from "../types/IPaymentMethodRepository";

export default class PaymentMethodRepository  extends IPaymentMethodRepository {
  constructor(name: string = 'payment_methods', client: DatabaseClient = connection) { super(name, client) }

  async findAll(quantity?: number, page?: number): Promise<PaymentMethod[]> {
    const query = {
      text: `SELECT * FROM ${this.tableName}`,
      values: [],
    };
    
    const paymentMethods = (await this.client.query(query)).rows;

    return paymentMethods
  }
}