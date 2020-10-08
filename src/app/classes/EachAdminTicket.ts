export class EachAdminTicket {
  public ticketId: string;
  public phone: string;
  public planCategory: string;
  public ticket: string;
  public dateTicketRaised: string;
  public status: string;

  constructor(ticketId: string, phone: string, planCategory: string, ticket: string, dateTicketRaised: string, status: string) {
    this.ticketId = ticketId;
    this.phone = phone;
    this.planCategory = planCategory;
    this.ticket = ticket;
    this.dateTicketRaised = dateTicketRaised;
    this.status = status;
  }
}
