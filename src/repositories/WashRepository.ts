import DatabaseClient from "../types/Client";
import connection from "../database/connection";
import IWashRespository from "../types/IWashRepository";
import Wash from "../types/Wash";
import PaymentMethod from "../types/PaymentMethod";

export default class WashRepository extends IWashRespository {
  constructor(name: string = 'wash_history', client: DatabaseClient = connection) { super(name, client) }

  override async findOne(id: string): Promise<Wash> {
    const query = {
      text: `
SELECT
  ${this.tableName}.id,
  vehicle_model as vehicleModel,
  client_name as clientName,
  value,
  ${this.tableName}.description,
  paid,
  wash_date as washDate,
  name,
  payment_methods.description as paymentDescription,
  payment_type_id as paymentTypeId
FROM ${this.tableName}
LEFT JOIN payment_methods ON ${this.tableName}.payment_type_id = payment_methods.id
WHERE ${this.tableName}.id = $1;
`,
      values: [id]
    };
    const washFind = (await this.client.query(query)).rows[0];
    console.log(washFind);
    return new Wash(
      washFind?.vehiclemodel,
      washFind?.clientname,
      parseFloat(washFind?.value),
      washFind?.description,
      washFind?.washdate,
      washFind?.paymenttypeid,
      washFind?.paid,
      washFind?.id,
      new PaymentMethod(washFind?.name, washFind?.paymentdescription, washFind?.paymenttypeid),
    );

  }
}