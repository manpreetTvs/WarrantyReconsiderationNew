//import { ThrowStmt } from '@angular/compiler';
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
  ID: number = 0;
  EMPNO: string = '';
  REMARKS: string = '';
  STATUS: string = '';
  GETDATA: number = 0;
  empno: string = '';
  role: string = '';
}


export class SuperQueryDO {
  ID: number = 0;
  SUPER_ID: number = 0;
  ROLE: string = '';
  FROM_EMPNO: string = '';
  FROM_EMPNAME: string = '';
  TO_EMPNO: string = '';
  TO_EMPNAME: string = '';
  REMARKS: string = '';
  CREATED_ON: Date | string = '';
  STATUS: string = '';
  GETDATA: number = 0;
  empno: string = '';
  role: string = '';
}

export class SuperApprovalDO {
  ID: number = 0;
  DEALER_CODE: string = '';
  DEALER_NAME: string = '';
  TOWN: string = '';
  ORDER_NO: string = '';
  CLAIM_SETTLED_DATE: string = '';
  TOTAL_PARTS: string = '';
  REQUEST_LETTER_DEA_TM_ASM: string = '';
  REQUEST_LETTER_ASM_VP: string = '';
  ASM: string = '';
  ASM_REMARKS: string = '';
  NSM: string = '';
  NSM_REMARKS: string = '';
  GMS: string = '';
  GMS_REMARKS: string = '';
  HO_REMARKS: string = '';
  STATUS: string = '';
  CREATED_ON: any = '';
  ASM_APP_DATE: any = '';
  NSM_APP_DATE: any = '';
  GMS_APP_DATE: any = '';
  HO_APP_DATE: any = '';
  HO: string = '';
  superQuery: SuperQueryDO[] = [];
  FROM_DATE: any = '';
  TO_DATE: any = '';
}
@Component({
  standalone: true,
  selector: 'app-super-pending-approval',
  templateUrl: './super-pending-approval.component.html',
  styleUrls: ['./super-pending-approval.component.scss'],
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
export class SuperPendingApprovalComponent implements OnInit {
  public remarks: string = '';
  public gmsSelected: string = '';
  public gmsList: any = [];
  public query: string = '';
  public querySelected: string = '';
  public escalationList: string = '';
  public role: string = '';
  public superPendingListData: any = {};
  public empno: string = '';
  public empname: string = '';
  public superpending: any = [];
  public displayDetailSec: boolean = false;
  public dealerCode: string = '';
  public superApproveData: any = {};
  public id: string = '';
  public asmname: string = '';
  public superNsmQueryToList: any = [];
  public popup: boolean = false;
  public sendQueryFilterData: any = {};
  public queryToName: string = '';
  public nsmname: string = '';
  public status: string = '';
  public superapproval = new SaveorderApproval();
  public superQuery = new SuperQueryDO();
  public approval = new SuperApprovalDO();
  public errorMap: any;
  public isforward: boolean = false;
  public fromdate: string = '';
  public todate: string = '';

  constructor(private tmService: TmServiceService,private commonservice:CommonService) { }

  ngOnInit() {
   // this.role = sessionStorage.getItem('role');
    // this.role="GMS";
    // this.empno="12848";

    this.empno = localStorage.getItem("empno")!;
    this.role = localStorage.getItem("role")!;

    if(this.role=="HO")
    {
      this.isforward=false;
    }
    else{
      this.isforward=true;
    }
    console.log("this.role",this.role);
   // this.empno = sessionStorage.getItem('empno');
    //this.empname = sessionStorage.getItem('empname');

    this.superPendingListData['ROLE'] = this.role;
    this.superPendingListData['EmpNo'] = this.empno;


    if(this.role === 'NSM') {
      this.superPendingListData['Status'] = 'C';
    }
    else if(this.role === 'GMS') {
      this.superPendingListData['Status'] = 'NSMA';
    }
    else {
      this.superPendingListData['Status'] = 'GMSA';
    }
    // this.tmService.fetchGmsList().subscribe((data)=> {
    //   this.gmsList = data['response']['recordset'];
    //   console.log(this.gmsList);
    // });

    this.getPendingList();
   // this.commonservice.getSuperOrderDetails()
      // if(this.role !== 'AM') {
    //   this.tmService.fetchSuperPendingList(this.superPendingListData).subscribe((data)=> {
    //     this.superpending = data['response']['recordset'];
    //     console.log(this.superpending);
    //   });
    // }
  }
  // ngAfterViewInit(){
  //   this.empno = localStorage.getItem("empno");
  //   this.role=localStorage.getItem("role");

  //   if(this.role=="HO")
  //   {
  //     this.isforward=false;
  //   }
  //   else{
  //     this.isforward=true;
  //   }
  //   console.log("this.role",this.role);
  //   this.getPendingList();
  // }

  search()
  {
      this.empno = localStorage.getItem("empno")!;
    this.role = localStorage.getItem("role")!;
  //   this.empno="12280";
  //  this.role="TM";

    if(this.role=="HO")
    {
      this.isforward=false;
    }
    else{
      this.isforward=true;
    }
    console.log("this.role",this.role);
    this.getPendingList();
  }
  getPendingList() {
    let getdata: any;
    console.log("this.role",this.role);
    if (this.role == "NSM") {
      getdata = 1;
      this.status="C";
    }
    else if (this.role == "GMS") {
      getdata = 2;
      this.status="NSMA";
    }
    else if (this.role == "HO") {
      getdata = 3;
      this.status="GMSA";
    }
    this.commonservice.getPendingSuperApproval('status=' + this.status + "&&empno=" + this.empno + "&&getdata="+getdata+"&&role="+this.role).
      subscribe((resp: any) => {
        if (resp && resp.statusCode == 200) {
          this.superpending = resp.data;
        
         
        }
      });
    //   if(this.role=="NSM")
    //   {
    //     this.commonservice.getSuperOrderDetails('status=' +this.status+"&&from_date=&&to_date=&&asm=&&nsm="+this.empno+"&&gms=&&ho=").
    //     subscribe((resp: any) => {
    //       if (resp && resp.statusCode == 200) {
    //         this.superpending=resp.data;
    //       }
    //      });
    //   }
    //   else if(this.role=="GMS")
    //   {
    //     this.commonservice.getSuperOrderDetails('status=' +this.status+"&&from_date=&&to_date=&&asm=&&nsm=&&gms="+this.empno+"&&ho=").
    //     subscribe((resp: any) => {
    //       if (resp && resp.statusCode == 200) {
    //         this.superpending=resp.data;
    //       }
    //      });
    //   }
    //   else if(this.role=="HO")
    //   {
    //     this.commonservice.getSuperOrderDetails('status=' +this.status+"&&from_date=&&to_date=&&asm=&&nsm=&&gms=&&ho="+this.empno).
    //     subscribe((resp: any) => {
    //       if (resp && resp.statusCode == 200) {
    //         this.superpending=resp.data;
    //       }
    //      });
    //   }

  }
  getNextlevelMapping()
{
  debugger;
  let stage:any;
  if(this.role=="NSM")
  {
     stage="GMS";
  }
  else if(this.role=="GMS")
  {
    stage="HO";
  }
  console.log("stage",stage);
  this.commonservice.getHOMapping('empno=&&catg='+stage+"&&getdata=1" ).
  subscribe((resp: any) => {
    if (resp && resp.statusCode == 200) {
      console.log("this.gmslist",resp.data);
    this.gmsList=resp.data;
   
    }
  });
}

getQueryToList(reqno: any)
{
  this.commonservice.getSuperQueryToList('reqno='+reqno+"&&empno="+this.empno+"&&role="+this.role ).
  subscribe((resp: any) => {
    if (resp && resp.statusCode == 200) {
      console.log("this.gmslist",resp.data);
    this.superNsmQueryToList=resp.data;
   
    }
  });
}
  selectGms(event: any) {
    this.gmsSelected = event.target.value;
  }
  getRequestByDetails(item: any)
  {
    this.commonservice.getSuperDetailsById('Reqno='+item.ID+"&&empno="+this.empno+"&&role="+this.role).
      subscribe((resp: any) => {
        if (resp && resp.statusCode == 200) {
          this.superapproval.ID=item.ID;
          if(resp.data!="")
          {
           
            this.approval=resp.data;
            console.log("this.approval",this.approval);
            this.escalationList = resp.data.superQuery;
          }
          
          this.displayDetailSec = true;
          this.getNextlevelMapping();
          this.getQueryToList(item.ID);
        }
      });
  }

approve()
{
  if(this.role === 'NSM') {
    this.superapproval.STATUS = 'NSMA';
    this.superapproval.GETDATA=1;
  }
  else if(this.role === 'GMS') {
    this.superapproval.STATUS = 'GMSA';
    this.superapproval.GETDATA=2;
  }
  else  if(this.role === 'HO'){
    this.superapproval.STATUS = 'HOA';
    this.superapproval.GETDATA=3;
  }
  
  console.log("approve",this.superapproval);
 if(this.validateApprove(0)) 
 this.superapproval.empno=this.empno;
 this.superapproval.role=this.role;
  this.commonservice.saveSuperAppProcess(this.superapproval).subscribe((resp: any) => {
    if (resp && resp.statusCode == 200) {
     //  this.superpending = resp.data;
     this.getPendingList();
     this.displayDetailSec = false;
     this.commonservice.error("Request successfully Approved.");
     
    }
  });
}
saveQuery()
{
  this.superQuery.SUPER_ID=this.superapproval.ID;
  this.superQuery.ROLE=this.role;
  this.superQuery.FROM_EMPNO=this.empno;
  this.superQuery.STATUS='Q';
  this.superQuery.GETDATA=1;
  //this.superQuery.FROM_EMPNAME=localStorage.getItem("empname") || '';
  this.superQuery.FROM_EMPNAME = "Manpreet";
 // this.superQuery.FROM_EMPNAME="";
  console.log("this.superQuery",this.superQuery);
  if(this.validateQuery(0)) 
  this.superQuery.empno=this.empno;
  this.superQuery.role=this.role;
  this.commonservice.saveSuperQueryProcess(this.superQuery).subscribe((resp: any) => {
    if (resp && resp.statusCode == 200) {
     //  this.superpending = resp.data;
     this.getPendingList();
     this.displayDetailSec = false;
     this.commonservice.error("Query has been raised successfully.");
     
    }
  });

}
  approveRequest() {
    this.popup = true;
    this.displayDetailSec = false;
    if(this.role === 'NSM') {
      this.superApproveData['GMS'] = this.gmsSelected;
    }
    this.superApproveData['ROLE'] = this.role;
    this.superApproveData['ID'] = this.id;
    this.superApproveData['REMARKS'] = this.remarks;
    this.tmService.superApproveRequest(this.superApproveData).subscribe((data)=> {
      console.log(data);
      this.tmService.fetchSuperPendingList(this.superPendingListData).subscribe((data: any)=> {
        this.superpending = data['response']['recordset'];
        console.log(this.superpending);
      });
    });
  }



  selectedQueryTo(event: any) {
    console.log("event",event);
    this.queryToName = event.target.options[event.target.options.selectedIndex].text;
    this.superQuery.TO_EMPNAME=this.queryToName;
    this.querySelected = event.target.value;
  }

  sendQuery() {
    this.popup = true;
    this.displayDetailSec = false;
    this.sendQueryFilterData['REQ_ID'] = this.id;
    this.sendQueryFilterData['ROLE'] = this.role;
    if(this.role === 'HO') {
      this.sendQueryFilterData['FROM_EMPNO'] = 'HO';
      this.sendQueryFilterData['FROM_EMPNAME'] = 'HO';
    }
    else {
      this.sendQueryFilterData['FROM_EMPNO'] = this.empno;
      this.sendQueryFilterData['FROM_EMPNAME'] = this.empname;
    }
    this.sendQueryFilterData['TO_EMPNO'] = this.querySelected;
    this.sendQueryFilterData['TO_EMPNAME'] = this.queryToName;
    this.sendQueryFilterData['REMARKS'] = this.query
    console.log(this.sendQueryFilterData);
    this.tmService.superSendQuery(this.sendQueryFilterData).subscribe((data)=> {
      // console.log(data);
      this.tmService.fetchSuperPendingList(this.superPendingListData).subscribe((data: any)=> {
        this.superpending = data['response']['recordset'];
        console.log(this.superpending);
      });
    });
  }


 
  fetchReqDetails(item: any) {
    this.superNsmQueryToList = [];
    this.displayDetailSec = true;
    this.dealerCode = item['DEALER_CODE'];
    this.id = item['ID'];
    this.tmService.fetchSuperQueryDetails(item['ID']).subscribe((data: any) => {
      if(data['response']['recordset'].length > 0) {
        this.escalationList = data['response']['recordset'];
        console.log(this.escalationList);
      }
    });
    this.tmService.fetchEmpDetails(item['ASM']).subscribe((data: any)=> {
      this.asmname = data['response']['recordset'][0]['empname'];
      this.superNsmQueryToList.push({no: item['ASM'], name: this.asmname})
      if(this.role === 'GMS' || this.role === 'HO') {
        this.tmService.fetchEmpDetails(item['NSM']).subscribe((data: any) => {
          this.nsmname = data['response']['recordset'][0]['empname'];
          this.superNsmQueryToList.push({no: item['NSM'], name: this.nsmname})
        })
      }
      console.log(this.superNsmQueryToList);
    });
  }
  
  validateApprove(validateCode: number) {
    debugger;
    if (validateCode == 0) {
      this.errorMap = new MapService();
    }
    if (validateCode == 0 || validateCode == 1) {
      if (this.superapproval.REMARKS == null || this.superapproval.REMARKS == undefined||this.superapproval.REMARKS == "") {
        this.errorMap.put("remarks", '');

        this.commonservice.error("Please enter the remarks");

      }
      else {
        this.errorMap.remove("remarks");
        if(this.role!="HO")
        {
        if (this.superapproval.EMPNO == "" || this.superapproval.EMPNO == null || this.superapproval.EMPNO == undefined) {
          this.errorMap.put("queryto", '');
          this.commonservice.error("Please select the next approval person");
        }
        else {
          this.errorMap.remove("queryto");
        
        }
      }
    }
    }
    if (this.errorMap.isEmpty()) {
      return true;
    } else {
      return false;
    }

  }

  validateQuery(validateCode: number) {
    debugger;
    if (validateCode == 0) {
      this.errorMap = new MapService();
    }
    if (validateCode == 0 || validateCode == 1) {
      if (this.superQuery.REMARKS == null || this.superQuery.REMARKS == undefined||this.superQuery.REMARKS == "") {
        this.errorMap.put("query", '');

        this.commonservice.error("Please enter the Query");

      }
      else {
        this.errorMap.remove("query");
       
        if (this.superQuery.TO_EMPNO == "" || this.superQuery.TO_EMPNO == null || this.superQuery.TO_EMPNO == undefined) {
          this.errorMap.put("querytolist", '');
          this.commonservice.error("Please select the Query To Person");
        }
        else {
          this.errorMap.remove("querytolist");
        
        }
      
      }
    }
    if (this.errorMap.isEmpty()) {
      return true;
    } else {
      return false;
    }

  }
}
