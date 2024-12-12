//import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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


export class SaveorderApproval {
  ID!: number;
  EMPNO!: string;
  REMARKS!: string;
  STATUS!: string;
  GETDATA!: number;
}


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
  empno!: string;
  role!: string;
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
  selector: 'app-super-pending-query',
  templateUrl: './super-pending-query.component.html',
  styleUrls: ['./super-pending-query.component.scss'],
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
export class SuperPendingQueryComponent implements OnInit {
  public query: string = '';
  public querySelected: string = '';
  public escalationList: any = [];
  public superQueryFilter: any = {};
  public superQueryData: any = [];
  public QueryToList: any = [];
  public displayDetailSec: boolean = false;
  public queryToName: string = '';
  public queryToNo: string = '';
  public popup: boolean = false;
  public sendQueryFilterData: any = {};
  public reqNo: string = '';
  public empname: string = '';
  public queryToRole: string = '';
  public role: string = '';
  public empno: string = '';
  public status:string = '';
  public superapproval=new SaveorderApproval();
  public superQuery=new SuperQueryDO();
  public approval=new SuperApprovalDO();
  public errorMap: any;
  public from_empname:string = '';
  public from_empno:string = '';
  public fromdate: string = '';
  public todate: string = '';
  constructor(private tmService: TmServiceService,private commonService:CommonService) { }

  ngOnInit() {
    // this.role="NSM";
    // this.empno="8498";

    this.empno = localStorage.getItem("empno") || '';
    this.role = localStorage.getItem("role") || '';
  //   this.empno="12280";
  //  this.role="TM";
this.fetchQueryDetails();


    // this.superQueryFilter['ROLE'] = sessionStorage.getItem('role');
    // this.superQueryFilter['EMPNO'] = sessionStorage.getItem('empno');
    // this.empname = sessionStorage.getItem('empname');
    // this.superQueryFilter['TYPE'] = 'Q';
    // console.log(this.superQueryFilter);
    // this.tmService.fetchSuperReport(this.superQueryFilter).subscribe((data) => {
    //   this.superQueryData = data['response']['recordset'];
    //   console.log(this.superQueryData);
    // });
  }
  ngAfterViewInit(){
    console.log("dfgfdg");
    this.empno = localStorage.getItem("empno")!;
    this.role = localStorage.getItem("role")!;
  //   this.empno="12280";
  //  this.role="TM";
     this.fetchQueryDetails();
  }
  search()
  {
    console.log("dfgfdg");
    this.empno = localStorage.getItem("empno")!;
   this.role = localStorage.getItem("role")!;
  //  this.empno="12280";
  //  this.role="TM";

     this.fetchQueryDetails();
  }
fetchQueryDetails()
{
  let getdata: any;
    console.log("this.role",this.role);
    if (this.role == "ASM") {
      getdata = 5;
      this.status="Q";
    }
    else if (this.role == "NSM") {
      getdata = 4;
      this.status="Q";
    }
    else if (this.role == "GMS") {
      getdata = 6;
      this.status="Q";
    }
    this.commonService.getPendingSuperApproval('status=' + this.status + "&&empno=" + this.empno + "&&getdata="+getdata+"&&role="+this.role).
      subscribe((resp: any) => {
        if (resp && resp.statusCode == 200) {
          this.superQueryData = resp.data;
        
         
        }
      });
}


  selectedQueryTo(event: any) {
    this.queryToName = event.target.options[event.target.options.selectedIndex].text;
    this.queryToNo = event.target.value;
  }

  sendQuery() {
    this.popup = true;
    this.displayDetailSec = false;
    this.sendQueryFilterData['REQ_ID'] = this.reqNo;
    this.sendQueryFilterData['ROLE'] = this.superQueryFilter['ROLE'];
    if(this.superQueryFilter['ROLE'] === 'HO') {
      this.sendQueryFilterData['FROM_EMPNO'] = 'HO';
      this.sendQueryFilterData['FROM_EMPNAME'] = 'HO';
    }
    else {
      this.sendQueryFilterData['FROM_EMPNO'] = this.superQueryFilter['EMPNO'];
      this.sendQueryFilterData['FROM_EMPNAME'] = this.empname;
    }
    this.sendQueryFilterData['TO_EMPNO'] = this.querySelected;
    this.sendQueryFilterData['TO_EMPNAME'] = this.queryToName;
    this.sendQueryFilterData['REMARKS'] = this.query;
    this.sendQueryFilterData['TYPE'] = 'REPLY';
    if(this.queryToRole === 'NSM') {
      this.sendQueryFilterData['STATUS'] = 'AA';
    }
    else if(this.queryToRole === 'GMS') {
      this.sendQueryFilterData['STATUS'] = 'NSMA';
    }
    else if(this.queryToRole === 'HO') {
      this.sendQueryFilterData['STATUS'] = 'GMSA';
    }
    console.log("hey there?")
    console.log(this.sendQueryFilterData);
    this.tmService.superSendQuery(this.sendQueryFilterData).subscribe((data)=> {
      console.log(this.superQueryFilter);
      this.tmService.fetchSuperReport(this.superQueryFilter).subscribe((data: any) => {
        this.superQueryData = data.response.recordset;
        console.log(this.superQueryData);
      });
    });
  }
  getRequestByDetails(item: any)
  {
    this.commonService.getSuperDetailsById('Reqno='+item.ID+"&&empno="+this.empno+"&&role="+this.role).
      subscribe((resp: any) => {
        if (resp && resp.statusCode == 200) {
          this.from_empname=item.FROM_EMPNAME;
          this.from_empno=item.FROM_EMPNO;
          // this.superQuery.FROM_EMPNAME=item.FROM_EMPNAME;
          // this.superQuery.FROM_EMPNO=item.FROM_EMPNO;
          
          this.superQueryData.ID=item.ID;
          if(resp.data!="")
          {
           
            this.approval=resp.data;
            console.log("this.approval",this.approval);
            this.escalationList = resp.data.superQuery;
          }
          
          this.displayDetailSec = true;
         // this.getNextlevelMapping();
          //this.getQueryToList(item.ID);
        }
      });
  }
  fetchReqDetails(id: any) {
    this.displayDetailSec = true;
    this.reqNo = id;
    console.log(id);
    this.tmService.superQueryReplyToList(id).subscribe((data: any) => {
      if(data['response']['recordset'].length > 0) {
        this.QueryToList = data['response']['recordset'];
        this.queryToRole = this.QueryToList[0]['ROLE'];
        console.log(this.QueryToList);
      }
    });
    this.tmService.fetchSuperQueryDetails(id).subscribe((data: any) => {
      if(data['response']['recordset'].length > 0) {
        this.escalationList = data['response']['recordset'];
        console.log(this.escalationList);
      }
    });
  }
  reply()
  {
    if(this.role === 'NSM') {
      this.superQuery.STATUS = 'NSMA';

    }
    else if(this.role === 'GMS') {
      this.superQuery.STATUS = 'GMSA';
     
    }
    else  if(this.role === 'HO'){
      this.superQuery.STATUS = 'HOA';
      
      
    }
    this.superQuery.TO_EMPNO=this.empno;
    this.superQuery.ROLE=this.role;
    this.superQuery.TO_EMPNAME=" ";
    this.superQuery.FROM_EMPNO=this.from_empno;
    this.superQuery.FROM_EMPNAME=this.from_empname;
    this.superQuery.GETDATA=2;
    this.superQuery.SUPER_ID=this.superQueryData.ID;
    
    if(this.validateQuery(0)) 
    this.superQuery.empno=this.empno;
    this.superQuery.role=this.role;
    this.commonService.saveSuperQueryProcess(this.superQuery).subscribe((resp: any) => {
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
      if (this.superQuery.REMARKS == null || this.superQuery.REMARKS == undefined||this.superQuery.REMARKS == "") {
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
