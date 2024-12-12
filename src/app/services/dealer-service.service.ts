import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
// import {base64} from 'angular-base64';
// import { Options } from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})
export class DealerServiceService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  insertOrderDeatilsUrl = environment.apiUrlIndex + "insertOrderDetails";
  fetchOrderDetailsUrl = environment.apiUrlIndex + "fetchOrderDetails";
  fetchOrderDetailsSearchUrl = environment.apiUrlIndex + "fetchOrderDetailsSearch";
  uploadFileUrl = environment.apiUrlIndex + "uploadfile"
  fileDetailsUrl = environment.apiUrlIndex + "fileDetails"
  dealerQueryToListUrl = environment.apiUrlIndex + "dealerQueryTo"
  tmListUrl = environment.apiUrlApp + "tmList"
  fetchSapOrderDetailsUrl = environment.apiUrlSap + "sapcall";


  insertOrderDetails(orderdetails: any) {
    console.log("Service");
    console.log(orderdetails);
    return this.http.post(this.insertOrderDeatilsUrl, orderdetails, this.httpOptions);
  }

  fetchOrderDetails() {
    console.log(this.fetchOrderDetailsUrl);
    return this.http.get(this.fetchOrderDetailsUrl);
  }

  fetchOrderDetailsSearch(searchFilter: any) {
    return this.http.post(this.fetchOrderDetailsSearchUrl, searchFilter, this.httpOptions);
  }

  fetchSapData() {
    console.log("Inside service function");
    return this.http.post('http://thshdevsrvr.hosur.tvsmotor.co.in:8000/sap/bc/zsd_war_rej_rec/war_rej_recon?sap-client=400', {"ORDER_NO": "63174335"})
    // return this.http.post('https://tvsmrumclr.tvsmotor.co.in/sap/bc/zsd_war_rej_rec/war_rej_recon?sap-client=777', {"ORDER_NO": "63174335"})
  }

  fetchSAPDataNew(){
    var url = "http://thshdevsrvr.hosur.tvsmotor.co.in:8000/sap/bc/zsd_war_rej_rec/war_rej_recon?sap-client=400";
    //     let headers = new HttpHeaders({ 'Authorization':'Basic ' + base64.encode('S.MANIVEL' + ":" + 'Manidev5%'),
    //     'Content-Type':'application/json',
    //     'x-csrf-token':'Fetch' // get CSRF Token for post or update
    // });
    
   // return this.http.get(url,{headers:headers})
  }

  uploadFile(formData: any) {
    return this.http.post(this.uploadFileUrl, formData)
  }

  fileDetails(id: any) {
    return this.http.post(this.fileDetailsUrl, { 'ID': id}, this.httpOptions);
  }

  fetchTmList(dealerCode: any) {
    return this.http.post(this.tmListUrl, { 'dealerCode': dealerCode}, this.httpOptions);
  }

  dealerQueryToList(id: any) {
    return this.http.post(this.dealerQueryToListUrl, { 'reqNo': id }, this.httpOptions);
  }

  fetchSapOrderDetails(orderno: string) {
    console.log(this.fetchSapOrderDetailsUrl + "/" + orderno);
    return this.http.get(this.fetchSapOrderDetailsUrl + "/" + orderno);
  }
}
