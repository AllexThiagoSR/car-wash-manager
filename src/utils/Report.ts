import ExpenseReport from "../types/ExpenseReport";
import Expense from "../types/Expense";
import IncomeReport from "../types/IncomeReport";
import Wash from "../types/Wash";

export default class Report {
  static totalIncome(history: Wash[]): IncomeReport {
    const tempReport = {
      totalRevenue: 0,
      quantityAlreadyReceived: 0,
      quantityToReceive: 0,
      numberOfPaidWashes: 0,
      numberOfUnpaidWashes: 0,
      paidWashesPercentage: 0,
      unpaidWashesPercentage: 0,
      paymentMethods: {
        '2d6685eb-ded8-43f9-a899-3ccc206a61da': { quantity: 0, percentage: 0 },
        '10a909d4-ae84-4c2f-a025-a503b5b29b8e': { quantity: 0, percentage: 0 },
        '379a3611-32f9-432d-9692-41ac690446a9': { quantity: 0, percentage: 0 }
      },
    };

    for(let i = 0; i < history.length; i += 1) {
      const wash = history[i];
      tempReport.totalRevenue += wash.value || 0;
      if (wash.paid) {
        tempReport.quantityAlreadyReceived += wash.value || 0;
        tempReport.numberOfPaidWashes += 1;
      }
      else {
        tempReport.quantityToReceive += wash.value || 0;
        tempReport.numberOfUnpaidWashes += 1;
      }
      if (wash?.payment?.id)
        tempReport.paymentMethods[wash?.payment?.id as keyof typeof tempReport.paymentMethods].quantity += 1;
    }
    tempReport.unpaidWashesPercentage = ((100 * tempReport.numberOfUnpaidWashes) / history.length) || 0;
    tempReport.paidWashesPercentage = ((100 * tempReport.numberOfPaidWashes) / history.length) || 0;
    tempReport.paymentMethods['2d6685eb-ded8-43f9-a899-3ccc206a61da'].percentage = ((100 * tempReport.paymentMethods['2d6685eb-ded8-43f9-a899-3ccc206a61da'].quantity) / tempReport.numberOfPaidWashes) || 0;
    tempReport.paymentMethods["10a909d4-ae84-4c2f-a025-a503b5b29b8e"].percentage = ((100 * tempReport.paymentMethods["10a909d4-ae84-4c2f-a025-a503b5b29b8e"].quantity) / tempReport.numberOfPaidWashes) || 0;
    tempReport.paymentMethods["379a3611-32f9-432d-9692-41ac690446a9"].percentage = ((100 * tempReport.paymentMethods["379a3611-32f9-432d-9692-41ac690446a9"].quantity) / tempReport.numberOfPaidWashes) || 0;

    return new IncomeReport(
      tempReport.totalRevenue,
      tempReport.quantityAlreadyReceived,
      tempReport.quantityToReceive,
      tempReport.numberOfPaidWashes,
      tempReport.numberOfUnpaidWashes,
      tempReport.paidWashesPercentage,
      tempReport.unpaidWashesPercentage,
      tempReport.paymentMethods['2d6685eb-ded8-43f9-a899-3ccc206a61da'],
      tempReport.paymentMethods['10a909d4-ae84-4c2f-a025-a503b5b29b8e'],
      tempReport.paymentMethods['379a3611-32f9-432d-9692-41ac690446a9'],
    )
  }

  static totalExpense(expenses: { expensetypeid: string, value: string }[]) {
    const tempExpenseReport = {
      totalExpense: expenses.reduce((acc, curr) => acc + parseFloat(curr.value), 0),
      expensesByCategory: {
        'e04352b6-5f74-4830-80b6-42d702ebbf24': { value: 0, percentage: 0 },
        'fe181168-ac57-4636-8626-98738787c434': { value: 0, percentage: 0 },
        '17d4bd22-d8c9-4465-b318-ccc99026354a': { value: 0, percentage: 0 },
        'aa3d11bb-465a-4162-a2b0-88bc16645b07': { value: 0, percentage: 0 },
        '8b1032d3-8096-4884-9224-fcc591f7af2f': { value: 0, percentage: 0 },
      }
    }

    for (let i = 0; i < expenses.length; i += 1) {
      const expense = expenses[i];
      tempExpenseReport
        .expensesByCategory[expense.expensetypeid as keyof typeof tempExpenseReport.expensesByCategory] = {
          value:  parseFloat(expense.value),
          percentage: parseFloat(expense.value) * 100 / tempExpenseReport.totalExpense,
        };
    }
    
    return new ExpenseReport(
      tempExpenseReport.totalExpense,
      tempExpenseReport.expensesByCategory['e04352b6-5f74-4830-80b6-42d702ebbf24'],
      tempExpenseReport.expensesByCategory['aa3d11bb-465a-4162-a2b0-88bc16645b07'],
      tempExpenseReport.expensesByCategory['17d4bd22-d8c9-4465-b318-ccc99026354a'],
      tempExpenseReport.expensesByCategory['8b1032d3-8096-4884-9224-fcc591f7af2f'],
      tempExpenseReport.expensesByCategory['fe181168-ac57-4636-8626-98738787c434'],
    );
  }
}