export default class ExpenseReport {
  public totalExpensesValue = 0;
  public expensesByCategory = {
    energy: { value: 0, percentage: 0 },
    water: { value: 0, percentage: 0 },
    maintenance: { value: 0, percentage: 0 },
    material: { value: 0, percentage: 0 },
    employee: { value: 0, percentage: 0 },
  }

  constructor(
    total: number,
    energy: { value: number, percentage: number },
    water: { value: number, percentage: number },
    employee: { value: number, percentage: number },
    maintenance: { value: number, percentage: number },
    material: { value: number, percentage: number },
  ) {
    this.totalExpensesValue = total;
    this.expensesByCategory = {
      energy,
      water,
      maintenance,
      material,
      employee,
    }
  }
}