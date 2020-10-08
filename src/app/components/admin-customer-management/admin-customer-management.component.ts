import { Component, OnInit } from '@angular/core';
import {EachCrmData} from "../../classes/EachCrmData";
import {CrmService} from "../../services/crm.service";
import {ProfileService} from "../../services/profile.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-customer-management',
  templateUrl: './admin-customer-management.component.html',
  styleUrls: ['./admin-customer-management.component.css']
})
export class AdminCustomerManagementComponent {

  allCrm = new Array<EachCrmData>();
  cname: string = "";
  cdob: string = "";
  cgender: string = "";
  caddress: string = "";
  cemail: string = "";
  cphone: string = "";


  constructor(private crm: CrmService, private profile: ProfileService, private router: Router) {
    if(JSON.parse(localStorage.getItem('key'))['admin'] === ""){
      this.router.navigate(['./login']);
    }
    this.crm
      .sendGetRequest()
      .subscribe(response => {
        if (response['customers'] === 'success') {
          this.allCrm = response['allCustomers'].map(item => {
            return new EachCrmData(
              item.phone,
              item.custName,
              item.planCategory,
              item.planName,
              item.starter
            );
          });
        } else{
          alert(response['customers']);
        }
      });
  }

  individual(phone){
    this.profile
      .sendGetRequest(phone)
      .subscribe(response => {
        if (response['profile'] === 'success') {
          this.cphone = phone;
          this.cname = response["name"];
          this.cdob = response["dob"];
          this.caddress = response["address"];
          this.cgender = response["gender"];
          this.cemail = response["email"];
        } else{
          alert(response['profile']);
        }
      });
  }

}
