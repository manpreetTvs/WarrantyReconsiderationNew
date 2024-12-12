import { DatePipe } from '@angular/common';
import { ArrayType } from '@angular/compiler';
//import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { DealerServiceService } from '../services/dealer-service.service';
import { TmServiceService } from '../services/tm-service.service';
import * as $ from 'jquery';
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
import { MatPaginator } from '@angular/material/paginator';


export class OrderDetailsDO {
  ID: number = 0;
  ORDER_NO: string = '';
  ORDER_NUMBER: string = '';
  CLAIM_SETTLED_DATE?: any = null;
  DAYS_LEFT_FOR_RECLAIMING: string = '';
  PART_NUMBER: string = '';
  PART_DESCRIPTION: string = '';
  FRAME_NUMBER: string = '';
  KMS: string = '';
  SALES_DATE?: any = null;
  REPAIR_DATE?: any = null;
  MODEL: string = '';
  NDP_RATE: string = '';
  DEALER_CODE: string = '';
  DEALER_NAME: string = '';
  REASON_FOR_REJECTION: string = '';
  JUSTIFICATION: string = '';
  CITY: string = '';
  vSTATUS: string = '';
  CREATED_ON?: any = null;
  FILENAME: string = '';
  PENDING_WITH: string = '';
  TM: string = '';
  TM_REMARKS: string = '';
  AM: string = '';
  AM_REMARKS: string = '';
  CREDITED_DATE: string = '';
}



@Component({
  standalone: true,
  selector: 'app-dealer-report',
  templateUrl: './dealer-report.component.html',
  styleUrls: ['./dealer-report.component.css'],
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
    MatPaginator
  ]
})
export class DealerReportComponent implements OnInit {

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
  public empno:string = '';
  public fromdate: string = '';
  public stage: string = '';
  public OrderDetails:any=new OrderDetailsDO();
  errorMap: MapService = new MapService();

  constructor(private dealerService: DealerServiceService, private datePipe: DatePipe, 
    private tmService: TmServiceService,private commonService:CommonService) { }

  ngOnInit() {
    // this.role = sessionStorage.getItem('role');
    // console.log(this.role);
    // if(this.role === 'TM') {
    //   this.status = 'C';
    //   // console.log(this.status);
    // }
    // this.role="Dealer";
    // this.empno='50077';
    
    this.empno = localStorage.getItem('empno') || '';
   this.role = localStorage.getItem('role') || '';
    console.log("this.empno",this.empno);

    // this.dealerService.fetchOrderDetails().subscribe((data)=> {
    //   this.orderDetails = data['response']['recordset'];
    //   console.log(this.orderDetails);
    // });
   // this.fetchQueryDetails();
  }

  fetchQueryDetails()
  {
    let getdata: any;
      console.log("this.role",this.role);
      if (this.role == "Dealer") {
        getdata = 4;
        this.status="Q";
      }
      else if (this.role == "TM") {
        getdata = 5;
        this.status="Q";
      }
      else if (this.role == "AM") {
        getdata = 6;
        this.status="Q";
      }
      this.commonService.getPendingOrderApproval('status=' + this.status + "&&empno=" + this.empno + "&&getdata="+getdata+"&&role="+this.role).
        subscribe((resp: any) => {
          if (resp && resp.statusCode == 200) {
            this.orderDetails = resp.data;
          
           
          }
        });
  }

  selectedQueryTo(event: any) {
    this.dealerQueryToName = event.target.options[event.target.options.selectedIndex].text;
    this.dealerQuerySelected = event.target.value;
    // console.log(this.querySelected);
  }

  searchOrderDetails() {
    this.searchFilter['FROM_DATE'] = this.fromddate;
    this.searchFilter['TO_DATE'] = this.todate;
    this.searchFilter['DEALER_CODE'] = this.searchdealercode;
    this.searchFilter['ORDER_NUMBER'] = this.searchorderno;
    this.dealerService.fetchOrderDetailsSearch(this.searchFilter).subscribe((data: any)=>{
      this.orderDetails = data['response']['recordset'];
    });
  }

  fetchReqDetails(id: number) {
    this.displayDetailSec = true;
    console.log(id);
    console.log("Inside fetchReqDetails()")
    this.selectedId['reqNo'] = id;
    this.tmService.escalationDetails(id).subscribe((data: any) => {
      if(data.response.recordset.length > 0) {
        this.escalationList = data.response.recordset;
        console.log(this.escalationList);
      }
    });
    this.dealerService.fileDetails(id).subscribe((data: any) => {
      if(data['response']['recordset'].length > 0) {
        this.fileList = data.response.recordset;
        console.log(this.fileList);
      }
    });
    this.dealerService.dealerQueryToList(id).subscribe((data: any) => {
      if(data['response']['recordset'].length > 0) {
        this.dealerQueryToList = data.response.recordset;
        console.log(this.dealerQueryToList);
      }
    });
    this.tmService.fetchOrderDetailsId(this.selectedId).subscribe((data: any)=> {
      console.log(data.response.recordset);
      this.claimsettleddate = this.datePipe.transform(data.response.recordset[0].CLAIM_SETTLED_DATE, 'yyyy-MM-dd') || '';
      this.daysleft = data.response.recordset[0].DAYS_LEFT_FOR_RECLAIMING;
      this.partno = data.response.recordset[0].PART_NUMBER;
      this.partdesc = data.response.recordset[0].PART_DESCRIPTION;
      this.frameno = data.response.recordset[0].FRAME_NUMBER;
      this.kms = data.response.recordset[0].KMS;
      this.salesdate = this.datePipe.transform(data.response.recordset[0].SALES_DATE, 'yyyy-MM-dd') || '';
      this.repairdate = this.datePipe.transform(data.response.recordset[0].REPAIR_DATE, 'yyyy-MM-dd') || '';
      this.model = data.response.recordset[0].MODEL;
      this.ndprate = data.response.recordset[0].NDP_RATE;
      this.dealercode = data.response.recordset[0].DEALER_CODE;
      this.dealername = data.response.recordset[0].DEALER_NAME;
      this.reasonforrejection = data.response.recordset[0].REASON_FOR_REJECTION;
      this.justification = data.response.recordset[0].JUSTIFICATION;
      this.city = data.response.recordset[0].CITY;
    });
  }

  sendQuery() {
    this.popup = true;
    this.dealerSendQueryFilterData['REQ_ID'] = this.selectedId['reqNo'];
    this.dealerSendQueryFilterData['ROLE'] = 'Dealer';
    this.dealerSendQueryFilterData['FROM_EMPNO'] = this.dealercode;
    this.dealerSendQueryFilterData['FROM_EMPNAME'] = this.dealername;
    this.dealerSendQueryFilterData['TO_EMPNO'] = this.dealerQuerySelected;
    this.dealerSendQueryFilterData['TO_EMPNAME'] = this.dealerQueryToName;
    this.dealerSendQueryFilterData['REMARKS'] = this.dealerQuery;
    console.log(this.dealerSendQueryFilterData);
    this.tmService.sendQuery(this.dealerSendQueryFilterData).subscribe((data)=> {
      console.log(data);
    });
  }

  // getReportDetails()
  // {
  //   console.log("this.role",this.role);
  //   if(this.stage=="Pending")
  //   {
  //     if (this.role == "TM") {
   
  //       this.status="C";
  //     }
  //     else if (this.role == "AN") {
      
  //       this.status="NSMA";
  //     }
  //     else if (this.role == "HO") {
    
  //       this.status="GMSA";
  //     }
  //     else if(this.role=="Dealer")
  //     {
  //       this.status="C";
  //     }
  //   else if(this.stage="Completed"){
  //     this.stage="F";
  //   }
  //   else{
  //     this.stage="";
  //   }
  //   if(this.role=="TM")
  //   {
  //     this.commonService.getOrderDetails('status=' +this.status+"&&from_date="+this.fromdate+"&&to_date="+this.todate+"&&tm="+this.empno+"&&am=&&ho=&&dealer=&&orderno=").
  //     subscribe((resp: any) => {
  //       if (resp && resp.statusCode == 200) {
  //         this.orderDetails=resp.data;
  //       }
  //      });
  //   }
   
  //    else if(this.role=="AM")
  //     {
  //       this.commonService.getOrderDetails('status=' +this.status+"&&from_date="+this.fromdate+"&&to_date="+this.todate+"&&tm=&&am="+this.empno+"&&ho=&&dealer=&&orderno=").
  //       subscribe((resp: any) => {
  //         if (resp && resp.statusCode == 200) {
  //           this.orderDetails=resp.data;
  //         }
  //        });
  //     }
  //     else if(this.role=="HO")
  //     {
  //       this.commonService.getOrderDetails('status=' +this.status+"&&from_date="+this.fromdate+"&&to_date="+this.todate+"&&tm=&&am="+this.empno+"&&ho=").
  //       subscribe((resp: any) => {
  //         if (resp && resp.statusCode == 200) {
  //           this.orderDetails=resp.data;
  //         }
  //        });
  //     }
  //     else if(this.role=="Dealer")
  //     {
  //       this.commonService.getOrderDetails('status=' +this.status+"&&from_date="+this.fromdate+"&&to_date="+this.todate+"&&tm=&&am=&&ho="+this.empno).
  //       subscribe((resp: any) => {
  //         if (resp && resp.statusCode == 200) {
  //           this.orderDetails=resp.data;
  //         }
  //        });
  //     }
  //   }
  // }
  getReportDetails()
  {
    this.validateSearch(0)
    {

    
    let orderno:any;
    let dealerCode:any;
    if(this.searchorderno==undefined)
    {
     orderno=" ";
    }
    else{
      orderno=this.searchorderno;
    }
    if(this.searchdealercode==undefined)
    {
     dealerCode=" ";
    }
    else{
      dealerCode=this.searchdealercode;
    }
   
    console.log("searchorderno",this.empno);
    console.log("searchdealercode",this.searchdealercode);
      this.commonService.getOrderDetails("status=&&from_date="+this.fromdate+"&&to_date="+this.todate+"&&tm=&&am=&&ho=&&dealer="+dealerCode+"&&orderno="+orderno+"&&empno="+this.empno+"&&role="+this.role).
      subscribe((resp: any) => {
        if (resp && resp.statusCode == 200) {
          this.orderDetails=resp.data;
        }
       });
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
  getRequestByDetails(item: { ID: string; })
  {
    console.log("item",item.ID);
    this.commonService.getOrderDetailsById('Reqno='+item.ID+"&&empno="+this.empno+"&&role="+this.role).
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
