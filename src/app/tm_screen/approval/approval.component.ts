import { Component, OnInit } from '@angular/core';
import { ArrayType } from '@angular/compiler';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import $ from 'jquery';
import { TmServiceService } from '../../services/tm-service.service';
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
import { SuperPendingApprovalComponent } from '../super-pending-approval/super-pending-approval.component';
import { PendingApprovalComponent } from '../pending-approval/pending-approval.component';
import { ApproverReportComponent } from '../approver-report/approver-report.component';
import { DealerQueryComponent } from '../../dealer-query/dealer-query.component';
import { OrderReportComponent } from '../../order-report/order-report.component';
import { SuperInitiateComponent } from '../super-initiate/super-initiate.component';
import { SuperPendingQueryComponent } from '../super-pending-query/super-pending-query.component';
import { SuperReportComponent } from '../super-report/super-report.component';
import { DmsApprovalComponent } from '../../DMS_Call_Log_Workflow/dms-approval/dms-approval.component';
import { FrameCheckComponent } from '../../frame-check/frame-check.component';


@Component({
  standalone: true,
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrl: './approval.component.scss',
  imports: [
    RouterModule,
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

    PendingApprovalComponent,
    ApproverReportComponent,
    DealerQueryComponent,
    OrderReportComponent,
    SuperInitiateComponent,
    SuperPendingApprovalComponent,
    SuperPendingQueryComponent,
    SuperReportComponent,
    DmsApprovalComponent,
    FrameCheckComponent

  ]

})
// export class ApprovalComponent {

//   empname: string = 'John Doe';


// }

export class ApprovalComponent implements OnInit {

  public pendingList: any[] = [];
  public fromDateSearch: string = '';
  public toDateSearch: string = '';
  public role!: string;
  public pendingListCount: any = {};
  public empname: string = '';
  public empno!: string;
  public pendingCount!: string;
  public status!: string;


  constructor(private tmservice: TmServiceService
    ,private commonService:CommonService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(){

    this.route.queryParams.subscribe(params=>{
      console.log("params",params);
      // this.empno=params.empno;     // manpreet
      // this.role=params.role;
      localStorage.setItem('empno',this.empno);
      localStorage.setItem('role',this.role);
      this.getToken(); 
      this.checkEmployee();
   
    
    })


  }

  // ngAfterViewInit(){   // manpreet
  //   $('.dropdown-content a').click(function(){
  //     $('.dropdown-content a').removeClass('active');
  //     //$(this).addClass('active');
  //     });
  //     //this.getPendingList();
  // }
 
  pending()
  {
    this.getPendingList();
  }
  checkEmployee()
  {
    this.commonService.getValidEmployee('empno=' + this.empno+"&&role="+this.role).
    subscribe((resp: any) => {
      if (resp && resp.statusCode == 200) {
        console.log("checkdealer",resp.data);
        if(resp.data.empno!="")
        {
         
          //this.empno="dealer"
          this.role=resp.data.role;
          this.empno=resp.data.empno;
          this.getToken();
          this.getEmployeeDetails();
          this.empname = localStorage.getItem('empname') || '';
          //this.empname = "Manpreet"
          debugger;
          
        }
       
      }
    });
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
    this.commonService.getPendingOrderApproval('status=' + this.status + "&&empno=" + this.empno + "&&getdata="+getdata+"&&role="+this.role).
      subscribe((resp: any) => {
        if (resp && resp.statusCode == 200) {
          this.pendingList = resp.data;
        
         
        }
      });
   

  }
  logOut()
  {
    this.router.navigate(['/Approval']);
  }
  getEmployeeDetails()
  {
    this.commonService.getEmployeeDetails('empno=' + this.empno+"&&role="+this.role).
    subscribe((resp: any) => {
      if (resp && resp.statusCode == 200) {
        debugger;
        localStorage.setItem('empno',resp.data.EMPNO.trim());
        localStorage.setItem('empname',resp.data.EMPNAME);
        localStorage.setItem('dept',resp.data.DEPT);
        localStorage.setItem('section',resp.data.SECT);
        localStorage.setItem('sect',resp.data.SECTIONDESC);
        localStorage.setItem('plant',resp.data.PLANT);
        localStorage.setItem('cccode',resp.data.CC_CODE);
        localStorage.setItem('email',resp.data.EMAIL_ID);
        localStorage.setItem('role',this.role);
        
  
        this.empname = localStorage.getItem('empname') || '';
        //this.empname = "Manpreet"
      }
    });
    //this.getPendingList();
  }
  getToken(){
    
this.empno="12280";
this.role="TM";
    let obj={
      "empno":this.empno,
      "role": this.role
      
}

    this.commonService.token(obj,'Setting/tokenGeneration').subscribe((resp: any) => {
      if(resp){
        sessionStorage.setItem('authToken',resp.data);
        this.getEmployeeDetails();
      }
    });
  }

}
