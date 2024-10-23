export default class Wash {
  public id?: string;
  public vehicleModel: string;
  public clientName: string;
  public paid: boolean;
  public washDate: string;
  public paymentTypeId: string;

  constructor(vehicleModel: string, clientName: string, washDate: string, paid: boolean = false, paymentTypeId: string, id?: string, ) {
    this.vehicleModel = vehicleModel;
    this.clientName = clientName;
    this.paid = paid;
    this.washDate = washDate;
    this.id = id;
    this.paymentTypeId = paymentTypeId;
  }
}