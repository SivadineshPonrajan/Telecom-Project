export class EachCrmData {
  public phone:string;
  public custName:string;
  public planCategory:string;
  public planName:string;
  public starter:string;

  constructor(phone: string, custName: string, planCategory: string, planName: string, starter: string) {
    this.phone = phone;
    this.custName = custName;
    this.planCategory = planCategory;
    this.planName = planName;
    this.starter = starter;
  }
}
