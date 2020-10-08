import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CrmService} from "../../services/crm.service";
import {EachCrmData} from "../../classes/EachCrmData";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  constructor(private crm:CrmService, private router: Router) { }

  adminForm=new FormGroup({
    firstName:new FormControl('',[Validators.required,Validators.minLength(5)]),
    dob:new FormControl('',Validators.required),
    address:new FormControl('',[Validators.required,Validators.minLength(10)]),
    gender:new FormControl('',Validators.required),
    email:new FormControl('',Validators.required),
    phone:new FormControl('',Validators.required),
  });

  home(){
    this.router.navigate(['./main']);
  }

  onSubmit()
  {
    this.crm
      .sendPostRequest(this.adminForm.get("firstName").value,this.adminForm.get("dob").value,this.adminForm.get("address").value,this.adminForm.get("gender").value,this.adminForm.get("email").value,this.adminForm.get("phone").value)
      .subscribe(response => {
        if (response['reg'] === 'success') {
          alert("Successfully applied for the service");
          this.router.navigate(['./login']);
        } else{
          alert("Application error");
        }
      });
  }

}
