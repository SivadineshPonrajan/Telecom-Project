import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(public httpClient: HttpClient) { }

  private url = "http://127.0.0.1:5000/login/";

  public sendGetRequest(phno) {
    return this.httpClient.get(this.url+phno);
  }

  public sendPostRequest(phno, otp) {
    return this.httpClient.post(this.url+phno,{"otp": otp});
  }

}
