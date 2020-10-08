import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AddnewcustomerService {

  constructor(public httpClient: HttpClient) { }

  private url = "http://127.0.0.1:5000/adminNewCustomer";

  public sendGetRequest() {
    return this.httpClient.get(this.url);
  }

  public sendPostRequest(name, dob, address, gender, email, phone) {
    return this.httpClient.post("http://127.0.0.1:5000/accept",{name: name, dob:dob, address: address, gender: gender, email: email, phone:phone});
  }

}
