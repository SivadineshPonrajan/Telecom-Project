import { Component, OnInit } from '@angular/core';
import {AdminTicketService} from "../../services/admin-ticket.service";
import {EachAdminTicket} from "../../classes/EachAdminTicket";
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-tickets',
  templateUrl: './admin-tickets.component.html',
  styleUrls: ['./admin-tickets.component.css']
})
export class AdminTicketsComponent{

  ticketlistPre = new Array<EachAdminTicket>();
  ticketlistPost = new Array<EachAdminTicket>();
  ticketlistBroad = new Array<EachAdminTicket>();

  constructor(private adTick: AdminTicketService,private router: Router) {
    if(JSON.parse(localStorage.getItem('key'))['admin'] === ""){
      this.router.navigate(['./login']);
    }
    this.adTick
      .PrepaidRequest()
      .subscribe(response => {
        if (response['adminTickets'] === 'success') {
          this.ticketlistPre = response['allAdminPlans'].map(item => {
            return new EachAdminTicket(
              item.ticketId,
              item.phone,
              item.planCategory,
              item.ticket,
              item.dateTicketRaised,
              item.status == true ? "Pending" : "Resolved"
            );
          });
        } else{
          alert(response['adminTickets']);
        }
      });

    this.adTick
      .PostpaidRequest()
      .subscribe(response => {
        if (response['adminTickets'] === 'success') {
          this.ticketlistPost = response['allAdminPlans'].map(item => {
            return new EachAdminTicket(
              item.ticketId,
              item.phone,
              item.planCategory,
              item.ticket,
              item.dateTicketRaised,
              item.status == true ? "Pending" : "Resolved"
            );
          });
        } else{
          alert(response['adminTickets']);
        }
      });

    this.adTick
      .BroadbandRequest()
      .subscribe(response => {
        if (response['adminTickets'] === 'success') {
          this.ticketlistBroad = response['allAdminPlans'].map(item => {
            return new EachAdminTicket(
              item.ticketId,
              item.phone,
              item.planCategory,
              item.ticket,
              item.dateTicketRaised,
              item.status == true ? "Pending" : "Resolved"
            );
          });
        } else{
          alert(response['adminTickets']);
        }
      });
  }

  updateStatus(tid){
    this.adTick
      .PutRequest(tid)
      .subscribe(response => {
        if (response['updation'] === 'success') {
          alert("Ticket updated successfully");
          this.router.navigate(['./adminTickets']);
        } else{
          alert("Ticket updation error");
        }
      });
  }

}
