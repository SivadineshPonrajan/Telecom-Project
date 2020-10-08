import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AdminTicketService {

  constructor(public httpClient: HttpClient) { }

  private url = "http://127.0.0.1:5000/adminTickets";

  public PrepaidRequest() {
    return this.httpClient.post(this.url, {planCategory: "prepaid"});
  }
  public PostpaidRequest() {
    return this.httpClient.post(this.url, {planCategory: "postpaid"});
  }
  public BroadbandRequest() {
    return this.httpClient.post(this.url, {planCategory: "broadband"});
  }
  public PutRequest(tid) {
    return this.httpClient.put(this.url,{ticketId: tid});
  }

}
