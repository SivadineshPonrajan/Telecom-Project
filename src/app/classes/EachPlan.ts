export class EachPlan {
  public pid: string;
  public name: string;
  public cost: string;
  public validity: string;
  public category: string;

  constructor(id: string, name: string, cost: string, validity: string, category: string) {
    this.pid = id;
    this.name = name;
    this.cost = cost;
    this.validity = validity;
    this.category = category;
  }
}
