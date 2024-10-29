import Wash from "../types/Wash";

export default class Report {
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

  constructor(history: Wash[]) {
    for(let i = 0; i < history.length; i += 1) {
      const wash = history[i];
      this.totalRevenue += wash.value || 0;
      if (wash.paid) {
        this.quantityAlreadyReceived += wash.value || 0;
        this.numberOfPaidWashes += 1;
      }
      else {
        this.quantityToReceive += wash.value || 0;
        this.numberOfUnpaidWashes += 1;
      }
      if (wash?.payment?.name)
        this.paymentMethods[wash.payment.name as 'Pix' | 'Dinheiro' | 'Transferência Bancária'].quantity += 1;
    }
    this.unpaidWashesPercentage = (100 * this.numberOfUnpaidWashes) / history.length;
    this.paidWashesPercentage = (100 * this.numberOfPaidWashes) / history.length;
    this.paymentMethods.Pix.percentage = (100 * this.paymentMethods.Pix.quantity) / this.numberOfPaidWashes;
    this.paymentMethods["Transferência Bancária"].percentage = (100 * this.paymentMethods["Transferência Bancária"].quantity) / this.numberOfPaidWashes;
    this.paymentMethods.Dinheiro.percentage = (100 * this.paymentMethods.Dinheiro.quantity) / this.numberOfPaidWashes;
  }
}