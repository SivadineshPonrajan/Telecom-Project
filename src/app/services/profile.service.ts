import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(public httpClient: HttpClient) { }

  private url = "http://127.0.0.1:5000/profile/";

  public sendGetRequest(phno) {
    return this.httpClient.get(this.url+phno);
  }

  public sendPutRequest(phno, name, gender, email) {
    return this.httpClient.put(this.url+phno,{name: name, gender: gender, email: email});
  }

}
