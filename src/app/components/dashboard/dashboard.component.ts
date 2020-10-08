import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {MyPlansService} from "../../services/my-plans.service";
import {IsUserService} from "../../services/is-user.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  myCategory = [];
  phone: string;

  constructor(private allMyPlans: MyPlansService, private router: Router, private isuser: IsUserService) {
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
    this.allMyPlans
      .sendGetRequest(this.phone)
      .subscribe(response => {
        if (response['myplans'] !== 'None') {
          this.myCategory = response['myplans'];
          console.log(this.myCategory);
        } else{
          alert(response['myplans']);
        }
      });
  }

}
