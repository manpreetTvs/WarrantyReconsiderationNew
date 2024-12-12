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
  selector: 'app-ho-pending-parts',
  templateUrl: './ho-pending-parts.component.html',
  styleUrls: ['./ho-pending-parts.component.css'],
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
export class HoPendingPartsComponent implements OnInit {
  public role: string = '';
  public empno: string = '';
  public empname: string = '';
  public hoPendingList: any = {};
  public hoPendingListData: any = [];
  public actionSelected: any = [];
  public tvsmQuery: any = [];
  public isDisabled: any = [];
  public hoqueryToSelected: string = '';
  public hoQueryToList: any = [];
  public creditedDate: any = [];
  public hoQueryToName: string = '';
  public hoQueryToNo: string = '';
  public popup: boolean = false;
  public approveRequestFields: any = {};
  public sendQueryFilterData: any = {};
  public displayDetailSec: boolean = false;
  public selectedId: any = {};
  public escalationList: any = [];
  public fileList: any = [];
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
  public tm: string = '';

  constructor(private tmService: TmServiceService, private dealerService: DealerServiceService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    //this.role = sessionStorage.getItem('role') || '';
    this.role = 'HO';
    this.empno = 'HO';
    this.empname = 'HO';
    this.hoPendingList['ROLE'] = 'HO';
    this.hoPendingList['Status'] = 'AA';
    this.hoPendingList['EmpNo'] = this.empno;
    this.tmService.fetchPendingList(this.hoPendingList).subscribe((data: any)=>{
      this.hoPendingListData = data['response']['recordset'];
      console.log(this.hoPendingListData);
      for (var val of this.hoPendingListData) {
        this.isDisabled[val['ID']] = true;
      }
    });
  }

  selectAction(event: any, item : any) {
    console.log(item);
    this.actionSelected[item['ID']] = event.target.value;
    if(this.actionSelected[item['ID']] === 'Q') {
      this.isDisabled[item['ID']] = false;
      this.hoQueryToList.push({no: item['DEALER_CODE'], name: item['DEALER_NAME']});
      this.tmService.fetchEmpDetails(item['TM']).subscribe((data : any)=> {
        this.hoQueryToList.push({no: item['TM'], name: data['response']['recordset'][0]['empname']});
        this.tmService.fetchEmpDetails(item['AM']).subscribe((data : any)=> {
          this.hoQueryToList.push({no: item['AM'], name: data['response']['recordset'][0]['empname']});
        })
      });
      console.log("final query to list", this.hoQueryToList);
    }
    if(this.actionSelected[item['ID']] === 'F') {
      this.isDisabled[item['ID']] = true;
      this.approveRequestFields['ID'] = item['ID'];
    }
  }

  selectedHoQueryTo(event: any) {
    this.hoQueryToName = event.target.options[event.target.options.selectedIndex].text;
    this.hoQueryToNo = event.target.value;
  }

  approveRequest(id: any) {
    this.popup = true;
    this.approveRequestFields['ID'] = id;
    this.approveRequestFields['ROLE'] = 'HO';
    this.approveRequestFields['CREDITED_DATE'] = this.creditedDate[id];
    this.approveRequestFields['STATUS'] = 'F';
    this.tmService.approveRequest(this.approveRequestFields).subscribe((data : any) => {
      this.tmService.fetchPendingList(this.hoPendingList).subscribe((data: any)=>{
        this.hoPendingListData = data['response']['recordset'];
      })
    })
  }

  sendQuery(item: any) {
    this.popup = true;
    this.sendQueryFilterData['REQ_ID'] = item['ID'];
    this.sendQueryFilterData['ROLE'] = this.role;
    this.sendQueryFilterData['FROM_EMPNO'] = this.empno;
    this.sendQueryFilterData['FROM_EMPNAME'] = this.empname;
    this.sendQueryFilterData['TO_EMPNO'] = this.hoQueryToNo;
    this.sendQueryFilterData['TO_EMPNAME'] = this.hoQueryToName;
    this.sendQueryFilterData['REMARKS'] = this.tvsmQuery[item['ID']]
    console.log(this.sendQueryFilterData);
    this.tmService.sendQuery(this.sendQueryFilterData).subscribe((data : any)=> {
      // console.log(data);
        this.tmService.fetchPendingList(this.hoPendingList).subscribe((data : any)=>{
          this.hoPendingListData = data['response']['recordset'];
        })
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
      this.dealerService.fileDetails(id).subscribe((data: any) => {
        if(data['response']['recordset'].length > 0) {
          this.fileList = data['response']['recordset'];
          console.log(this.fileList);
        }
      });
    });
    this.tmService.fetchOrderDetailsId(this.selectedId).subscribe((data : any)=> {
      // console.log(data['response']['recordset']);
      this.claimsettleddate = this.datePipe.transform(data['response']['recordset'][0]['CLAIM_SETTLED_DATE'], 'yyyy-MM-dd') ?? '';
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
      this.tm = data['response']['recordset'][0]['TM'];
    });
  }

}
