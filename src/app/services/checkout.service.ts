import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(public httpClient: HttpClient) { }

  private url = "http://127.0.0.1:5000/checkout/";

  public sendGetRequest(pid) {
    return this.httpClient.get(this.url+pid);
  }

  public sendPostRequest(pid, phone) {
    return this.httpClient.post(this.url+pid,{phone: phone});
  }

}
