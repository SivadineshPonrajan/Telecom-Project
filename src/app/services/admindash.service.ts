import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AdmindashService {

  constructor(public httpClient: HttpClient) { }

  private url = "http://127.0.0.1:5000/admindash/";

  public sendGetRequest(category) {
    return this.httpClient.get(this.url+category);
  }

}
