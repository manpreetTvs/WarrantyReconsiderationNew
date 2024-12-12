import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
// import {base64} from 'angular-base64';
@Injectable({
    providedIn: 'root'
})
export class RequestService {
    constructor() {

    }
    public static baseUrl(): string {
        return environment['host'];
    }

    public static baseUrlSAP(): string {
        return environment['SAPHOst'];
    }
    /**
     * Get 
     * @param {string} url
     * Return Object
     */
    static getReq(url: any) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 
        'Authorization':'Bearer '+sessionStorage.getItem('authToken') });
        //});
        return {
            url: this.baseUrl() + url,
            headers: headers
        };
    }
      /**
     * Get 
     * @param {string} url
     * Return Object
     */
       static getDeaReq(url: any) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json'});
        return {
            url: this.baseUrl() + url,
            headers: headers
        };
    }
    /**
     * Get 
     * @param {string} url
     * Return Object
     */
    static postReq(url: any) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' , 
       'Authorization':'Bearer '+sessionStorage.getItem('authToken') });
       // });
        return {
            url: this.baseUrl() + url,
            headers: headers
        };
    }
    static postDeaReq(url: any) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return {
            url: this.baseUrl() + url,
            headers: headers
        };
    }
    /**
     * Get 
     * @param {string} url
     * Return Object
     */
    static loginReq(url: any) {
        let headers = new HttpHeaders({ 'Content-Type': 'text/plain', 'Authorization':'Bearer '+sessionStorage.getItem('authToken') });
        //let headers = new HttpHeaders({ 'Content-Type': 'text/plain', 'Authorization':'Bearer ' });

        return {
            url: this.baseUrl() + url,
            headers: headers
        };
    }
    static getSAPReq(url: any) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //     let headers = new HttpHeaders({ 'Authorization':'Basic ' + base64.encode('S.MANIVEL' + ":" + 'Manidev5%'),
    //     'Content-Type':'application/json',
    //     'x-csrf-token':'Fetch' // get CSRF Token for post or update
    // });
        return {
            url: this.baseUrlSAP() + url,
            headers: headers
        };
    }
     /**
     * Get 
     * @param {string} url
     * Return Object
     */
      static postSAPReq(url: any) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return {
            url: this.baseUrlSAP() + url,
            headers: headers
        };
    }
    static tokenReq(url: any) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json;charset=utf-8' });
        return {
            url: this.baseUrl()+'/' + url,
            headers: headers
        };
    }
    // static getApiURLReq(url) {
    //     let headers = new HttpHeaders({ 'Content-Type': 'text/plain', 'Authorization':'Bearer '+sessionStorage.getItem('AuthTokSalesService') });
    //     return {
    //         url: this.baseWebApiURL() + url,
    //         headers: headers
    //     };
    // }

    
}