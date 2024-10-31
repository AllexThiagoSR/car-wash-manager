export default class IncomeReport {
  public totalRevenue = 0;
  public quantityAlreadyReceived = 0;
  public quantityToReceive = 0;
  public numberOfPaidWashes = 0;
  public numberOfUnpaidWashes = 0;
  public paidWashesPercentage = 0;
  public unpaidWashesPercentage = 0;
  public paymentMethods = {
    'Pix': { quantity: 0, percentage: 0 },
    'Transferência Bancária': { quantity: 0, percentage: 0 },
    'Dinheiro': { quantity: 0, percentage: 0 }
  };

  constructor(
    totalRevenue: number,
    quantityAlreadyReceived: number,
    quantityToReceive: number,
    numberOfPaidWashes: number,
    numberOfUnpaidWashes: number,
    paidWashesPercentage: number,
    unpaidWashesPercentage: number,
    pix: { quantity: number, percentage: number },
    transfer: { quantity: number, percentage: number },
    money: { quantity: number, percentage: number },
  ) {
    this.totalRevenue = totalRevenue;
    this.quantityAlreadyReceived = quantityAlreadyReceived;
    this.quantityToReceive = quantityToReceive;
    this.numberOfPaidWashes = numberOfPaidWashes;
    this.numberOfUnpaidWashes = numberOfUnpaidWashes;
    this.paidWashesPercentage = paidWashesPercentage;
    this.unpaidWashesPercentage = unpaidWashesPercentage;
    this.paymentMethods = {
      Pix: pix,
      'Transferência Bancária': transfer,
      Dinheiro: money,
    }
  }
}