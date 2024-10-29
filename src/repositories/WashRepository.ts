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
        vehicle_model as 'vehicleModel',
        client_name as 'clientName',
        value,
        ${this.tableName}.description,
        paid,
        wash_date as 'washDate',
        name,
        payment_methods.description as 'paymentDescription',
        payment_type_id as 'paymentTypeId'
      FROM ${this.tableName}
      LEFT JOIN payment_methods ON ${this.tableName}.payment_type_id = payment_methods.id
      WHERE ${this.tableName}.id = $1;
      `,
      values: [id]
    };
    const washFind = (await this.client.query(query)).rows[0];
    return washFind
  }

  override async findAll(quantity?: number, page?: number): Promise<Wash[]> {
    const query = {
      text: `
      SELECT
        id,
        client_name as clientName,
        wash_date as washDate,
        value
      FROM ${this.tableName}
      LIMIT $1 OFFSET $2
      `,
      values: [quantity, quantity && page ? quantity * page : undefined]
    };

    const washes = (await this.client.query(query)).rows;
    return washes;
  }

  private async getInsertedWash({ vehicleModel, description, clientName, value, paymentTypeId }: Partial<Wash>): Promise<Wash> {
    const query = {
      text: `
      SELECT client_name AS clientname, wash_date AS date, id FROM ${this.tableName}
      WHERE vehicle_model = $1 AND description = $2 AND client_name = $3 AND "value" = $4 ${paymentTypeId ? 'AND payment_type_id = $5' : ''};
      `,
      values: paymentTypeId ? [vehicleModel, description, clientName, value, paymentTypeId] : [vehicleModel, description, clientName, value],
    };
    const washes = (await this.client.query(query)).rows;
    const createdWash = washes[washes.length - 1];
    return createdWash
  }

  override async create({ vehicleModel, description, clientName, value, paymentTypeId }: Partial<Wash>): Promise<Wash> {
    const query = {
      text: `INSERT INTO ${this.tableName} (vehicle_model, description, client_name, "value", payment_type_id) VALUES ($1, $2, $3, $4, $5);`,
      values: [vehicleModel, description, clientName, value, paymentTypeId],
    };
    await this.client.query(query);
    const createdWash = await this.getInsertedWash({ vehicleModel, description, clientName, value, paymentTypeId });
    return createdWash;
  }

  override async findAllWithDateFilters(filters?: { initDate?: string; finalDate?: string; quantity?: number; page?: number; }): Promise<Wash[]> {
    const query: { text: string, values: any[] } = { text: '', values: [] };

    if (filters) {
      const { initDate, finalDate, quantity, page } = filters;
      const whereInitDateOnly = 'WHERE wash_date <= $3';
      const whereFinalDateOnly = 'WHERE wash_date >= $3';
      const whereComplete = `WHERE wash_date >= $3 AND wash_date <= $4`;
      query.text = `
        SELECT
          vehicle_model as vehicleModel,
          client_name as clientName,
          value,
          paid,
          wash_date as washDate,
          name,
          payment_methods.description as paymentDescription,
          payment_type_id as paymentTypeId
        FROM ${this.tableName}
        LEFT JOIN payment_methods ON ${this.tableName}.payment_type_id = payment_methods.id
        ${(initDate && finalDate) ? whereComplete : ''}${(!initDate && finalDate) ? whereFinalDateOnly : ''}${(initDate && !finalDate) ? whereInitDateOnly : ''}
        LIMIT $1 OFFSET $2;
      `;
      query.values = [quantity, quantity && page ? quantity * page : undefined, initDate ? initDate : finalDate, finalDate];
    } else {
      query.text = `
        SELECT
          vehicle_model as vehicleModel,
          client_name as clientName,
          value,
          paid,
          wash_date as washDate,
          name,
          payment_methods.description as paymentDescription,
          payment_type_id as paymentTypeId
        FROM ${this.tableName}
        LEFT JOIN payment_methods ON ${this.tableName}.payment_type_id = payment_methods.id;
      `;
    }
    const washes = (await this.client.query(query)).rows;
    return washes;
  }
}