import { Component, OnInit } from '@angular/core';
import {TicketsService} from "../../services/tickets.service";
import {EachTicket} from "../../classes/EachTicket";
import {MyPlansService} from "../../services/my-plans.service";
import {Router} from "@angular/router";
import {IsUserService} from "../../services/is-user.service";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent{

  allTickets = new Array<EachTicket>();
  phone: string;
  myCategory = ['cat', 'dog'];
  ticket: string = "";
  listVal: string = "";

  constructor(private ticketsList: TicketsService, private allMyPlans: MyPlansService, private router:Router, private isuser:IsUserService) {
    this.phone = JSON.parse(localStorage.getItem('key'))['phone'];
    if(this.phone === ""){
      this.router.navigate(['./login']);
    }else {
      this.isuser
        .findUser(this.phone)
        .subscribe(response => {
          if (response['data'] === '0') {
            this.router.navigate(['./login']);
          }
        });
    }

    this.ticketsList
      .sendGetRequest(this.phone)
      .subscribe(response => {
        if (response['tickets'] === 'success') {
          this.allTickets = response['ticketArray'].map(item => {
            return new EachTicket(
              item.ticketId,
              item.dateTicketRaised,
              item.planCategory,
              item.ticket,
              (item.status == "0") ? "Resolved" : "Pending"
            );
          });
        } else if (response['tickets'] === 'None'){
          alert("No Tickets yet");
        } else{
          alert(response['tickets']);
        }
      });

    this.allMyPlans
      .sendGetRequest(this.phone)
      .subscribe(response => {
        if (response['myplans'] !== 'None') {
          this.myCategory = response['myplans'];
        } else{
          alert(response['myplans']);
        }
      });
  }

  tickets(){
    if (this.listVal !== "" && this.ticket !=="" && this.ticket.length >=10){
      this.ticketsList
        .sendPostRequest(this.phone, this.listVal, this.ticket)
        .subscribe(response => {
          if (response['ticket'] === 'raised') {
            alert("Ticket Raised successfully");
          } else{
            alert("Ticket raising error");
          }
        });
    }else{
      alert("Select the right plan and give brief explaination");
    }
    return ""
  }

}
