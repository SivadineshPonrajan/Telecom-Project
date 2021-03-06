import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MyPlansService {

  constructor(public httpClient: HttpClient) { }

  private url = "http://127.0.0.1:5000/myplans/";

  public sendGetRequest(phone) {
    return this.httpClient.get(this.url+phone);
  }

}
