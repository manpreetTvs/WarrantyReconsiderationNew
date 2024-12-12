import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from '../../services/common.service';
import { MapService } from '../../services/map.service';

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




export class CallLogApprovalDO {
  ID!: number;
  CALL_LOG_TYPE_ID!: number;
  STATUS!: string;
  EMPNO!: string;
  REMARKS!: string;
  GETDATA!: number;
  CALL_LOG_ID!: number;
  DEALER_NAME!: number;
}

@Component({
  standalone: true,
  selector: 'app-dms-approval',
  templateUrl: './dms-approval.component.html',
  styleUrls: ['./dms-approval.component.scss'],
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
export class DmsApprovalComponent implements OnInit {
  public ReportHeader: any;
  public ReportList: any;
  public SaleDateList: any;
  public KMChangeList: any;
  public LockRemovalList: any;
  public KMHeader: any;
  public lockHeader: any;
  public dealerid: any;
  public branch: any;
  public APPmappinglist: any[] = [];
  public TMList: any[] = [];
  public CallLogTypeList: any[] = [];
  public isSaleDate: boolean = false;
  public isKM: boolean = false;
  public isLock: boolean = false;
  public tm: any;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  public reportType: any;
  public array: any;
  public empno: any;
  public role: any;
  public status: any;
  public type_id:any;
  public callLogApproval: any = new CallLogApprovalDO();
  public show:boolean=false;
  // ELEMENT_DATA=[
  //       {
  //      sNo: 1,
  //      CALL_LOG_ID: '1234',
  //      CALL_LOG_TYPE_DESC: "dgdgdfdhfd",
  //      Status: "rgp",
  //      Pending_With: '1',
  //      Pending_From: "06/11/2019",
  //      Count: '2035',


  //    },
  //    {
  //      sNo: 2,
  //      CALL_LOG_ID: '12345',
  //      CALL_LOG_TYPE_DESC: "dgdgdfdhfd",
  //      Status: "rgp",
  //      Pending_With: '1',
  //      Pending_From: "06/11/2019",
  //      Count: '2035',


  //    }
  // ];
 
  displayedColumns: string[] = ['sNo', 'CalllogNo','dealer_id', 'calllogtype', 'pendingfrom', 'noofcall', 'star'];
  displayedSaleColumn: string[] = [ 'dmsCalllogNo', 'calllogtype', 'frameno', 'dmssaledate', 'actsaledate','deaRmks', 'apprmks', 'approver', 'approve', 'reject']
  displayedKMColumn: string[] = [ 'dmsCalllogNo', 'calllogtype', 'frameno', 'dmskm', 'actkm','deaRmks', 'apprmks', 'approver', 'approve', 'reject']
  dataSource = new MatTableDataSource<any>();
  dataSourceSale = new MatTableDataSource<any>();
  dataSourceKM = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  tempDataSource: any;
  getdata: any;
  errorMap: any;
  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    //12388-TM
    //this.empno = "12388";
    //this.role = "TM";
    //this.dealerid = "11464"
//  manpreet
   this.empno =localStorage.getItem('empno'); 
    this.role=localStorage.getItem('role');
    
    this.getApprovalDetails();
    if(this.role=="TM")
    {
      this.displayedKMColumn= [ 'dmsCalllogNo', 'calllogtype', 'frameno', 'dmskm', 'actkm','deaRmks', 'apprmks', 'approver', 'approve', 'reject'];
      this.displayedSaleColumn= [ 'dmsCalllogNo', 'calllogtype', 'frameno', 'dmssaledate', 'actsaledate','deaRmks', 'apprmks', 'approver', 'approve', 'reject'];
    }
    else if(this.role=="AM"){
      this.displayedKMColumn= [ 'dmsCalllogNo', 'calllogtype', 'frameno', 'dmskm', 'actkm','deaRmks','TM_EMPNO','TM_REMARKS','TM_APPR_DATE', 'apprmks', 'approve', 'reject'];
      this.displayedSaleColumn= [ 'dmsCalllogNo', 'calllogtype', 'frameno', 'dmssaledate', 'actsaledate','deaRmks','TM_EMPNO','TM_REMARKS','TM_APPR_DATE', 'apprmks', 'approve', 'reject'];
    }
  }
  handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }
  iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.dataSource = part;
  }
  getRecord(element: { CALL_LOG_TYPE_ID: number; DEALER_ID: any; CALL_LOG_ID: string; }) {
    console.log("element", element)
    this.type_id=element.CALL_LOG_TYPE_ID;
  
    if (element.CALL_LOG_TYPE_ID == 1) {
      if(this.role=="TM")
    {
      this.displayedSaleColumn= [ 'dmsCalllogNo', 'calllogtype', 'frameno', 'dmskm', 'actkm','deaRmks', 'apprmks', 'approver', 'approve', 'reject'];
      this.displayedSaleColumn= [ 'dmsCalllogNo', 'calllogtype', 'frameno', 'dmssaledate', 'actsaledate','deaRmks', 'apprmks', 'approver', 'approve', 'reject'];
    }
    else if(this.role=="AM"){
      this.displayedKMColumn= [ 'dmsCalllogNo', 'calllogtype', 'frameno', 'dmskm', 'actkm','deaRmks','TM_EMPNO','TM_REMARKS','TM_APPR_DATE', 'apprmks',  'approve', 'reject'];
      this.displayedSaleColumn= [ 'dmsCalllogNo', 'calllogtype', 'frameno', 'dmssaledate', 'actsaledate','deaRmks','TM_EMPNO','TM_REMARKS','TM_APPR_DATE', 'apprmks', 'approve', 'reject'];
    }
      this.isSaleDate = true;
      this.isKM = false;
      this.dealerid = element.DEALER_ID;
      this.getMappingList();
      this.commonService.getsaleDateDetails("callLogId=" + element.CALL_LOG_ID).
        subscribe((resp: any) => {
          
          if(this.role=="TM")
          {
            this.dataSourceSale = new MatTableDataSource(resp.data.filter((item: { STATUS: string; })=>item.STATUS=="R"));
          }
          else
          {
            this.dataSourceSale = new MatTableDataSource(resp.data.filter((item: { STATUS: string; })=>item.STATUS=="TA"));
          }
          // this.tempDataSource=resp.data;
          // this.array = resp.data;
          // this.totalSize = this.array.length;
          // this.iterator();
        });

    }
    else if (element.CALL_LOG_TYPE_ID == 2) {
      this.isKM = true;
      this.isSaleDate = false;
      this.dealerid = element.DEALER_ID;
      this.getMappingList();
      this.commonService.getKMDetails("callLogId=" + element.CALL_LOG_ID).
        subscribe((resp: any) => {
          this.dataSourceKM = new MatTableDataSource(resp.data);
          if(this.role=="TM")
          {
            this.show=true;
          }
          if(this.role=="TM")
          {
            this.dataSourceKM = new MatTableDataSource(resp.data.filter((item: { STATUS: string; })=>item.STATUS=="R"));
          }
          else
          {
            this.dataSourceKM = new MatTableDataSource(resp.data.filter((item: { STATUS: string; })=>item.STATUS=="TA"));
          }
          // this.tempDataSource=resp.data;
          // this.array = resp.data;
          // this.totalSize = this.array.length;
          // this.iterator();
        });
    }

  }

  getApprovalDetails() {
    if (this.role == "TM") {
      this.status = "R";
      this.getdata = 1;
    }
    else if (this.role == "AM") {
      this.status = "TA";
      this.getdata = 2;
    }
    this.commonService.getCallApprovalDetails("empno=" + this.empno + "&&status=" + this.status + "&&getdata=" + this.getdata).
      subscribe((resp: any) => {
        if (resp && resp.statusCode == 200. && resp.data != "") {
          console.log("resp.data", resp.data);
          this.dataSource = new MatTableDataSource(resp.data);
          this.tempDataSource = resp.data;
          this.array = resp.data;
          this.totalSize = this.array.length;
          this.iterator();
        }
      });
  }
  approve(element: { SALE_DATE_CHANGE_ID: any; KM_CHANGE_ID: any; Remarks: any; EMPNO: any; }) {
    if (element) {
      if(this.role=="TM")
      {
       this.callLogApproval.GETDATA=1;
       this.callLogApproval.STATUS="TA";
       
      }
      else if(this.role=="AM")
      {
        this.callLogApproval.GETDATA=2;
        this.callLogApproval.STATUS="C";
      }
      if(this.type_id==1)
      {
        this.callLogApproval.ID=element.SALE_DATE_CHANGE_ID;
      }
      else if(this.type_id==2)
      {
        this.callLogApproval.ID=element.KM_CHANGE_ID;
      }
      this.callLogApproval.CALL_LOG_TYPE_ID=this.type_id;
      this.callLogApproval.REMARKS=element.Remarks;
      this.callLogApproval.EMPNO=element.EMPNO;
      
      console.log("this.callLogApproval",this.callLogApproval);
     // if(this.validateSave(0,element,this.type_id))
      //{
        this.commonService.SaveDMSCallLogApproval(this.callLogApproval).subscribe((resp: any) => {
          if (resp && resp.statusCode == 200) {
            this.commonService.error("Call log details has been approved successfully");
            this.getApprovalDetails();
            this.isSaleDate = false;
            this.isKM = true;
          }
         });
     // }

      
    
     
    }
  }
  reject(element: { SALE_DATE_CHANGE_ID: any; KM_CHANGE_ID: any; Remarks: any; EMPNO: any; }) {
    if (element) {
      if(this.role=="TM")
      {
       this.callLogApproval.GETDATA=1;
       this.callLogApproval.STATUS="R";
       
      }
      else if(this.role=="AM")
      {
        this.callLogApproval.GETDATA=2;
        this.callLogApproval.STATUS="R";
      }
      if(this.type_id==1)
      {
        this.callLogApproval.ID=element.SALE_DATE_CHANGE_ID;
      }
      else if(this.type_id==2)
      {
        this.callLogApproval.ID=element.KM_CHANGE_ID;
      }
      this.callLogApproval.CALL_LOG_TYPE_ID=this.type_id;
      this.callLogApproval.REMARKS=element.Remarks;
      this.callLogApproval.EMPNO=element.EMPNO;
      
      console.log("this.callLogApproval",this.callLogApproval);
     // if(this.validateSave(0,element,this.type_id))
      //{
        this.commonService.SaveDMSCallLogApproval(this.callLogApproval).subscribe((resp: any) => {
          if (resp && resp.statusCode == 200) {
            this.commonService.error("Call log details has been rejected successfully");
            this.getApprovalDetails();
            this.isSaleDate = false;
            this.isKM = true;
          }
         });
     // }

      
    
     
    }

  }
  getMappingList() {
    this.commonService.getMappingList("dealerid=" + this.dealerid).
      subscribe((resp: any) => {
        if (resp && resp.statusCode == 200) {
          this.APPmappinglist = resp.data;
          console.log("thiss.mapping", this.APPmappinglist);
          //TM-SERVICE
          this.TMList = [];

          this.APPmappinglist.filter(val => {
            //console.log('key[this.DA.da_type]', key[this.DA.da_type]);
            console.log("key", val["Category"]);

            if (val["Category"] == "ASI" || val["Category"] == "ASM") {
              console.log("val", val);
              this.TMList.push(val);
            }
          })
          console.log("this.TMList", this.TMList);
        }
      });
  }
  validateSave(validateCode: number,element: { REMARKS: string | null | undefined; EMPNO: string | null | undefined; },type: number) {
    debugger;
    if (validateCode == 0) {
      this.errorMap = new MapService();
    }
    if (validateCode == 0 || validateCode == 1) {
      if (element.REMARKS== ""||element.REMARKS == null || element.REMARKS == undefined) {
        if(type==1)
        {
          this.errorMap.put("salereasonforrejection", '');
          this.commonService.error("Please enter the remarks");
        }
        else{
          this.errorMap.put("reasonforrejection", '');
          this.commonService.error("Please enter the remarks");
        }
       
  
       
  
      }
      else {
        if(type==1)
        {
          this.errorMap.remove("salereasonforrejection");
        }
        else{
          this.errorMap.remove("reasonforrejection");
        }
      
        if (element.EMPNO== ""||element.EMPNO == null || element.EMPNO == undefined) {
          this.errorMap.put("tmdrpdwn", '');
  
          this.commonService.error("Please enter the remarks");
          
        }
        else {
          this.errorMap.remove("tmdrpdwn");
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
