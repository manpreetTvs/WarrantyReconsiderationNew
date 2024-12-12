import { Component, OnInit } from '@angular/core';
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
import { HoPendingPartsComponent } from '../ho-pending-parts/ho-pending-parts.component';
import { ApproverReportComponent } from '../../tm_screen/approver-report/approver-report.component';
import { CompletedReportComponent } from '../../tm_screen/completed-report/completed-report.component';
import { SuperPendingApprovalComponent } from '../../tm_screen/super-pending-approval/super-pending-approval.component';
import { SuperReportComponent } from '../../tm_screen/super-report/super-report.component';



@Component({
  standalone: true,
  selector: 'app-ho',
  templateUrl: './ho.component.html',
  styleUrls: ['./ho.component.css'],
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

    HoPendingPartsComponent,
    ApproverReportComponent,
    CompletedReportComponent,
    SuperPendingApprovalComponent,
    SuperReportComponent
  ]
})
export class HoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
   // sessionStorage.setItem('role', 'HO');
  }

}
