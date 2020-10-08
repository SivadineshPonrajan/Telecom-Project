import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthenticationService } from "../../services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  auname: string = "";
  aupass: string = "";
  phno: string = "";
  otp: string = "";

  constructor(private auth: AuthenticationService, private router: Router) {
    localStorage.setItem('key', JSON.stringify({ admin: "", phone: "" }));
  }

  isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); }

  generateOtp() {
    if (this.phno !== ""  && this.phno !== null && this.phno.length === 10 && this.isNumber(this.phno))
    {
    this.auth
      .sendGetRequest(this.phno)
      .subscribe(response => {
        if (response['otpGeneration'] === 'success') {
          alert('OTP has been sent to your mail.');
        } else{
          alert(response['otpGeneration']);
        }
      });
  }
    else{
      alert("Invalid Phone Number")
    }
  }

  adminLogin(){
    if (this.auname == "admin" && this.aupass == "admin"){
      localStorage.setItem('key', JSON.stringify({ admin: "admin", phone: "" }));
      this.router.navigate(['./adminDashboard']);
    }else{
      alert("Invalid login data");
    }
  }

  home(){
    this.router.navigate(['./main']);
  }

  customerLogin(){
    if (this.phno !== ""  && this.phno !== null && this.phno.length === 10 && this.isNumber(this.phno) && this.otp !== "" && this.otp !== null && this.otp.length === 6){
      this.auth
        .sendPostRequest(this.phno, this.otp)
        .subscribe(response => {
          if (response['Authentication'] === 'success') {
            localStorage.setItem('key', JSON.stringify({ admin: "", phone: this.phno }));
            this.router.navigate(['./dashboard']);
          }else if (response['Authentication'] === 'failed') {
            alert("Invalid OTP");
          }
        });
    }else{
      alert("Invalid data")
    }
  }
}
