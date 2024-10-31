import BaseRepository from "./BaseRepository";
import DatabaseClient from "./Client";
import PaymentMethod from "./PaymentMethod";

export default abstract class IPaymentMethodRepository extends BaseRepository<PaymentMethod> {
  protected client: DatabaseClient;
  constructor(name: string, databaseClient: DatabaseClient) {
    super(name);
    this.client = databaseClient;
  }
}