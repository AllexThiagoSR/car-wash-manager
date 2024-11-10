import PaymentMethod from "../types/PaymentMethod";
import PaymentMethodRepository from "../repositories/PaymentMethodRepository";
import IPaymentMethodRepository from "../types/IPaymentMethodRepository";
import ServiceResponse from "../utils/ServiceRespose";

export default class PaymentMethodService {
  private repository: IPaymentMethodRepository;

  constructor(repo: IPaymentMethodRepository = new PaymentMethodRepository()) { this.repository = repo; }

  public async findAll(qtd?: string, p?: string): Promise<ServiceResponse<PaymentMethod[]>> {
    const quantity = Number.isNaN(Number(qtd)) ? undefined : Number(qtd);
    const page = Number.isNaN(Number(p)) ? undefined : Number(p);
    const paymentMethods = await this.repository.findAll(quantity, page);
    return new ServiceResponse(
      200,
      paymentMethods.map((expenseType) => (
        new PaymentMethod(expenseType.name, expenseType.description, expenseType.id)
      ))
    );
  }
}