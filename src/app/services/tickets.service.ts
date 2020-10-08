import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(public httpClient: HttpClient) { }

  private url = "http://127.0.0.1:5000/tickets/";

  public sendGetRequest(phone) {
    return this.httpClient.get(this.url+phone);
  }

  public sendPostRequest(phone, plan, ticket) {
    return this.httpClient.post(this.url+phone, {planCategory: plan, ticket: ticket});
  }

}
