import PaymentMethod from "./PaymentMethod";

export default class Wash {
  public id?: string;
  public clientName: string;
  public vehicleModel?: string;
  public washDate: Date;
  public value?: number;
  public description?: string;
  public paid?: boolean;
  public paymentTypeId?: string;
  public payment?: PaymentMethod;

  constructor(
    clientName: string,
    washDate: Date,
    id?: string,
    vehicleModel?: string,
    value?: number,
    description?: string,
    paid?: boolean,
    paymentTypeId?: string,
    payment?: PaymentMethod
  ) {
    this.vehicleModel = vehicleModel;
    this.clientName = clientName;
    this.value = value;
    this.description = description;
    this.paid = paid;
    this.washDate = washDate;
    this.id = id;
    if (!payment) this.paymentTypeId = paymentTypeId;
    this.payment = payment;
  }
}