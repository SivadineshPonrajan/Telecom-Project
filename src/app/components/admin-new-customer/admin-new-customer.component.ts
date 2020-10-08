import { Component, OnInit } from '@angular/core';
import {EachNewCustomer} from "../../classes/EachNewCustomer";
import {AddnewcustomerService} from "../../services/addnewcustomer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-new-customer',
  templateUrl: './admin-new-customer.component.html',
  styleUrls: ['./admin-new-customer.component.css']
})
export class AdminNewCustomerComponent{

  allNew = new Array<EachNewCustomer>();
  contact: number;

  constructor(private adder: AddnewcustomerService, private router: Router) {
    if(JSON.parse(localStorage.getItem('key'))['admin'] === ""){
      this.router.navigate(['./login']);
    }
    this.adder
      .sendGetRequest()
      .subscribe(response => {
        if (response['customers'] === 'success') {
          this.allNew = response['allCustomers'].map(item => {
            return new EachNewCustomer(
              item.name,
              item.dob,
              item.address,
              item.gender,
              item.email,
              item.phone
            );
          });
        } else{
          alert("No new customers");
        }
      });
  }

  individual(name, dob, address, gender, email, phone){
    this.adder
      .sendPostRequest(name, dob, address, gender, email, phone)
      .subscribe(response => {
        if (response['reg'] === 'success') {
          alert("Successfully added");
        } else{
          alert("Adding Error");
        }
      });
  }

}
