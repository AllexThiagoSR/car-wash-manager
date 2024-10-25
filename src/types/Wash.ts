import PaymentMethod from "./PaymentMethod";

export default class Wash {
  public id?: string;
  public vehicleModel: string;
  public clientName: string;
  public value: number;
  public description: string;
  public paid: boolean;
  public washDate: Date;
  public paymentTypeId?: string;
  public payment?: PaymentMethod;

  constructor(
    vehicleModel: string,
    clientName: string,
    value: number,
    description: string,
    washDate: Date,
    paid: boolean = false,
    paymentTypeId?: string,
    id?: string,
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