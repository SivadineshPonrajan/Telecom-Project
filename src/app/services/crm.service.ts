import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CrmService {

  constructor(public httpClient: HttpClient) { }

  private url = "http://127.0.0.1:5000/adminCustomers";

  public sendGetRequest() {
    return this.httpClient.get(this.url);
  }

  public sendPostRequest(custName, dob, address, gender, email, phone) {
    return this.httpClient.post(this.url, {custName:custName, dob: dob, address: address, gender: gender, email: email, phone: phone});
  }

}
