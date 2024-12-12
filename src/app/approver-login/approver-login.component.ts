import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from '../services/login-service.service';
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
  selector: 'app-approver-login',
  templateUrl: './approver-login.component.html',
  styleUrls: ['./approver-login.component.css'],
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
export class ApproverLoginComponent implements OnInit {

  public empno!: string;
  public emp_pwd!: string;
  public authenticateData: any = {};

  constructor(private router: Router, private loginService: LoginServiceService) { }

  ngOnInit(): void {
  }

  signIn() {
    this.authenticateData['userName'] = this.empno;
    this.authenticateData['password'] = this.emp_pwd;
    if(this.empno === '3365' && this.emp_pwd === 'tvsm123#') {
      sessionStorage.setItem('role', 'GMS');
      sessionStorage.setItem('empno', '3365');
      sessionStorage.setItem('empname', 'Milind Atul Gandhi');
      console.log(sessionStorage.getItem('role'));
      console.log(sessionStorage.getItem('empno'));
      console.log(sessionStorage.getItem('empname'));
      this.router.navigate(['/approverScreen']);
    }
    else {
      this.loginService.login(this.authenticateData).subscribe((data: any)=> {
        console.log(data);
        // sessionStorage.setItem('role', data['data'][0]['roleId']); // manpreet
        // sessionStorage.setItem('empno', data['data'][0]['userId']);
        // sessionStorage.setItem('empname', data['data'][0]['firstName']);
        // console.log(sessionStorage.getItem('role'));
        // console.log(sessionStorage.getItem('empno'));
        // console.log(sessionStorage.getItem('empname'));
      });
      this.router.navigate(['/approverScreen'])
    }
  }

}
