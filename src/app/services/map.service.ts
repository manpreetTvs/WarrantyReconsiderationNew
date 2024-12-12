/**
 * Created BY HMSPL 
 * Map Service Class
 * Last Modified By Dharvesh on 30/07/2018
 * Last Modified Description : Map Error Message Add and Remove Messagr Service
 */
 import { Injectable } from '@angular/core';

 @Injectable({
   providedIn: 'root'
 })
 export class MapService {
   keys: Array<any> = [];
   data: { [key: string]: any } = {}; // Changes manpreet
   constructor() { }
 
   put(key: any, value: any) {
     if (this.data[key] == null) {
       this.keys.push(key);
     }
     this.data[key] = value;
   }
 
   get(key: any) {
     return this.data[key];
   }
 
   remove(key: any) {
     for (var i = 0; i < this.keys.length; i++) {
       if (this.keys[i] == key) {
         this.keys.splice(i, 1);
         break;
       }
     }
     delete this.data[key]
   }
 
   each(fn: (arg0: any, arg1: any, arg2: number) => void) {
     if (typeof fn != 'function') {
       return;
     }
     var len = this.keys.length;
     for (var i = 0; i < len; i++) {
       var k = this.keys[i];
       fn(k, this.data[k], i);
     }
   }
 
   entrys() {
     var len = this.keys.length;
     var entrys = new Array(len);
     for (var i = 0; i < len; i++) {
       entrys[i] = {
         key: this.keys[i],
         value: this.data[i]
       };
     }
     return entrys;
   }
 
   isEmpty() {
     return this.keys.length == 0;
   }
 
   size() {
     return this.keys.length;
   }
   allKeys() {
     return this.keys;
   }
 }
 