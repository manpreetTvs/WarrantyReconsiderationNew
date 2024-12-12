import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonService } from '../../services/common.service';

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


export class DMSSaleDateDO {
  SALE_DATE_CHANGE_ID!: number;
  CALL_LOG_ID!: number;
  DMS_CALL_LOG_NO!: string;
  JOB_CARD_NO!: number;
  FRAME_NUMBER!: string;
  DMS_SALE_DATE: any;
  SALE_DATE_TO_BE_CHANGED: any;
  REMARKS!: string;
  TM_EMPNO!: string;
  TM_REMARKS!: string;
  TM_APPR_DATE: any;
  ASM_EMPNO!: string;
  ASM_REMARKS!: string;
  ASM_APPR_DATE: any;
  STATUS!: string;   
}

export class DMSKMChangeeDO {
  KM_CHANGE_ID!: number;
  CALL_LOG_ID!: number;
  DMS_CALL_LOG_NO!: string;
  JOB_CARD_NO!: number;
  FRAME_NUMBER!: string;
  DMS_KM!: string;
  KM_to_be_CHANGED!: string;
  REMARKS!: string;
  TM_EMPNO!: string;
  TM_REMARKS!: string;
  TM_APPR_DATE: any;
  ASM_EMPNO!: string;
  ASM_REMARKS!: string;
  ASM_APPR_DATE: any;
  STATUS!: string;
}
export class CallLogHeaderDO {
  CALL_LOG_ID!: number;
  DEALER_ID!: number;
  BRANCH_ID!: number;
  CALL_LOG_TYPE_ID!: number;
  CREATED_DATE: any;
  ACTIVE!: boolean;
  saleDateChange!: DMSSaleDateDO[];
  KMChange!: DMSKMChangeeDO[];
}
@Component({
  standalone: true,
  selector: 'app-dms-dealer-report',
  templateUrl: './dms-dealer-report.component.html',
  styleUrls: ['./dms-dealer-report.component.scss'],
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
export class DMSDealerReportComponent implements OnInit {
 public  ReportHeader:any;
 public ReportList:any;
 public SaleDateList:any;
 public KMChangeList:any;
 public LockRemovalList:any;
 public KMHeader:any;
 public lockHeader:any;
 public dealerid:any;
 public branch:any;
 public APPmappinglist: any[] = [];
 public TMList: any[] = [];
 public CallLogTypeList: any[] = [];
 public isSaleDate:boolean=false;
 public isKM:boolean=false;
 public isLock:boolean=false;
 public tm:any;
 public pageSize = 5;
 public currentPage = 0;
 public totalSize = 0;
 public reportType : any;
 public array: any; 
 ELEMENT_DATA=[
       {
      sNo: 1,
      CALL_LOG_ID: '1234',
      CALL_LOG_TYPE_DESC: "dgdgdfdhfd",
      Status: "rgp",
      Pending_With: '1',
      Pending_From: "06/11/2019",
      Count: '2035',
      
      
    },
    {
      sNo: 2,
      CALL_LOG_ID: '12345',
      CALL_LOG_TYPE_DESC: "dgdgdfdhfd",
      Status: "rgp",
      Pending_With: '1',
      Pending_From: "06/11/2019",
      Count: '2035',
      
      
    }
 ];
 displayedColumns: string[] = ['dealer_id','CalllogNo', 'calllogtype',  'noofcall','star'];
 displayedSaleColumn:string[]=['sNo','dmsCalllogNo', 'calllogtype','frameno','dmssaledate','actsaledate','remarks','status', 'pendingwith', 'pendingfrom','TM_EMPNO','TM_REMARKS','TM_APPR_DATE','ASM_EMPNO','ASM_REMARKS','ASM_APPR_DATE']
 displayedKMColumn:string[]=['sNo','dmsCalllogNo', 'calllogtype','frameno','dmskm','actkm','remarks','status', 'pendingwith', 'pendingfrom','TM_EMPNO','TM_REMARKS','TM_APPR_DATE','ASM_EMPNO','ASM_REMARKS','ASM_APPR_DATE']
 dataSource=new MatTableDataSource<any>();
 dataSourceSale=new MatTableDataSource<any>();
 dataSourceKM=new MatTableDataSource<any>(this.ELEMENT_DATA);

 @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
 @ViewChild(MatSort, { static: true }) sort!: MatSort;
  tempDataSource: any;
  role!: string;
  constructor(private commonService:CommonService) { }

  ngOnInit(): void {

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
     // manpreet changes
    this.dealerid="11464";
    this.branch="1";
    this.role="TM";

    this.dealerid =localStorage.getItem('empno');
    this.role = localStorage.getItem('role') || '';
    this.branch=localStorage.getItem('branch');
    this.getReportDetails();
  
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
  getRecord(element: any)  // manpreet
  {
    console.log("element",element)
    if(element.CALL_LOG_TYPE_ID==1)
    {
      this.isSaleDate=true;
      this.isKM=false;
      this.commonService.getsaleDateDetails("callLogId="+element.CALL_LOG_ID).
      subscribe((resp: any) => {
        this.dataSourceSale = new MatTableDataSource(resp.data);
        // this.tempDataSource=resp.data;
        // this.array = resp.data;
        // this.totalSize = this.array.length;
        // this.iterator();
      });
      
    }
    else if(element.CALL_LOG_TYPE_ID==2){
      this.isKM=true;
      this.isSaleDate=false;
      this.commonService.getKMDetails("callLogId="+element.CALL_LOG_ID).
      subscribe((resp: any) => {
        this.dataSourceKM = new MatTableDataSource(resp.data);
        // this.tempDataSource=resp.data;
        // this.array = resp.data;
        // this.totalSize = this.array.length;
        // this.iterator();
      });
    }
   
  }
  getReportDetails()
  {
    this.commonService.getCallLogDetails("dealerid="+this.dealerid+"&&branch="+this.branch+"&&fromdate=&&todate=&&status").
    subscribe((resp: any) => {
      if (resp && resp.statusCode == 200. && resp.data != "") {
        console.log("resp.data",resp.data);
        this.dataSource = new MatTableDataSource(resp.data);
        this.tempDataSource=resp.data;
        this.array = resp.data;
        this.totalSize = this.array.length;
        this.iterator();
      }
    });
  }
  openFilter()
  {
    this.getReportDetails();
  }

}
