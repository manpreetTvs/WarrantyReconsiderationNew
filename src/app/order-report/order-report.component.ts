import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { MapService } from '../services/map.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CalendarModule } from 'primeng/calendar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {  } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';





export class OrderDetailsDO {
  ID!: number;
  ORDER_NO!: string;
  ORDER_NUMBER!: string;
  CLAIM_SETTLED_DATE?: any;
  DAYS_LEFT_FOR_RECLAIMING!: string;
  PART_NUMBER!: string;
  PART_DESCRIPTION!: string;
  FRAME_NUMBER!: string;
  KMS!: string;
  SALES_DATE?: any;
  REPAIR_DATE?: any;
  MODEL!: string;
  NDP_RATE!: string;
  DEALER_CODE!: string;
  DEALER_NAME!: string;
  REASON_FOR_REJECTION!: string;
  JUSTIFICATION!: string;
  CITY!: string;
  vSTATUS!: string;
  CREATED_ON?: any;
  FILENAME!: string;
  PENDING_WITH: string = '';
  TM: string = '';
  TM_REMARKS: string = '';
  AM: string = '';
  AM_REMARKS: string = '';
  CREDITED_DATE: string = '';
}


@Component({
  standalone: true,
  selector: 'app-order-report',
  templateUrl: './order-report.component.html',
  styleUrls: ['./order-report.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    CalendarModule, 
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatTableModule,
    MatFormFieldModule,
    MatTabsModule,
    NgxDatatableModule,
  ]
})
export class OrderReportComponent implements OnInit {
  public isDisabled: boolean = true;
  public orderno: string = '';
  public claimsettleddate: string = '';
  public daysleft: string = '';
  public partno: string = '';
  public partdesc: string = '';
  public frameno: string = '';
  public kms: string = '';
  public salesdate: string = '';
  public repairdate: string = '';
  public model: string = '';
  public ndprate: string = '';
  public dealercode: string = '';
  public dealername: string = '';
  public reasonforrejection: string = '';
  public justification: string = '';
  public city: string = '';
  public orderDetails: any = [];
  public selectedId: any = {};
  public displayDetailSec: boolean = false;
  public role: string = '';
  public status: string = '';
  public fromddate: string = '';
  public todate: string = '';
  public searchdealercode: string = '';
  public searchorderno: string = '';
  public searchFilter: any = {};
  public escalationList: any = [];
  public fileList: any = [];
  public dealerQueryToList: any = [];
  public dealerQueryToName: string = '';
  public dealerQuerySelected: string = '';
  public dealerSendQueryFilterData: any = {};
  public popup: boolean = false;
  public dealerCode: string = '';
  public dealerName: string = '';
  public dealerQuery: string = '';
  public empno: string = '';
  public fromdate: string = '';
  public stage: string = '';
  public OrderDetails: any = new OrderDetailsDO();
  errorMap: MapService = new MapService();


  constructor(private commonService:CommonService) { }

  ngOnInit() {
    // this.empno="12280";
    // this.role="TM";
    this.empno = localStorage.getItem("empno") || '';
    this.role = localStorage.getItem("role") || '';
   
  }

  getReportDetails()
  {
    if(this.validateSearch(0)){

    
    console.log("this.role",this.role);
    if(this.stage=="Pending")
    {
      if (this.role == "TM") {
   
        this.status="C";
      }
      else if (this.role == "AM") {
      
        this.status="TA";
      }
      else if (this.role == "HO") {
    
        this.status="AA";
      }
      else if(this.role=="Dealer")
      {
        this.status="C";
      }
    }
    else if(this.stage=="Completed"){
      this.stage="F";
    }
    else{
      this.stage="";
    }
    
    if(this.role=="TM")
    {
      this.commonService.getOrderDetails('status=' +this.stage+"&&from_date="+this.fromdate+"&&to_date="+this.todate+"&&tm="+this.empno+"&&am=&&ho=&&dealer=&&orderno=&&empno="+localStorage.getItem('empno')+"&&role="+localStorage.getItem('role')).
      //this.commonService.getOrderDetails('status=' +this.stage+"&&from_date="+this.fromdate+"&&to_date="+this.todate+"&&tm="+this.empno+"&&am=&&ho=&&dealer=&&orderno=&&empno="+"12280"+"&&role="+"TM").

      subscribe((resp: any) => {
        if (resp && resp.statusCode == 200) {
          this.orderDetails=resp.data;
        }
       });
    }   
     else if(this.role=="AM")
      {
        this.commonService.getOrderDetails('status=' +this.stage+"&&from_date="+this.fromdate+"&&to_date="+this.todate+"&&tm=&&am="+this.empno+"&&ho=&&dealer=&&orderno=&&empno="+localStorage.getItem('empno')+"&&role="+localStorage.getItem('role')).
        subscribe((resp: any) => {
          if (resp && resp.statusCode == 200) {
            this.orderDetails=resp.data;
          }
         });
      }
      else if(this.role=="HO")
      {
        this.commonService.getOrderDetails('status=' +this.stage+"&&from_date="+this.fromdate+"&&to_date="+this.todate+"&&tm=&&am="+this.empno+"&&ho=&&dealer=&&orderno=&&empno="+localStorage.getItem('empno')+"&&role="+localStorage.getItem('role')).
        subscribe((resp: any) => {
          if (resp && resp.statusCode == 200) {
            this.orderDetails=resp.data;
          }
         });
      }
    }
     
    
  }
  validateSearch(validateCode: number) {
    debugger;
    if (validateCode == 0) {
      this.errorMap = new MapService();
    }
    if (validateCode == 0 || validateCode == 1) {
      if (this.fromdate == null || this.fromdate == undefined||this.fromdate == "") {
        this.errorMap.put("datefrom", '');

        this.commonService.error("Please enter the From Date");

      }
      else {
        this.errorMap.remove("datefrom");
        if (this.todate == null || this.todate == undefined||this.todate == "") {
          this.errorMap.put("dateto", '');
  
          this.commonService.error("Please enter the To Date");
  
        }else {
          this.errorMap.remove("dateto");
        }
       
      }
    }
    if (this.errorMap.isEmpty()) {
      return true;
    } else {
      return false;
    }

  }
  getRequestByDetails(item: any)
  {
    console.log("item",item.ID);
    this.commonService.getOrderDetailsById('Reqno='+item.ID+"&&empno="+localStorage.getItem('empno')+"&&role="+localStorage.getItem('role')).
    //this.commonService.getOrderDetailsById('Reqno='+item.ID+"&&empno="+"12280"+"&&role="+"TM").  
    subscribe((resp: any) => {
        if (resp && resp.statusCode == 200) {
          //this.approval.ID=item.ID;
          if(resp.data!="")
          {
           // this.from_empname=item.FROM_EMPNAME;
           this.OrderDetails=resp.data;
           // this.escalationList=resp.data;
          //  console.log("this.approval",this.approval);
            this.escalationList = resp.data.query;
          }
          
          this.displayDetailSec = true;
          
        // this.mappingList(item.DEALER_CODE);
         //this.getQueryToList(item.ID);
         
        }
      });
  }

}
