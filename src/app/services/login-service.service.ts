import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  loginUrl = "https://teamhr.tvsmotor.co.in/AMS/api/Authenticate";

  login(authenticateData: any) {
    return this.http.post(this.loginUrl, authenticateData, this.httpOptions);
  }
}
