export default class User {
  public id?: string;
  public name: string;
  public email: string;
  public password?: string;

  constructor(name: string, email: string, password?: string, id?: string) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.id = id;
  }
}