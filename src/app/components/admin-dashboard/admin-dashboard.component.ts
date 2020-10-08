import { Component, OnInit } from '@angular/core';
import {AdmindashService} from "../../services/admindash.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

  prepaid: string = "";
  postpaid: string = "";
  broadband: string = "";

  constructor(private dash:AdmindashService, private router: Router) {
    if(JSON.parse(localStorage.getItem('key'))['admin'] === ""){
      this.router.navigate(['./login']);
    }
    this.dash
      .sendGetRequest('prepaid')
      .subscribe(response => {
        if (response['allPlans'] === 'success') {
          this.prepaid = response['data'];
        } else{
          alert('dashboard loading error');
        }
      });

    this.dash
      .sendGetRequest('postpaid')
      .subscribe(response => {
        if (response['allPlans'] === 'success') {
          this.postpaid = response['data'];
        } else{
          alert('dashboard loading error');
        }
      });

    this.dash
      .sendGetRequest('broadband')
      .subscribe(response => {
        if (response['allPlans'] === 'success') {
          this.broadband = response['data'];
        } else{
          alert('dashboard loading error');
        }
      });
  }

}
