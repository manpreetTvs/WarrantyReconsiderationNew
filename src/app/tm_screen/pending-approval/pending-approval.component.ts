import { DatePipe } from '@angular/common';
import { ArrayType } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { DealerServiceService } from '../../services/dealer-service.service';
import { EmailTriggerService } from '../../services/email-trigger.service';
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
  PENDING_WITH!: string;
  TM!: string;
  TM_REMARKS!: string;
  AM!: string;
  AM_REMARKS!: string;
  CREDITED_DATE!: string;
}

export class SaveorderApproval {
  ID!: number;
  EMPNO!: string;
  REMARKS!: string;
  STATUS!: string;
  GETDATA!: number;
  empno!: string;
  role!: string;
}

export class QuerydetailsDO {
  ID!: number;
  REQ_ID!: number;
  ROLE!: string;
  FROM_EMPNO!: string;
  FROM_EMPNAME!: string;
  TO_EMPNO!: string;
  TO_EMPNAME!: string;
  REMARKS!: string;
  CREATED_ON: any;
  STATUS!: string;
  GETDATA!: number;
  empno!: string;
  role!: string;

}


@Component({
  standalone: true,
  selector: 'app-pending-approval',
  templateUrl: './pending-approval.component.html',
  styleUrls: ['./pending-approval.component.css'],
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
export class PendingApprovalComponent implements OnInit {

  public isDisabled: boolean = true;
  public orderno!: string;
  public claimsettleddate!: string;
  public daysleft!: string;
  public partno!: string;
  public partdesc!: string;
  public frameno!: string;
  public kms!: string;
  public salesdate!: string;
  public repairdate!: string;
  public model!: string;
  public ndprate!: string;
  public dealercode!: string;
  public dealername!: string;
  public reasonforrejection!: string;
  public justification!: string;
  public city!: string;
  public pendingList: any = [];
  public selectedId: any = {};
  public displayDetailSec: boolean = false;
  public role!: string;
  public empno!: string;
  public pendingListData: any = {};
  public amSelected!: string;
  public amList: any = [];
  public remarks!: string;
  public approveRequestFields: any = {};
  public popup: boolean = false;
  public query!: string;
  public querySelected!: string;
  public queryToName!: string;
  public queryList: any = [];
  public queryToFilerData: any = {};
  public sendQueryFilterData: any = {};
  public empname!: string;
  public escalationList: any = [];
  public fileList: any = [];
  public tm!: string;
  public tmname!: string;
  public amQueryToList: any = [];
  public emailData: any = {};
  public myDate!: Date;
  public createdOn!: string;
  public status!: string;
  public catg!: string;
  public OrderDetails:any=new OrderDetailsDO();
  public Query=new QuerydetailsDO();
  public approval=new SaveorderApproval();
  errorMap: any;
  public fromdate!: string;
  public todate!: string;
  public isforward!: boolean;

  constructor(private tmService: TmServiceService, private datePipe: DatePipe, 
    private dealerService: DealerServiceService, private emailService: EmailTriggerService,public commonService:CommonService) { }

  ngOnInit() {
    // this.role = sessionStorage.getItem('role');
    // this.empno = sessionStorage.getItem('empno');
    // this.empname = sessionStorage.getItem('empname');
    // console.log(this.role);
    // console.log(this.empno);

    // this.role="HO";
    // this.empno="10203";

    this.empno = localStorage.getItem("empno")!;
   this.role = localStorage.getItem("role")!;
  //  this.empno="12280";
  //   this.role="TM";

  console.log("pendingapproval");
    console.log("this.empno ",localStorage.getItem("empno"));
    console.log("localStorage.getItem(role)",localStorage.getItem("role"));


    
    if(this.role=="HO")
    {
      this.isforward=false;
    }
    else{
      this.isforward=true;
    }
 console.log(this.role);
    console.log(this.empno);
    
  //   if(this.role === 'TM') {
  //     this.tmService.fetchAmList(this.empno).subscribe((data)=> {
  //       console.log(data);
  //       this.amList = data['response']['recordset'];
  //       // console.log(this.amList);
  //     })
  //   }
  //   if(this.role === 'TM') {
  //     this.pendingListData['ROLE'] = this.role;
  //     this.pendingListData['Status'] = 'C';
  //     this.pendingListData['EmpNo'] = this.empno;
  //     // console.log(this.status);
  //   }
  //   else if(this.role === 'AM') {
  //     this.pendingListData['ROLE'] = this.role;
  //     this.pendingListData['Status'] = 'TA';
  //     this.pendingListData['EmpNo'] = this.empno;
  //   }
  //   this.tmService.fetchPendingList(this.pendingListData).subscribe((data)=>{
  //     this.pendingList = data['response']['recordset'];
  //     // console.log(this.pendingList);
  //   });
  //this.getPendingList();
   }


//    ngAfterViewInit(){

//     this.empno = localStorage.getItem("empno");
//     this.role=localStorage.getItem("role");
//   console.log("pendingapproval");
//     console.log("this.empno ",localStorage.getItem("empno"));
//     console.log("localStorage.getItem(role)",localStorage.getItem("role"));


    
//     if(this.role="HO")
//     {
//       this.isforward=false;
//     }
//     else{
//       this.isforward=true;
//     }
//  console.log(this.role);
//     console.log(this.empno);
//     this.getPendingList();
//   }
serach()
{
  this.isforward=true;
  this.empno = localStorage.getItem("empno")!;
  this.role = localStorage.getItem("role")!;
  // this.empno="12280";
  // this.role="TM";

console.log("pendingapproval");
  console.log("this.empno ",localStorage.getItem("empno"));
  console.log("localStorage.getItem(role)",localStorage.getItem("role"));


  
  if(this.role=="HO")
  {
    this.isforward=false;
  }
  else{
    this.isforward=true;
  }
console.log(this.role);
  console.log(this.empno);
  this.getPendingList();
}
  selectAm(event: any) {
    this.amSelected = event.target.value;
    // console.log(this.tmSelected.replace(/\s/g, ""));
  }
   getPendingList() {
    let getdata: any;
    console.log("this.role",this.role);
    if (this.role == "TM") {
      getdata = 1;
      this.status="C";
    }
    else if (this.role == "AM") {
      getdata = 2;
      this.status="TA";
    }
    else if (this.role == "HO") {
      getdata = 3;
      this.status="AA";
    }
    // this.commonService.getPendingOrderApproval('status=' + this.status + "&&empno=" + this.empno + "&&getdata="+getdata+"&&role="+localStorage.getItem('role')).
    this.commonService.getPendingOrderApproval('status=' + this.status + "&&empno=" + this.empno + "&&getdata="+getdata+"&&role="+"TM").
    subscribe((resp: any) => {
        if (resp && resp.statusCode == 200) {
          this.pendingList = resp.data;
          console.log("this.pendingList",  this.pendingList);
        
         
        }
      });
   

  }
  selectedQueryTo(event: any) {
    this.queryToName = event.target.options[event.target.options.selectedIndex].text;
    this.querySelected = event.target.value;
    this.Query.TO_EMPNAME=this.queryToName;
    this.Query.TO_EMPNO=this.querySelected;
    console.log(this.queryToName);
  }

  getRequestByDetails(item: any)
  {
    console.log("item",item.ID);
   // this.commonService.getOrderDetailsById('Reqno='+item.ID+"&&empno="+localStorage.getItem('empno')+"&&role="+localStorage.getItem('role')).
   this.commonService.getOrderDetailsById('Reqno='+item.ID+"&&empno="+"12280"+"&&role="+"TM").
 
   subscribe((resp: any) => {
        if (resp && resp.statusCode == 200) {
          this.approval.ID=item.ID;
          if(resp.data!="")
          {
           this.OrderDetails=resp.data;
           // this.escalationList=resp.data;
            console.log("this.approval",this.OrderDetails);
            this.escalationList = resp.data.query;
          }
          
          this.displayDetailSec = true;
          
         this.mappingList(item.DEALER_CODE);
         this.getQueryToList(item.ID);
          //this.getNextlevelMapping();
          //this.getQueryToList(item.ID);
        }
      });
  }

  fetchReqDetails(id: any) {
    this.amQueryToList = [];
    this.displayDetailSec = true;
    console.log(id);
    console.log("Inside fetchReqDetails()")
    this.selectedId['reqNo'] = id;
    this.queryToFilerData['ROLE'] = this.role;
    this.queryToFilerData['ID'] = id;
    this.tmService.queryDropdownList(this.queryToFilerData).subscribe((data: any) => {
      this.queryList = data['response']['recordset'];
      console.log(this.queryList);
    });
    this.tmService.escalationDetails(id).subscribe((data: any) => {
      if(data['response']['recordset'].length > 0) {
        this.escalationList = data['response']['recordset'];
        console.log(this.escalationList);
      }
      this.dealerService.fileDetails(id).subscribe((data: any) => {
        if(data['response']['recordset'].length > 0) {
          this.fileList = data['response']['recordset'];
          console.log(this.fileList);
        }
      });
    });
    this.tmService.fetchOrderDetailsId(this.selectedId).subscribe((data: any)=> {
      // console.log(data['response']['recordset']);
      this.claimsettleddate = this.datePipe.transform(data['response']['recordset'][0]['CLAIM_SETTLED_DATE'], 'yyyy-MM-dd') || '';
      this.daysleft = data['response']['recordset'][0]['DAYS_LEFT_FOR_RECLAIMING'];
      this.partno = data['response']['recordset'][0]['PART_NUMBER'];
      this.partdesc = data['response']['recordset'][0]['PART_DESCRIPTION'];
      this.frameno = data['response']['recordset'][0]['FRAME_NUMBER'];
      this.kms = data['response']['recordset'][0]['KMS'];
      this.salesdate = this.datePipe.transform(data['response']['recordset'][0]['SALES_DATE'], 'yyyy-MM-dd') || '';
      this.repairdate = this.datePipe.transform(data['response']['recordset'][0]['REPAIR_DATE'], 'yyyy-MM-dd') || '';
      this.model = data['response']['recordset'][0]['MODEL'];
      this.ndprate = data['response']['recordset'][0]['NDP_RATE'];
      this.dealercode = data['response']['recordset'][0]['DEALER_CODE'];
      this.dealername = data['response']['recordset'][0]['DEALER_NAME'];
      this.reasonforrejection = data['response']['recordset'][0]['REASON_FOR_REJECTION'];
      this.justification = data['response']['recordset'][0]['JUSTIFICATION'];
      this.city = data['response']['recordset'][0]['CITY'];
      this.tm = data['response']['recordset'][0]['TM'];
      this.createdOn = data['response']['recordset'][0]['CREATED_ON'];
      this.orderno = data['response']['recordset'][0]['ORDER_NUMBER'];
      console.log("TM is", this.tm);
      this.tmService.fetchEmpDetails(this.tm).subscribe((data: any)=> {
        this.tmname = data['response']['recordset'][0]['empname'];
        this.amQueryToList.push({no: this.dealercode, name: this.dealername})
        this.amQueryToList.push({no: this.tm, name: this.tmname})
        console.log(this.amQueryToList);
      });
    });
  }

  approveRequest() {
    this.popup = true;
    this.displayDetailSec = false;
    this.myDate = new Date();
    this.approveRequestFields['ID'] = this.selectedId['reqNo'];
    if(this.role === 'TM') {
      this.approveRequestFields['ROLE'] = this.role;
      this.approveRequestFields['TM_REMARKS'] = this.remarks;
      this.approveRequestFields['STATUS'] = 'TA';
      this.approveRequestFields['AM'] = this.amSelected;
      // Email Trigger Data
      this.tmService.fetchEmpDetails(this.amSelected).subscribe((data: any)=> {
        this.emailData['To'] = data['response']['recordset'][0]['email_id'];
        this.emailData['DealerCode'] = this.dealercode;
        this.emailData['DealerName'] = this.dealername;
        this.emailData['Town'] = this.city;
        this.emailData['CreatedOn'] = this.datePipe.transform(this.myDate, 'dd-MM-yyyy');
        this.emailData['OrdreNo'] = this.orderno;
        this.emailData['MaterialNo'] = this.partno;
        this.emailData['MaterialDesc'] = this.partdesc;
        this.emailData['FrameNo'] = this.frameno;
        this.emailData['PendingWith']= 'AM';
        this.emailData['Status'] = 'Pending for Approval';
        this.emailData['PendingFrom'] = this.createdOn
      })
    }
    if(this.role === 'AM') {
      this.approveRequestFields['ROLE'] = this.role;
      this.approveRequestFields['AM_REMARKS'] = this.remarks;
      this.approveRequestFields['STATUS'] = 'AA';
    }
    this.tmService.approveRequest(this.approveRequestFields).subscribe((data) => {
      this.tmService.fetchPendingList(this.pendingListData).subscribe((data: any)=>{
        this.pendingList = data['response']['recordset'];
        // console.log(this.pendingList);
      });
      console.log(this.emailData);
      this.emailService.sendMail(this.emailData).subscribe((data)=> {
        console.log("Mail Sent Successfully");
      })
    })
  }

  sendQuery() {
    this.popup = true;
    
    // Email Trigger Data
    this.tmService.fetchEmpDetails(this.querySelected).subscribe((data: any)=> {
      this.emailData['To'] = data['response']['recordset'][0]['email_id'];
      this.tmService.fetchEmpDetails(this.empno).subscribe((data: any)=>{
        this.emailData['Cc'] = data['response']['recordset'][0]['email_id'];
        this.emailData['DealerCode'] = this.dealercode;
        this.emailData['DealerName'] = this.dealername;
        this.emailData['Town'] = this.city;
        this.emailData['CreatedOn'] = this.datePipe.transform(this.myDate, 'dd-MM-yyyy');
        this.emailData['OrdreNo'] = this.orderno;
        this.emailData['MaterialNo'] = this.partno;
        this.emailData['MaterialDesc'] = this.partdesc;
        this.emailData['FrameNo'] = this.frameno;
        this.emailData['PendingWith']= this.role;
        this.emailData['Status'] = 'Pending for Query';
        this.emailData['PendingFrom'] = this.createdOn
      })
    })

    this.sendQueryFilterData['REQ_ID'] = this.selectedId['reqNo'];
    this.sendQueryFilterData['ROLE'] = this.role;
    this.sendQueryFilterData['FROM_EMPNO'] = this.empno;
    this.sendQueryFilterData['FROM_EMPNAME'] = this.empname;
    this.sendQueryFilterData['TO_EMPNO'] = this.querySelected;
    this.sendQueryFilterData['TO_EMPNAME'] = this.queryToName;
    this.sendQueryFilterData['REMARKS'] = this.query
    console.log(this.sendQueryFilterData);
    this.tmService.sendQuery(this.sendQueryFilterData).subscribe((data)=> {
      // console.log(data);
      this.tmService.fetchPendingList(this.pendingListData).subscribe((data: any)=>{
        this.pendingList = data['response']['recordset'];
        // console.log(this.pendingList);
      });
      this.emailService.sendMail(this.emailData).subscribe((data)=> {
        console.log("Mail Sent Successfully");
      })
    });
  }

  mappingList(dealercode: any)
  {
    if(this.role=="TM")
    {
      this.catg="ASM";
      //this.commonService.getDealerWiseMapping('dealer_id=' +dealercode+"&&catg="+this.catg+"&&empno="+localStorage.getItem('empno')+"&&role="+localStorage.getItem('role')).subscribe((resp: any) => {
      this.commonService.getDealerWiseMapping('dealer_id=' +dealercode+"&&catg="+this.catg+"&&empno="+"12280"+"&&role="+"TM").subscribe((resp: any) => {

        if (resp && resp.statusCode == 200) {
          this.amList=resp.data;
        }
       });
    }
    else if(this.role="AM")
    {
      this.catg="HO";
      this.commonService.getHOMapping('empno=&&catg='+this.catg+"&&getdata=1" ).
      subscribe((resp: any) => {
    if (resp && resp.statusCode == 200) {
      console.log("this.gmslist",resp.data);
    this.amList=resp.data;
   
    }
  });
    }
  
  }
  getQueryToList(reqno: any)
  {
   this.commonService.getQueryToList('reqno='+reqno+"&&empno="+localStorage.getItem('empno')+"&&role="+localStorage.getItem('role') ).
  // this.commonService.getQueryToList('reqno='+reqno+"&&empno="+"12280"+"&&role="+"TM" ). 
   subscribe((resp: any) => {
      if (resp && resp.statusCode == 200) {
        console.log("this.gmslist",resp.data);
      this.queryList=resp.data;
     
      }
    });
  }
saveQuery()
{
  this.Query.REQ_ID=this.approval.ID;
  this.Query.ROLE=this.role;
  this.Query.FROM_EMPNO=this.empno;
  this.Query.STATUS='Q';
  this.Query.GETDATA=1;
   this.Query.FROM_EMPNAME=localStorage.getItem("empname") || '';
  //this.Query.FROM_EMPNAME="Manpreet";
  //this.Query.FROM_EMPNAME="";
  console.log("this.superQuery",this.Query);
  if(this.validateQuery(0)) 
  this.Query.empno=localStorage.getItem('empno')!;
  this.Query.role=localStorage.getItem('role')!;
  // this.Query.empno="12280";
  // this.Query.role="TM";
  this.commonService.saveQueryProcess(this.Query).subscribe((resp: any) => {
    if (resp && resp.statusCode == 200) {
     //  this.superpending = resp.data;
     this.getPendingList();
     this.displayDetailSec = false;
     this.commonService.error("Query has been raised successfully.");
     
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
      
      if (this.Query.TO_EMPNO == "" || this.Query.TO_EMPNO == null || this.Query.TO_EMPNO == undefined) {
        this.errorMap.put("querytolist", '');
        this.commonService.error("Please select the Query To Person");
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
approve()
{
  if(this.role === 'TM') {
    this.approval.STATUS = 'TA';
    this.approval.GETDATA=1;
  }
  else if(this.role === 'AM') {
    this.approval.STATUS = 'AA';
    this.approval.GETDATA=2;
  }
  else  if(this.role === 'HO'){
    this.approval.STATUS = 'F';
    this.approval.GETDATA=3;
  }
  
  console.log("approve",this.approval);
 if(this.validateApprove(0)) 
 this.approval.empno=localStorage.getItem('empno')!;
 this.approval.role=localStorage.getItem('role')!;
// this.approval.empno="12280";
// this.approval.role="TM";
  this.commonService.saveOrderAppProcess(this.approval).subscribe((resp: any) => {
    if (resp && resp.statusCode == 200) {
     //  this.superpending = resp.data;
     this.getPendingList();
     this.displayDetailSec = false;
     this.commonService.error("Request successfully Approved.");
     
    }
  });
}
validateApprove(validateCode: number) {
  debugger;
  if (validateCode == 0) {
    this.errorMap = new MapService();
  }
  if (validateCode == 0 || validateCode == 1) {
    if (this.approval.REMARKS == null || this.approval.REMARKS == undefined||this.approval.REMARKS == "") {
      this.errorMap.put("remarks", '');

      this.commonService.error("Please enter the remarks");

    }
    else {
      this.errorMap.remove("remarks");
      debugger;
      if(this.role!="HO")
      {
      if (this.approval.EMPNO == "" || this.approval.EMPNO == null || this.approval.EMPNO == undefined) {
        this.errorMap.put("queryto", '');
        this.commonService.error("Please select the next approval person");
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
}
