/**
 * Created BY HMSPL 
 * Moment date pipe 
 * Last Modified By Balaji on 10/08/2018
 * Last Modified Description : Created pipe for date
 */
 import { Pipe, PipeTransform } from '@angular/core';
 import moment from 'moment';
 @Pipe({
   name: 'momentDate',
   standalone: true
 })
 export class MomentDatePipe implements PipeTransform {
   transform(value: any): any {
     try {
       if (value && moment(value).isValid()) {
         if (moment(value).format("DD/MM/YYYY") === moment().subtract(1, 'day').format("DD/MM/YYYY")) {
           return 'Yesterday';
         } else if (moment(value).format("DD/MM/YYYY") === moment().format("DD/MM/YYYY")) {
           return 'Today';
         } else if (moment(value).format("DD/MM/YYYY") === moment(new Date()).add(1, 'day').format("DD/MM/YYYY")) {
           return 'Tomorrow';
         } else if (moment(value).format("DD/MM/YYYY") && moment(value).format("DD/MM/YYYY") === '01/01/0001') {
           return '';
         } else {
           return moment(value).format("DD/MM/YYYY");
         }
       } else {
         return '';
       }
     }
     catch (err) {
       return 'Invalid Date';
     }
   }
 }
 
 @Pipe({
   name: 'momentFilterDate',
   standalone: true
 })
 export class MomentFilterDatePipe implements PipeTransform {
   transform(value: any): any {
     try {
       if (value && moment(value).isValid()) {
         return moment(value).format("DD/MM/YYYY");
       } else {
         return '';
       }
     }
     catch (err) {
       return 'Invalid Date';
     }
   }
 }
 
 