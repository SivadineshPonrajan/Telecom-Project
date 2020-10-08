export class EachTicket {
  public ticketId: string;
  public dateTicketRaised: string;
  public planCategory: string;
  public ticket: string;
  public status: string;

  constructor(ticketId: string, dateTicketRaised: string, planCategory: string, ticket: string, status: string) {
    this.ticketId = ticketId;
    this.dateTicketRaised = dateTicketRaised;
    this.planCategory = planCategory;
    this.ticket = ticket;
    this.status = status;
  }
}
