import { DatePipe } from '@angular/common';
import { ArrayType } from '@angular/compiler';
//import { THIS_EXPR } from '@angular/compiler/src/output/output_ast'; // manpreet
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { DealerServiceService } from '../services/dealer-service.service';
import { MapService } from '../services/map.service';
import { TmServiceService } from '../services/tm-service.service';

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
  ID: number = 0;
  ORDER_NO: string = '';
  ORDER_NUMBER: string = '';
  CLAIM_SETTLED_DATE?: any;
  DAYS_LEFT_FOR_RECLAIMING: string = '';
  PART_NUMBER: string = '';
  PART_DESCRIPTION: string = '';
  FRAME_NUMBER: string = '';
  KMS: string = '';
  SALES_DATE?: any;
  REPAIR_DATE?: any;
  MODEL: string = '';
  NDP_RATE: string = '';
  DEALER_CODE: string = '';
  DEALER_NAME: string = '';
  REASON_FOR_REJECTION: string = '';
  JUSTIFICATION: string = '';
  CITY: string = '';
  vSTATUS: string = '';
  CREATED_ON?: any;
  FILENAME: string = '';
  PENDING_WITH: string = '';
  TM: string = '';
  TM_REMARKS: string = '';
  AM: string = '';
  AM_REMARKS: string = '';
  CREDITED_DATE: string = '';
}

export class SaveorderApproval {
  ID: number = 0;
  EMPNO: string = '';
  REMARKS: string = '';
  STATUS: string = '';
  GETDATA: number = 0;
}

export class QuerydetailsDO {
  ID: number = 0;
  REQ_ID: number = 0;
  ROLE: string = '';
  FROM_EMPNO: string = '';
  FROM_EMPNAME: string = '';
  TO_EMPNO: string = '';
  TO_EMPNAME: string = '';
  REMARKS: string = '';
  CREATED_ON: any;
  STATUS:string = '';
  GETDATA:number = 0;
  empno:string = '';
  role:string = '';
}

@Component({
  standalone: true,
  selector: 'app-dealer-query',
  templateUrl: './dealer-query.component.html',
  styleUrls: ['./dealer-query.component.css'],
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
export class DealerQueryComponent implements OnInit {
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
  public OrderDetails:any=new OrderDetailsDO();
  public Query=new QuerydetailsDO();
  public approval=new SaveorderApproval();
  errorMap: any;
  public from_empname:string = '';
  from_empno: string = '';
  public fromdate: string = '';
  //public todate: string;

  constructor(private dealerService: DealerServiceService, private datePipe: DatePipe, 
    private tmService: TmServiceService, private commonService: CommonService) { }

  ngOnInit() {
    // this.role="Dealer";
    // this.empno='50077';
  
  }
  // ngAfterViewInit()
  //   {
  //     this.empno = localStorage.getItem("empno");
  //     this.role=localStorage.getItem("role");
  //     this.fetchQueryDetails();
  //   }
  search()
  {
    console.log("dealer Query");
    this.empno = localStorage.getItem("empno") || '';
    this.role = localStorage.getItem("role") || '';
    this.fetchQueryDetails();
  }
  fetchQueryDetails()
  {
    let getdata: any;
      console.log("this.role",this.role);
      if (this.role == "dealer") {
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
      this.commonService.getPendingOrderApproval('status=' + this.status + "&&empno=" + this.empno + "&&getdata="+getdata+"&&role="+ localStorage.getItem('role')). 
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

  // searchOrderDetails() {
  //   this.searchFilter['FROM_DATE'] = this.fromddate;
  //   this.searchFilter['TO_DATE'] = this.todate;
  //   this.searchFilter['DEALER_CODE'] = this.searchdealercode;
  //   this.searchFilter['ORDER_NUMBER'] = this.searchorderno;
  //   this.dealerService.fetchOrderDetailsSearch(this.searchFilter).subscribe((data)=>{
  //     this.orderDetails = data['response']['recordset'];
  //   });
  // }

  // fetchReqDetails(id) {
  //   this.displayDetailSec = true;
  //   console.log(id);
  //   console.log("Inside fetchReqDetails()")
  //   this.selectedId['reqNo'] = id;
  //   this.tmService.escalationDetails(id).subscribe((data) => {
  //     if(data['response']['recordset'].length > 0) {
  //       this.escalationList = data['response']['recordset'];
  //       console.log(this.escalationList);
  //     }
  //   });
  //   this.dealerService.fileDetails(id).subscribe((data) => {
  //     if(data['response']['recordset'].length > 0) {
  //       this.fileList = data['response']['recordset'];
  //       console.log(this.fileList);
  //     }
  //   });
  //   this.dealerService.dealerQueryToList(id).subscribe((data) => {
  //     if(data['response']['recordset'].length > 0) {
  //       this.dealerQueryToList = data['response']['recordset'];
  //       console.log(this.dealerQueryToList);
  //     }
  //   });
  //   this.tmService.fetchOrderDetailsId(this.selectedId).subscribe((data)=> {
  //     console.log(data['response']['recordset']);
  //     this.claimsettleddate = this.datePipe.transform(data['response']['recordset'][0]['CLAIM_SETTLED_DATE'], 'yyyy-MM-dd');
  //     this.daysleft = data['response']['recordset'][0]['DAYS_LEFT_FOR_RECLAIMING']
  //     this.partno = data['response']['recordset'][0]['PART_NUMBER']
  //     this.partdesc = data['response']['recordset'][0]['PART_DESCRIPTION']
  //     this.frameno = data['response']['recordset'][0]['FRAME_NUMBER']
  //     this.kms = data['response']['recordset'][0]['KMS']
  //     this.salesdate = this.datePipe.transform(data['response']['recordset'][0]['SALES_DATE'], 'yyyy-MM-dd');
  //     this.repairdate = this.datePipe.transform(data['response']['recordset'][0]['REPAIR_DATE'], 'yyyy-MM-dd');
  //     this.model = data['response']['recordset'][0]['MODEL']
  //     this.ndprate = data['response']['recordset'][0]['NDP_RATE']
  //     this.dealercode = data['response']['recordset'][0]['DEALER_CODE']
  //     this.dealername = data['response']['recordset'][0]['DEALER_NAME']
  //     this.reasonforrejection = data['response']['recordset'][0]['REASON_FOR_REJECTION']
  //     this.justification = data['response']['recordset'][0]['JUSTIFICATION']
  //     this.city = data['response']['recordset'][0]['CITY']
  //   });
  // }

  // sendQuery() {
  //   this.popup = true;
  //   this.dealerSendQueryFilterData['REQ_ID'] = this.selectedId['reqNo'];
  //   this.dealerSendQueryFilterData['ROLE'] = 'Dealer';
  //   this.dealerSendQueryFilterData['FROM_EMPNO'] = this.dealercode;
  //   this.dealerSendQueryFilterData['FROM_EMPNAME'] = this.dealername;
  //   this.dealerSendQueryFilterData['TO_EMPNO'] = this.dealerQuerySelected;
  //   this.dealerSendQueryFilterData['TO_EMPNAME'] = this.dealerQueryToName;
  //   this.dealerSendQueryFilterData['REMARKS'] = this.dealerQuery;
  //   console.log(this.dealerSendQueryFilterData);
  //   this.tmService.sendQuery(this.dealerSendQueryFilterData).subscribe((data)=> {
  //     console.log(data);
  //   });
  // }
  getRequestByDetails(item: { ID: string | number; FROM_EMPNAME: string; })
  {
    console.log("item",item.ID);
    this.commonService.getOrderDetailsById('Reqno='+item.ID+"&&empno="+this.empno+"&&role="+this.role).
      subscribe((resp: any) => {
        if (resp && resp.statusCode == 200) {
          this.approval.ID = typeof item.ID === 'number' ? item.ID : parseInt(item.ID, 10);
          if(resp.data!="")
          {
            this.from_empname=item.FROM_EMPNAME;
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

  reply()
  {
    if(this.role === 'Dealer') {
      this.Query.STATUS = 'C';

    }
    else if(this.role === 'TM') {
      this.Query.STATUS = 'TA';
     
    }
    else  if(this.role === 'AM'){
      this.Query.STATUS = 'AA';
      
      
    }
   // this.Query.TO_EMPNO=this.empno;
   this.Query.TO_EMPNO=this.from_empno;
   
    this.Query.ROLE=this.role;
    //this.Query.TO_EMPNAME=" ";
    this.Query.TO_EMPNAME=this.from_empname;
    // this.Query.FROM_EMPNO=this.from_empno;
    // this.Query.FROM_EMPNAME=this.from_empname;
    this.Query.FROM_EMPNO=this.empno;
    this.Query.FROM_EMPNAME="";
    this.Query.GETDATA=1;
    this.Query.REQ_ID=this.approval.ID;

    console.log("this.query",this.Query);
    
    if(this.validateQuery(0)) 
    this.Query.empno = localStorage.getItem('empno') || '';
   this.Query.role = localStorage.getItem('role') || '';
    this.commonService.saveQueryProcess(this.Query).subscribe((resp: any) => {
      if (resp && resp.statusCode == 200) {
       //  this.superpending = resp.data;
       this.fetchQueryDetails();
       this.displayDetailSec = false;
       this.commonService.error("Reply has been raised successfully.");
       
      }
    });
  }
  validateQuery(validateCode: number) {
    debugger;
    if (validateCode == 0) {
      this.errorMap = new MapService();
    }
    if (validateCode == 0 || validateCode == 1) {
      if (this.Query.REMARKS == null || this.Query.REMARKS == undefined||this.Query.REMARKS == "") {
        this.errorMap.put("query", '');

        this.commonService.error("Please enter the Query");

      }
      else {
        this.errorMap.remove("query");
       
      }
    }
    if (this.errorMap.isEmpty()) {
      return true;
    } else {
      return false;
    }

  }

}
