import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';

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



@Component({
  standalone: true,
  selector: 'app-frame-check',
  templateUrl: './frame-check.component.html',
  styleUrls: ['./frame-check.component.scss'],
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
export class FrameCheckComponent implements OnInit {
  public lang: any;
  public searchFilters = [];
  public selectedSearchType: any = '';
  public isShowPageLoader = false;
  // public isShowPrintLoader = false;
  public searchText = '';
  public jcCols = [];
  public complaintsCols = [];
  public partIssueCols = [];
  public jcRows = [];
  public complaintsRows = [];
  public partIssueRows = [];
  public rows = [];

  public inlineFilter = {
    DEALER_ID: '',
    DEALERSHIP_NAME: '',
    CITY: '',
    JOB_TYPE_DESC: '',
    JOB_CARD_NO: '',
    JOB_CARD_DATE: '',
    FRAME_NO: '',
    CUST_NAME: '',
    SERVICEMODE: '',
    KILOMETERS: '',
    MODEL: '',
    MODEL_PART: '',
    PSF_RATING:'',
    SATISFIED :'',
    REMARKS:''
  };

  public complaintsFilter = {
    DEALER_ID: '',
    JOB_TYPE_DESC: '',
    JOB_CARD_NO: '',
    JOB_CARD_DATE: '',
    FRAME_NO: '',
    Observation: '',
    Cust_Voice: '',
    Complaint_Group: '',
    Complaint: ''
  };

  public partIssueFilter = {
    DEALER_ID: '',
    DEALERSHIP_NAME: '',
    CITY: '',
    JOB_TYPE_DESC: '',
    JOB_CARD_NO: '',
    JOB_CARD_DATE: '',
    FRAME_NO: '',
    PART_NO: '',
    PART_DESC: '',
    ISSUED_QTY: '',
    ISSUEMODE: ''
  };
  frameNo: any;
  regNo: any;
  engineNo: any;
  isDisableSearch: boolean = true;
  constructor(public commonService:CommonService,public router:Router) { }

  ngOnInit(): void {
    if (this.frameNo!="" && this.frameNo!=null) {
      this.getVehicleServiceHistory();
    }
  }


  filterByName(value: string, prop: keyof typeof this.inlineFilter | keyof typeof this.complaintsFilter | keyof typeof this.partIssueFilter) { // manpreet
    if (prop in this.inlineFilter) {
      (this.inlineFilter as any)[prop] = value;
    }
    if (prop in this.complaintsFilter) {
      (this.complaintsFilter as any)[prop] = value;
    }
    if (prop in this.partIssueFilter) {
      (this.partIssueFilter as any)[prop] = value;
    }
  }
  searchChangeListener() {
    if (this.frameNo || this.regNo || this.engineNo) {
      this.isDisableSearch = false;
    } else {
      this.isDisableSearch = true;
    }
  }
  getVehicleServiceHistory() {
    if (!this.frameNo) {
      return this.commonService.error("Please enter the Frameno");
    } else {
     // this.isShowPageLoader = true;
      let params = new HttpParams();
      params = params
        .set('FrameNo', this.frameNo ? this.frameNo : '')
        .set('CountryCode','')
      this.commonService.getServiceHistory(params).subscribe((resp: any) => {
        if (resp && resp.statusCode && resp.statusCode === 200) {
          this.jcRows = resp.data.Jobcardlist ? resp.data.Jobcardlist : [];

         
          this.complaintsRows = resp.data.Complaintlist ? resp.data.Complaintlist : [];
          this.partIssueRows = resp.data.Partslist ? resp.data.Partslist : [];
          // this.router.navigate(['service/vehicleservicehistory'], {
          //   queryParams: {
          //     frameNo: this.frameNo,
          //     regNo: this.regNo,
          //     engNo: this.engineNo,
          //   }
          // });
        } else if (resp) {
        //  this.commonService.error(resp.message);
        }
       // this.isShowPageLoader = false;
      }, error => {
       // this.isShowPageLoader = false;
        this.commonService.error(error.error.Message);
      });
    }
  }
}
