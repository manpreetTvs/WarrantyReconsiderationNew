import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { MapService } from '../../services/map.service';
import { TmServiceService } from '../../services/tm-service.service';

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



export class SuperQueryDO {
  ID!: number;
  SUPER_ID!: number;
  ROLE!: string;
  FROM_EMPNO!: string;
  FROM_EMPNAME!: string;
  TO_EMPNO!: string;
  TO_EMPNAME!: string;
  REMARKS!: string;
  CREATED_ON!: Date | string;
  STATUS!: string;
  GETDATA!: number;
}
export class SuperApprovalDO {
  ID!: number;
  DEALER_CODE!: string;
  DEALER_NAME!: string;
  TOWN!: string;
  ORDER_NO!: string;
  CLAIM_SETTLED_DATE!: string;
  TOTAL_PARTS!: string;
  REQUEST_LETTER_DEA_TM_ASM!: string;
  REQUEST_LETTER_ASM_VP!: string;
  ASM!: string;
  ASM_REMARKS!: string;
  NSM!: string;
  NSM_REMARKS!: string;
  GMS!: string;
  GMS_REMARKS!: string;
  HO_REMARKS!: string;
  STATUS!: string;
  CREATED_ON!: any;
  ASM_APP_DATE!: any;
  NSM_APP_DATE!: any;
  GMS_APP_DATE!: any;
  HO_APP_DATE!: any;
  HO!: string;
  superQuery!: SuperQueryDO[];
  FROM_DATE!: any;
  TO_DATE!: any;
}


@Component({
  standalone: true,
  selector: 'app-super-report',
  templateUrl: './super-report.component.html',
  styleUrls: ['./super-report.component.css'],
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
export class SuperReportComponent implements OnInit {
  public query: string = '';
  public querySelected: string = '';
  public amQueryToList: any = [];
  public escalationList: any = [];
  public superReportFilter: any = {};
  public superReportData: any = [];
  public superQuery = new SuperQueryDO();
  public approval = new SuperApprovalDO();
  public empno: string = '';
  public role: string = '';
  public status: string = '';
  public stage: string = '';
  public fromdate: any;
  public todate: any;
  public errorMap: MapService = new MapService();

  constructor(private tmService: TmServiceService,private commonService:CommonService) { }

  ngOnInit() {
  //  this.empno="12848";
  //  this.role="GMS";
  this.empno = localStorage.getItem("empno")!;
  this.role = localStorage.getItem("role")!;

    // this.superReportFilter['ROLE'] = sessionStorage.getItem('role');
    // this.superReportFilter['EMPNO'] = sessionStorage.getItem('empno');
    // this.superReportFilter['TYPE'] = 'R';
    // console.log(this.superReportFilter);
    // this.tmService.fetchSuperReport(this.superReportFilter).subscribe((data) => {
    //   this.superReportData = data['response']['recordset'];
    //   console.log(this.superReportData);
    // });

   
  }
  ngAfterViewInit(){
  this.empno = localStorage.getItem("empno")!;
  this.role = localStorage.getItem("role")!;
  // this.empno="12848";
  // this.role="TM";
  }
  selectedQueryTo(event: any) {

  }

  sendQuery() {

  }
  Search()
  {
    if(this.validateSearch(0))
    {
      this.getReportDetails();
    }
    
  }

  fetchReqDetails(id: any) {
    console.log(id);
    this.tmService.fetchSuperQueryDetails(id).subscribe((data: any) => {
      if(data['response']['recordset'].length > 0) {
        this.escalationList = data['response']['recordset'];
        console.log(this.escalationList);
      }
    });
  }
  getRequestByDetails(item: any)
  {
    this.commonService.getSuperDetailsById('Reqno='+item.ID+"&&empno="+this.empno+"&&role="+this.role).
      subscribe((resp: any) => {
        if (resp && resp.statusCode == 200) {
          //this.from_empname=item.FROM_EMPNAME;
          //this.from_empno=item.FROM_EMPNO;
          // this.superQuery.FROM_EMPNAME=item.FROM_EMPNAME;
          // this.superQuery.FROM_EMPNO=item.FROM_EMPNO;
          
         // this.superQueryData.ID=item.ID;
          if(resp.data!="")
          {
           //this.displayDetailSec = true;
            this.approval=resp.data;
            console.log("this.approval",this.approval);
            this.escalationList = resp.data.superQuery;
          }
          
          
         // this.getNextlevelMapping();
          //this.getQueryToList(item.ID);
        }
      });
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

  getReportDetails()
  {
    console.log("this.role",this.role);
    if(this.stage=="Pending")
    {
      if (this.role == "NSM") {
   
        this.status="C";
      }
      else if (this.role == "GMS") {
      
        this.status="NSMA";
      }
      else if (this.role == "HO") {
    
        this.status="GMSA";
      }
      else if(this.role=="ASM")
      {
        this.status="C";
      }
    }
    else if(this.stage=="Completed"){
      this.stage="HOA";
    }
    else{
      this.stage="";
    }
    this.stage="";
    if(this.role=="NSM")
    {
      
      this.commonService.getSuperOrderDetails('status=' +this.stage+"&&from_date="+this.fromdate+"&&to_date="+this.todate+"&&asm=&&nsm="+this.empno+"&&gms=&&ho=&&empno="+this.empno+"&&role="+this.role).
      subscribe((resp: any) => {
        if (resp && resp.statusCode == 200) {
          this.superReportData=resp.data;
        }
       });
    }
   
     else if(this.role=="AM")
      {
        this.commonService.getSuperOrderDetails('status=' +this.stage+"&&from_date="+this.fromdate+"&&to_date="+this.todate+"&&asm="+this.empno+"&&nsm=&&gms=&&ho=&&empno="+this.empno+"&&role="+this.role).
        subscribe((resp: any) => {
          if (resp && resp.statusCode == 200) {
            this.superReportData=resp.data;
          }
         });
      }
      else if(this.role=="GMS")
      {
        this.commonService.getSuperOrderDetails('status=' +this.stage+"&&from_date="+this.fromdate+"&&to_date="+this.todate+"&&asm=&&nsm=&&gms="+this.empno+"&&ho=&&empno="+this.empno+"&&role="+this.role).
        subscribe((resp: any) => {
          if (resp && resp.statusCode == 200) {
            this.superReportData=resp.data;
          }
         });
      }
      else if(this.role=="HO")
      {
        this.commonService.getSuperOrderDetails('status=' +this.stage+"&&from_date="+this.fromdate+"&&to_date="+this.todate+"&&asm=&&nsm=&&gms=&&ho="+this.empno+"&&empno="+this.empno+"&&role="+this.role).
        subscribe((resp: any) => {
          if (resp && resp.statusCode == 200) {
            this.superReportData=resp.data;
          }
         });
      }
    }
  }
 


