import { Component, OnInit } from '@angular/core';
import { OrdersService} from "../../services/orders.service";
import {EachPlan} from "../../classes/EachPlan";
import {Router} from "@angular/router";
import {IsUserService} from "../../services/is-user.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent{

  phone: string = "";

  allPlans = new Array<EachPlan>();
  prepaidPlans = new Array<EachPlan>();
  postpaidPlans = new Array<EachPlan>();
  broadbandPlans = new Array<EachPlan>();

  constructor(private order: OrdersService, private router: Router, private isuser:IsUserService) {
    this.phone = JSON.parse(localStorage.getItem('key'))['phone'];
    if(this.phone === ""){
      this.router.navigate(['./login']);
    } else {
      this.isuser
        .findUser(this.phone)
        .subscribe(response => {
          if (response['data'] === '0') {
            this.router.navigate(['./login']);
          }
        });
    }

    this.order
      .sendGetRequest()
      .subscribe(response => {
        if (response['plans'] !== 'error') {
          this.allPlans = response['plans'].map(item => {
            return new EachPlan(
              item.pid,
              item.name,
              item.cost.toString(),
              item.validity.toString(),
              item.category
            );
          });
          this.prepaidPlans = this.allPlans.filter(plan => plan.category === "prepaid");
          this.postpaidPlans = this.allPlans.filter(plan => plan.category === "postpaid");
          this.broadbandPlans = this.allPlans.filter(plan => plan.category === "broadband");
        } else{
          alert(response['plans']);
        }
      });
  }

  recharge(pid){
    this.router.navigate(['./checkout', pid]);
  }


}
