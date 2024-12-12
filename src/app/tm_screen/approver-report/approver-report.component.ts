import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DealerServiceService } from '../../services/dealer-service.service';
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

@Component({
  standalone: true,
  selector: 'app-approver-report',
  templateUrl: './approver-report.component.html',
  styleUrls: ['./approver-report.component.css'],
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
export class ApproverReportComponent implements OnInit {
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

  constructor(private dealerService: DealerServiceService,private datePipe: DatePipe, private tmService: TmServiceService) { }

  ngOnInit(): void {
    // this.tmService.fetchOrderDetailsReports('UP').subscribe((data)=> {
    //   this.orderDetails = data['response']['recordset'];
    //   console.log(this.orderDetails);
    // });
  }

  searchOrderDetails(): void {
    this.searchFilter['FROM_DATE'] = this.fromddate;
    this.searchFilter['TO_DATE'] = this.todate;
    this.searchFilter['DEALER_CODE'] = this.searchdealercode;
    this.searchFilter['ORDER_NUMBER'] = this.searchorderno;
    this.dealerService.fetchOrderDetailsSearch(this.searchFilter).subscribe((data: any) => {
      this.orderDetails = data['response']['recordset'];
    });
  }

  fetchReqDetails(id: any) {
    this.displayDetailSec = true;
    console.log(id);
    console.log("Inside fetchReqDetails()")
    this.selectedId['reqNo'] = id;
    this.tmService.escalationDetails(id).subscribe((data: any) => {
      if(data['response']['recordset'].length > 0) {
        this.escalationList = data['response']['recordset'];
        console.log(this.escalationList);
      }
    });
    this.dealerService.fileDetails(id).subscribe((data : any) => {
      if(data['response']['recordset'].length > 0) {
        this.fileList = data['response']['recordset'];
        console.log(this.fileList);
      }
    });
    this.tmService.fetchOrderDetailsId(this.selectedId).subscribe((data: any)=> {
      console.log(data['response']['recordset']);
      this.claimsettleddate = this.datePipe.transform(data['response']['recordset'][0]['CLAIM_SETTLED_DATE'], 'yyyy-MM-dd') || '';
      this.daysleft = data['response']['recordset'][0]['DAYS_LEFT_FOR_RECLAIMING']
      this.partno = data['response']['recordset'][0]['PART_NUMBER']
      this.partdesc = data['response']['recordset'][0]['PART_DESCRIPTION']
      this.frameno = data['response']['recordset'][0]['FRAME_NUMBER']
      this.kms = data['response']['recordset'][0]['KMS']
      this.salesdate = this.datePipe.transform(data['response']['recordset'][0]['SALES_DATE'], 'yyyy-MM-dd') ?? '';
      this.repairdate = this.datePipe.transform(data['response']['recordset'][0]['REPAIR_DATE'], 'yyyy-MM-dd') ?? '';
      this.model = data['response']['recordset'][0]['MODEL']
      this.ndprate = data['response']['recordset'][0]['NDP_RATE']
      this.dealercode = data['response']['recordset'][0]['DEALER_CODE']
      this.dealername = data['response']['recordset'][0]['DEALER_NAME']
      this.reasonforrejection = data['response']['recordset'][0]['REASON_FOR_REJECTION']
      this.justification = data['response']['recordset'][0]['JUSTIFICATION']
      this.city = data['response']['recordset'][0]['CITY']
    });
  }

}
