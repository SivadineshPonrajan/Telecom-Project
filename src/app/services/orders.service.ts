import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(public httpClient: HttpClient) { }

  private url = "http://127.0.0.1:5000/order";

  public sendGetRequest() {
    return this.httpClient.get(this.url);
  }

}
