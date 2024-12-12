import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import * as $ from 'jquery';
import { CommonService } from '../../services/common.service';
import Swal from 'sweetalert2';

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
import { DMSCallLogCreationComponent } from '../dms-call-log-creation/dms-call-log-creation.component';
import { DMSDealerReportComponent } from '../dms-dealer-report/dms-dealer-report.component';


@Component({
  standalone: true,
  selector: 'app-dms-menu',
  templateUrl: './dms-menu.component.html',
  styleUrls: ['./dms-menu.component.scss'],
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
    
    DMSCallLogCreationComponent,
    DMSDealerReportComponent
  ]
})
export class DmsMenuComponent implements OnInit {
  public empno:any;
  public role:any;
  public dealercode:any;
  public branch:any;
  constructor(private route:ActivatedRoute,public commonService:CommonService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{  // manpreet
      console.log("params",params);
      this.empno=params['empno'];
      this.role=params['role'];
      this.branch=params['branch'];
      this.checkDealer();
    });
  }
  // ngAfterViewInit(){
  //   $('.dropdown-content a').click(function(){
  //     $('.dropdown-content a').removeClass('active');
  //     //$(this).addClass('active');
  //     });
  //     //this.getPendingList();
  // }
  checkDealer()
  {
    this.commonService.getValidDealer('empno=' + this.empno+"&&role="+this.role).
    subscribe((resp: any) => {
      if (resp && resp.statusCode == 200) {
        console.log("checkdealer",resp.data);
        if(resp.data.DEALER_ID>0)
        {
          //this.OrderDetails.DEALER_CODE=resp.data.DEALER_ID;
          this.dealercode = "dealer";
          //this.empno="dealer"
          this.role="dealer";
          this.empno=resp.data.DEALER_ID;
          this.role=resp.data.role;

          
          localStorage.setItem('empno', this.empno);
          localStorage.setItem('role', this.role);
          localStorage.setItem('branch',this.branch);
          
         // this.getToken();
        // this.getdetails();
         // this.getEmployeeDetails();
        }
       else{
        Swal.fire({
          title: 'Not a valid Dealer',
          //showDenyButton: true,
          //showCancelButton: true,
          confirmButtonText: 'OK',
          //denyButtonText: `Don't save`,
        }).then((result) => {
          /* Read more about isConfi
          rmed, isDenied below */
          if (result.isConfirmed) {
            console.log(result.isConfirmed)
            // Swal.fire('Saved!', '', 'success')
           // window.open(location,'_self').close();
             this.close();
             
            //window.close();
          } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
          }
        })
         
       }
      }
    });
  }
  close()
{
  //window.open('','_parent',''); 
  
  //window.open('','_self').close();

  window.location.href="https://www.google.com";
}
}
