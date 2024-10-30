import ExpenseType from "./ExpenseType";

export default class Expense {
  public id?: string;
  public date: Date;
  public value?: number;
  public description?: string;
  public expenseTypeId?: string;
  public expenseType?: ExpenseType

  constructor(
    date: Date,
    id?: string,
    value?: number,
    description?: string,
    expenseTypeId?: string,
    expenseType?: ExpenseType
  ) {
    this.value = value;
    this.description = description;
    this.date = date;
    this.id = id;
    if (!expenseType) this.expenseTypeId = expenseTypeId;
    this.expenseType = expenseType;
  }
}