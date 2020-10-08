export class EachNewCustomer {
  public name: string;
  public dob: string;
  public address: string;
  public gender: string;
  public email: string;
  public phone: string;

  constructor(name: string,dob: string, address: string, gender: string, email: string,phone: string) {
    this.name = name;
    this.dob = dob;
    this.address = address;
    this.gender = gender;
    this.email = email;
    this.phone = phone;
  }
}
