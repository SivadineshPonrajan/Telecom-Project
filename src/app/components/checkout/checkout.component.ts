import { Component } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {FormGroup,FormControl} from '@angular/forms';
import {Validators} from '@angular/forms'
import {CheckoutService} from "../../services/checkout.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  pid: string;
  phone: string;
  pname: string = "";
  pcost: string = "";
  pvalid: string = "";
  pcat: string = "";

  constructor(private route: ActivatedRoute, private check:CheckoutService, private router:Router) {
    this.phone = JSON.parse(localStorage.getItem('key'))['phone'];
    this.route.params.subscribe((params: Params) => this.pid = params['pid']);
    this.check
      .sendGetRequest(this.pid)
      .subscribe(response => {
        if (response['plan'] === 'success') {
          this.pname = response["planName"];
          this.pcost = response["planCost"];
          this.pvalid = response["planValidity"];
          this.pcat = response["planCategory"];
        } else{
          alert(response['plan']);
        }
      });
  }

  userBillingForm=new FormGroup({
    firstName:new FormControl('',[Validators.required,Validators.minLength(5)]),
    email:new FormControl('',Validators.required),
    address:new FormControl('',[Validators.required,Validators.minLength(10)]),
    city:new FormControl('',Validators.required),
    state:new FormControl('',Validators.required),
    zip:new FormControl('',Validators.required),

    cardname:new FormControl('',Validators.required),
    cardnumber:new FormControl('',Validators.required),
    expmonth:new FormControl('',Validators.required),
    expyear:new FormControl('',Validators.required),
    cvv:new FormControl('',Validators.required)

  });


  onSubmit() {
    this.check
      .sendPostRequest(this.pid, this.phone)
      .subscribe(response => {
        if (response['bill'] === 'raised') {
          alert("Billing successful");
          this.router.navigate(['./order']);
        } else{
          alert("Billing error");
        }
      });
  }
}
