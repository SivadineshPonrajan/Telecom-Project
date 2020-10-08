import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../../services/profile.service";
import {Router} from "@angular/router";
import {IsUserService} from "../../services/is-user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  custName: string;
  dob;
  address: string;
  gender: string;
  email: string;
  phone: string;

  constructor(private profile: ProfileService, private router: Router, private isuser: IsUserService) {
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
    this.profile
      .sendGetRequest(this.phone)
      .subscribe(response => {
        if (response['profile'] === 'success') {
          this.custName = response["name"];
          this.dob = response["dob"];
          this.address = response["address"];
          this.gender = response["gender"];
          this.email = response["email"];
        } else{
          alert(response['profile']);
        }
      });
  }

  updateCustomerProfile(){
    this.profile
      .sendPutRequest(this.phone, this.custName, this.gender, this.email)
      .subscribe(response => {
        if (response['updation'] === 'success') {
          alert("Profile updated successfully")
        } else{
          alert("Profile updation error");
        }
      });
  }


}
