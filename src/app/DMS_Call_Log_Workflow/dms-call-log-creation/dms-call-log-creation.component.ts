import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from '../../services/common.service';
import { DatePipe } from '@angular/common';
import { MapService } from '../../services/map.service'; // Ensure this path is correct
import { ActivatedRoute, RouterModule } from '@angular/router';
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



export class DMSSaleDateDO {
  SALE_DATE_CHANGE_ID: number = 0;
  CALL_LOG_ID: number = 0;
  DMS_CALL_LOG_NO: string = '';
  JOB_CARD_NO: number = 0;
  FRAME_NUMBER: string = '';
  DMS_SALE_DATE: Date = new Date();
  SALE_DATE_TO_BE_CHANGED: any = null;
  REMARKS: string = '';
  TM_EMPNO: string = '';
  TM_REMARKS: string = '';
  TM_APPR_DATE: any = null;
  ASM_EMPNO: string = '';
  ASM_REMARKS: string = '';
  ASM_APPR_DATE: any = null;
  STATUS: string = '';   
}

export class DMSKMChangeeDO {
  KM_CHANGE_ID: number = 0;
  CALL_LOG_ID: number = 0;
  DMS_CALL_LOG_NO: string = '';
  JOB_CARD_NO: number = 0;
  FRAME_NUMBER: string = '';
  DMS_KM: string = '';
  KM_to_be_CHANGED: string = '';
  REMARKS: string = '';
  TM_EMPNO: string = '';
  TM_REMARKS: string = '';
  TM_APPR_DATE:any = null;
  ASM_EMPNO: string = '';
  ASM_REMARKS: string = '';
  ASM_APPR_DATE: any = null;
  STATUS: string = '';
}
export class CallLogHeaderDO {
  CALL_LOG_ID: number = 0;
  DEALER_ID: number = 0;
  BRANCH_ID: number = 0;
  CALL_LOG_TYPE_ID: number = 0;
  CREATED_DATE: any = null;
  ACTIVE: boolean = false;
  saleDateChange: DMSSaleDateDO[] = [];
  KMChange: DMSKMChangeeDO[] = [];
}
@Component({
  standalone: true,
  selector: 'app-dms-call-log-creation',
  templateUrl: './dms-call-log-creation.component.html',
  styleUrls: ['./dms-call-log-creation.component.css'],
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
  ]
})
export class DMSCallLogCreationComponent implements OnInit {
public SaleDateHeader:any;
  public horizantal: any = {
    'Cell': '',
    'TargetDate': '',
    'ResponsibleEmpNo': '',
    'ResponsibleEmpName': '',
    'Status': '',
    'StatusText': ''
  }
  public sparePartList:any;
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
  public empno:any;
  public role:any;
  public dealercode:any;
  public callLogHeader: any = new CallLogHeaderDO();
  displayedColumns: string[] = ['sNo', 'CellMachine', 'TargetDate', 'Responsible', 'ResponsibleName', 'Status', 'Remove'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  errorMap!: MapService;
  @Input() public varName!: string;
  
  constructor(private commonService:CommonService,private datePipe: DatePipe,private route:ActivatedRoute) { }

  ngOnInit(): void {
    console.log("varName",this.varName);
   
    
this.getdetails();
   
  }
  getdetails()
  {
    this.selectType();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource=this.horizantal;
    //this.dealerid =localStorage.getItem('empno');
    //this.role=localStorage.getItem('role');
    //this.dealerid="11464";
    this.branch="1";
    // this.branch=localStorage.getItem('branch');
    this.getMappingList();
    this.getCallLogTypelist();
    this.SaleDateList=[
     {
      "SI.NO":''
     }
    ];
    this.KMChangeList=[
      {
       "SI.NO":''
      }
     ];
     this.LockRemovalList=[
      {
       "SI.NO":''
      }
     ];
    this.SaleDateHeader = [
    
      {
        name: "Call Log Number"
        
      },
      {
        name: "JobCard Number"
        
      },
      {
        name: "Frame Number"
       
      },
      {
        name: "Entered Sale Date"
        
      },
      {
        name: "Actual Sale Date "
        
      },
      {
        name: "Remarks "
        
      }
     
    ];
    this.KMHeader = [
      {
        name: "Call Log Number"
        
      },
      {
        name: "JobCard Number"
        
      },
      {
        name: "Frame Number"
       
      },
      {
        name: "Entered KM"
        
      },
      {
        name: "Actual KM"
        
      },
      {
        name: "Remarks "
        
      }
     
    ];
    this.lockHeader = [
      {
        name: "Call Log Number"
        
      },
      {
        name: "JobCard Number"
        
      },
      {
        name: "Frame Number"
       
      },
      {
        name: "Job card date"
        
      },
     
      {
        name: "Remarks"
        
      },
      {
        name:"action"
      }
     
    ];
  }
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
         // this.getToken();
         this.getdetails();
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
  addSale() {
    if (this.validate() == true){
      let saleOj = new DMSSaleDateDO();
      saleOj.CALL_LOG_ID = Math.floor(Math.pow(10, 10 - 1) + Math.random() * 9 * Math.pow(10, 10 - 1));
      this.SaleDateList.push(saleOj);
    }
    
  }

  validate() {
    let jobcardno: any = 0, calllogno: any = 0, frameno: any = 0, saledate: any = 0, actualdate: any = 0, remarks: any = 0;

    debugger;
    //this.callLogHeader.saleDateChange = new DMSSaleDateDO();
    if (this.SaleDateList.length > 0) {
      this.SaleDateList.filter((val: { JOB_CARD_NO: string | null | undefined; FRAME_NUMBER: string | null | undefined; DMS_SALE_DATE: string | null | undefined; SALE_DATE_TO_BE_CHANGED: string | null | undefined; REMARKS: string | null | undefined; }) => {
        // if (val.DMS_CALL_LOG_NO == "" || val.DMS_CALL_LOG_NO == null || val.DMS_CALL_LOG_NO == undefined) {
        //   calllogno++;
        // }
        if (val.JOB_CARD_NO == "" || val.JOB_CARD_NO == null || val.JOB_CARD_NO == undefined) {
          jobcardno++;
        }
        if (val.FRAME_NUMBER == "" || val.FRAME_NUMBER == null || val.FRAME_NUMBER == undefined) {
          frameno++;
        }
        if (val.DMS_SALE_DATE == "" || val.DMS_SALE_DATE == null || val.DMS_SALE_DATE == undefined) {
          saledate++;
        }
        if (val.SALE_DATE_TO_BE_CHANGED == "" || val.SALE_DATE_TO_BE_CHANGED == null || val.SALE_DATE_TO_BE_CHANGED == undefined) {
          actualdate++;
        }
        if (val.REMARKS == "" || val.REMARKS == null || val.REMARKS == undefined) {
          remarks++;
        } 
      })
    }
  
     if (calllogno > 0) {
      this.commonService.error("Please enter the call log number");
      return false;
    }
    else if (jobcardno > 0) {
      this.commonService.error("Please enter the job card number");
      return false;
    }
    else if (frameno > 0) {
      this.commonService.error("Please enter the frame number");
      return false;
    }
    else if (saledate > 0) {
      this.commonService.error("Please enter the sale date");
      return false;
    }
    else if (actualdate > 0) {
      this.commonService.error("Please select the actual sale date");
      return false;
    }
    else if (remarks > 0) {
      this.commonService.error("Please enter the remarks");
      return false;
    }
    else {
      return true;
    }
  }

  addPart() {
 
  }
  deleteSale(i: any,item: any)
  {
    
      this.SaleDateList.splice(i, 1);
     
  }
  saleDateValidaion(item: { FRAME_NUMBER: string; SALE_DATE_TO_BE_CHANGED: string; JOB_CARD_NO: string; DMS_SALE_DATE: string; },index: any)
  {
    let reqobj=
    {
      'DEALER_ID':this.dealerid,
      'FRAME_NUMBER':item.FRAME_NUMBER,
      'SALE_DATE_TO_BE_CHANGED':item.SALE_DATE_TO_BE_CHANGED
    }
    this.commonService.saleDateValidation(reqobj).subscribe((resp: any) => {
      if (resp && resp.statusCode == 200) {
        if(resp.data>0)
        {
          if(resp.data==1)
          {
           item.JOB_CARD_NO="";
           item.FRAME_NUMBER="";
           item.DMS_SALE_DATE="";
           item.SALE_DATE_TO_BE_CHANGED="";
            this.commonService.error("Sale date greater than to production year");
          }
          else if(resp.data==2)
          {
            item.JOB_CARD_NO="";
           item.FRAME_NUMBER="";
           item.SALE_DATE_TO_BE_CHANGED="";
            this.commonService.error("Sale date greater than to production month");
          }
          else if(resp.data==3)
          {
            item.JOB_CARD_NO="";
           item.FRAME_NUMBER="";
           item.SALE_DATE_TO_BE_CHANGED="";
            this.commonService.error("Sale date greater than to GRN date");
          }
          else if(resp.data==4)
          {
            item.JOB_CARD_NO="";
           item.FRAME_NUMBER="";
           item.SALE_DATE_TO_BE_CHANGED="";
            this.commonService.error("Job card already completed for the requested frame number");
          }
          else if(resp.data==5)
          {
            item.JOB_CARD_NO="";
            item.FRAME_NUMBER="";
            item.SALE_DATE_TO_BE_CHANGED="";
             this.commonService.error("Already sale date has been changed for the requested frame number");
          }
        }
        
      }
     });
  }
  KMValidation(item: { FRAME_NUMBER: string; KM_to_be_CHANGED: string; JOB_CARD_NO: string; DMS_KM: string; },index: any)
  {
    let reqobj=
    {
      'DEALER_ID':this.dealerid,
      'FRAME_NUMBER':item.FRAME_NUMBER,
      'KM_to_be_CHANGED':item.KM_to_be_CHANGED
    }
    this.commonService.KMValidation(reqobj).subscribe((resp: any) => {
      if (resp && resp.statusCode == 200) {
        if(resp.data>0)
        {
          if(resp.data==1)
          {
            item.JOB_CARD_NO="";
            item.FRAME_NUMBER="";
            item.DMS_KM="";
            item.KM_to_be_CHANGED="";
            this.commonService.error("Existing km is greater than the requested km");
          }
        }
        
      }
     });
  }
  
  validateKM() {
    let jobcardno: any = 0, calllogno: any = 0, frameno: any = 0, km: any = 0, actualkm: any = 0, remarks: any = 0;

    debugger;
    //this.callLogHeader.saleDateChange = new DMSSaleDateDO();
    if (this.KMChangeList.length > 0) {
      this.KMChangeList.filter((val: { JOB_CARD_NO: string | null | undefined; FRAME_NUMBER: string | null | undefined; DMS_KM: string | null | undefined; KM_to_be_CHANGED: string | null | undefined; REMARKS: string | null | undefined; }) => {
        // if (val.DMS_CALL_LOG_NO == "" || val.DMS_CALL_LOG_NO == null || val.DMS_CALL_LOG_NO == undefined) {
        //   calllogno++;
        // }
        if (val.JOB_CARD_NO == "" || val.JOB_CARD_NO == null || val.JOB_CARD_NO == undefined) {
          jobcardno++;
        }
        if (val.FRAME_NUMBER == "" || val.FRAME_NUMBER == null || val.FRAME_NUMBER == undefined) {
          frameno++;
        }
        if (val.DMS_KM == "" || val.DMS_KM == null || val.DMS_KM == undefined) {
          km++;
        }
        if (val.KM_to_be_CHANGED == "" || val.KM_to_be_CHANGED == null || val.KM_to_be_CHANGED == undefined) {
          actualkm++;
        }
        if (val.REMARKS == "" || val.REMARKS == null || val.REMARKS == undefined) {
          remarks++;
        } 
      })
    }
  
     if (calllogno > 0) {
      this.commonService.error("Please enter the call log number");
      return false;
    }
    else if (jobcardno > 0) {
      this.commonService.error("Please enter the job card number");
      return false;
    }
    else if (frameno > 0) {
      this.commonService.error("Please enter the frame number");
      return false;
    }
    else if (km > 0) {
      this.commonService.error("Please enter the entered KM");
      return false;
    }
    else if (actualkm > 0) {
      this.commonService.error("Please enter the actual KM");
      return false;
    }
    else if (remarks > 0) {
      this.commonService.error("Please enter the remarks");
      return false;
    }
    else {
      return true;
    }
  }
  validateDupSale(): boolean {
    let jobcardno: any = 0, calllogno: any = 0;
    if (this.SaleDateHeader.length > 0) {
      this.SaleDateHeader.filter((val: { DMS_CALL_LOG_NO: string | null | undefined; JOB_CARD_NO: string | null | undefined; }) => {
        if (val.DMS_CALL_LOG_NO == "" || val.DMS_CALL_LOG_NO == null || val.DMS_CALL_LOG_NO == undefined) {
          calllogno++;
        }
        if (val.JOB_CARD_NO == "" || val.JOB_CARD_NO == null || val.JOB_CARD_NO == undefined) {
          jobcardno++;
        }
      });
    }
  
    //  if (calllogno > 0) {
    //   this.commonService.error("Please enter the distinct call log number");
    //   return false;
    // }
    if (jobcardno > 0) {
      this.commonService.error("Please enter the distinct job card number");
      return false;
    } else {
      return true;
    }
  }
  validateLock() {
    let jobcardno: any = 0, calllogno: any = 0, frameno: any = 0, jcdate: any = 0, remarks: any = 0;

    debugger;
    //this.callLogHeader.saleDateChange = new DMSSaleDateDO();
    if (this.LockRemovalList.length > 0) {
      this.LockRemovalList.filter((val: { JOB_CARD_NO: string | null | undefined; FRAME_NUMBER: string | null | undefined; DMS_JOB_CARD_DATE: string | null | undefined; REMARKS: string | null | undefined; }) => {
        // if (val.DMS_CALL_LOG_NO == "" || val.DMS_CALL_LOG_NO == null || val.DMS_CALL_LOG_NO == undefined) {
        //   calllogno++;
        // }
        if (val.JOB_CARD_NO == "" || val.JOB_CARD_NO == null || val.JOB_CARD_NO == undefined) {
          jobcardno++;
        }
        if (val.FRAME_NUMBER == "" || val.FRAME_NUMBER == null || val.FRAME_NUMBER == undefined) {
          frameno++;
        }
        if (val.DMS_JOB_CARD_DATE == "" || val.DMS_JOB_CARD_DATE == null || val.DMS_JOB_CARD_DATE == undefined) {
          jcdate++;
        }

        if (val.REMARKS == "" || val.REMARKS == null || val.REMARKS == undefined) {
          remarks++;
        }
      });
    }

    //  if (calllogno > 0) {
    //   this.commonService.error("Please enter the call log number");
    //   return false;
    // }
    if (jobcardno > 0) {
      this.commonService.error("Please enter the job card number");
      return false;
    } else if (frameno > 0) {
      this.commonService.error("Please enter the frame number");
      return false;
    } else if (jcdate > 0) {
      this.commonService.error("Please enter the jobcard date");
      return false;
    } else if (remarks > 0) {
      this.commonService.error("Please enter the remarks");
      return false;
    } else {
      return true;
    }
  }

  addKM() {
    if(this.validateKM()==true)
    {
      let KMOj = new DMSKMChangeeDO();
      KMOj.CALL_LOG_ID = Math.floor(Math.pow(10, 10 - 1) + Math.random() * 9 * Math.pow(10, 10 - 1));
      this.KMChangeList.push(KMOj);
    }
  
  }
  
  deleteKM(i: any,item: any)
  {
    
      this.KMChangeList.splice(i, 1);
     
  }
  deleteLock(i: any,item: any)
{
  this.LockRemovalList.splice(i, 1);
     
}

  addLock()
  {
    if(this.validateLock()==true)
    {
      let KMOj = new DMSKMChangeeDO();
      KMOj.CALL_LOG_ID = Math.floor(Math.pow(10, 10 - 1) + Math.random() * 9 * Math.pow(10, 10 - 1));
      this.KMChangeList.push(KMOj);
    }
  }
  getToday() {
    return new Date().toISOString().split('T')[0]
 }
 getMappingList()
 {
   console.log("this.dealerid",this.dealerid);
  this.commonService.getMappingList("dealerid="+ this.dealerid).
  subscribe((resp: any) => {
    if (resp && resp.statusCode == 200) {
      this.APPmappinglist=resp.data;
      console.log("thiss.mapping",this.APPmappinglist);
      //TM-SERVICE
      this.TMList=[];

      this.APPmappinglist.filter(val => {
        //console.log('key[this.DA.da_type]', key[this.DA.da_type]);
        console.log("key",val["Category"]);
        
        if (val["Category"] == "TM-SERVICE") {
          console.log("val",val);
          this.TMList.push(val);
        }
      })
console.log("this.TMList",this.TMList);
    }
  });
}

getCallLogTypelist()
{
  this.commonService.getCallLogType().
  subscribe((resp: any) => {
    if (resp && resp.statusCode == 200) {
      this.CallLogTypeList=resp.data;
    }
  });
}

selectType()
{
 console.log("callLogHeader.CALL_LOG_TYPE_ID",this.callLogHeader.CALL_LOG_TYPE_ID);
 this.callLogHeader.CALL_LOG_TYPE_ID=this.varName;
 if(this.callLogHeader.CALL_LOG_TYPE_ID==1)
 {
   this.isSaleDate=true;
   this.isKM=false;
   this.isLock=false
 }
 else if(this.callLogHeader.CALL_LOG_TYPE_ID==2)
 {
   this.isKM=true;
   this.isLock=false;
   this.isSaleDate=false

 }
 else if(this.callLogHeader.CALL_LOG_TYPE_ID==3)
 {
   this.isLock=true;
   this.isKM=false;
   this.isSaleDate=false;
 }

}
ValidateCall(item: { DMS_CALL_LOG_NO: string; },index: any,type: string)
{
  console.log("type")
  let  calllogno: any = 0;
  if(type=="sale")
  {
    if (this.SaleDateList.length > 0) {
      this.SaleDateList.filter((val: { DMS_CALL_LOG_NO: any; }) => {
        if (this.SaleDateList.indexOf(val) != index)
        {
          if (val.DMS_CALL_LOG_NO == item.DMS_CALL_LOG_NO) {
            calllogno++;
          }
        }
      
      })
    }
  }
  else if(type=="km")
  {
    if (this.KMChangeList.length > 0) {
      this.KMChangeList.filter((val: { DMS_CALL_LOG_NO: any; }) => {
        if (this.KMChangeList.indexOf(val) != index)
        {
          if (val.DMS_CALL_LOG_NO == item.DMS_CALL_LOG_NO) {
            calllogno++;
          }
        }
      
      })
    }
  }
  else if(type=="lock")
  {
    if (this.LockRemovalList.length > 0) {
      this.LockRemovalList.filter((val: { DMS_CALL_LOG_NO: any; }) => {
        if (this.LockRemovalList.indexOf(val) != index)
        {
          if (val.DMS_CALL_LOG_NO == item.DMS_CALL_LOG_NO) {
            calllogno++;
          }
        }
      
      })
    }
  }
  console.log("indx",index);
 
 

   if (calllogno > 0) {
     item.DMS_CALL_LOG_NO="";
    this.commonService.error("Please enter the distinct call log number");
    return false;
  }
  else {
    return true;
  }
}
// getJobCardDetails(item: any, index: any, type: string)
// {

//   let jobcardno: any = 0, calllogno: any = 0;
//   if(type=="sale")
//   {
//     if (this.SaleDateList.length > 0) {
//       this.SaleDateList.filter((val: { JOB_CARD_NO: any; }) => {
//         if (this.SaleDateList.indexOf(val) != index)
      
//         {
//           if (val.JOB_CARD_NO == item.JOB_CARD_NO) {
//             jobcardno++;
//           }
//         }
      
//       })
//     }
//   }
//   else if(type=="km")
//   {
//     if (this.KMChangeList.length > 0) {
//       this.KMChangeList.filter((val: { JOB_CARD_NO: any; }) => {
//         if (this.KMChangeList.indexOf(val) != index)
      
//         {
//           if (val.JOB_CARD_NO == item.JOB_CARD_NO) {
//             jobcardno++;
//           }
//         }
      
//       })
//     }
//   }
//   else if(type=="lock")
//   {
//     if (this.LockRemovalList.length > 0) {
//       this.LockRemovalList.filter((val: { JOB_CARD_NO: any; }) => {
//         if (this.LockRemovalList.indexOf(val) != index)
      
//         {
//           if (val.JOB_CARD_NO == item.JOB_CARD_NO) {
//             jobcardno++;
//           }
//         }
      
//       })
//     }
//   }
  
  
  
//      if (jobcardno > 0) {
//        item.JOB_CARD_NO="";
//       this.commonService.error("Please enter the distinct job card number");
//       return false;
//     }
//     else {
//     // return true;
//       if(item.JOB_CARD_NO)
//       {
//         this.commonService.getJobcardDetails("dealerid="+this.dealerid+"&&branch="+this.branch+"&&jobcardno="+item.JOB_CARD_NO).
//       subscribe((resp: any) => {
//         if (resp && resp.statusCode == 200) {
//          console.log("resp.data",resp.data);
//          if(type=='sale')
//          {
//           item.DMS_SALE_DATE=this.datePipe.transform(resp.data.SALE_DATE,'dd-MM-yyyy');
//          }
//          else if(type=="km"){
//            item.DMS_KM=resp.data.KILOMETERS;
//          }
//          else if(type=="lock")
//          {
//            item.DMS_JOB_CARD_DATE=resp.data.SALE_DATE;
//          }
//           item.FRAME_NUMBER=resp.data.FRAME_NO;
        
//         }
//       });
//       }
//      }

// }

SaveCallLog()
{
  if( this.callLogHeader.CALL_LOG_TYPE_ID==1)
{
  if (this.validate() == true){
    if(this.validateSave(0))
    {
      this.callLogHeader["DEALER_ID"]=this.dealerid;
      this.callLogHeader["BRANCH_ID"]=this.branch
        this.callLogHeader.saleDateChange=new DMSSaleDateDO();
  this.callLogHeader.saleDateChange=this.SaleDateList;
  this.callLogHeader.KMChange=new DMSKMChangeeDO();
  this.callLogHeader.KMChange=this.KMChangeList;
  
  if(this.callLogHeader.saleDateChange)
  {
    for (let index = 0; index < this.callLogHeader.saleDateChange.length; index++) {
      this.callLogHeader.saleDateChange[index].TM_EMPNO = this.tm;
      this.callLogHeader.saleDateChange[index].STATUS="R";
    }
  }
  if(this.callLogHeader.KMChange)
  {
    if(this.callLogHeader.KMChange[0].DMS_CALL_LOG_NO!="")
    {
      for (let index = 0; index < this.callLogHeader.KMChange.length; index++) {
        this.callLogHeader.KMChange[index].TM_EMPNO = this.tm;
        this.callLogHeader.KMChange[index].STATUS="R";
      }
    }
   
  }
 console.log("savecalllo",this.callLogHeader);
 this.commonService.saveDMSCallLog(this.callLogHeader).subscribe((resp: any) => {
  if (resp && resp.statusCode == 200) {
    this.commonService.error("Call log details has been saved successfully");
    this.SaleDateList=[];
  }
 });
    }
  }
  else{
    this.commonService.error("Please enter the one line item");
    return;
  }
}

else if(this.callLogHeader.CALL_LOG_TYPE_ID==2)
{
  if (this.validateKM() == true){
    if(this.validateSave(0))
    {
   this.callLogHeader["DEALER_ID"]=this.dealerid;
    this.callLogHeader["BRANCH_ID"]=this.branch;
    this.callLogHeader.saleDateChange=new DMSSaleDateDO();
    this.callLogHeader.saleDateChange=this.SaleDateList;
    this.callLogHeader.KMChange=new DMSKMChangeeDO();
    this.callLogHeader.KMChange=this.KMChangeList;
    if(this.callLogHeader.saleDateChange)
    {
      for (let index = 0; index < this.callLogHeader.saleDateChange.length; index++) {
        this.callLogHeader.saleDateChange[index].TM_EMPNO = this.tm;
        this.callLogHeader.saleDateChange[index].STATUS="R";
      }
    }
    if(this.callLogHeader.KMChange)
    {
      if(this.callLogHeader.KMChange[0].DMS_CALL_LOG_NO!="")
      {
        for (let index = 0; index < this.callLogHeader.KMChange.length; index++) {
          this.callLogHeader.KMChange[index].TM_EMPNO = this.tm;
          this.callLogHeader.KMChange[index].STATUS="R";
        }
      }
     
    }
   console.log("savecalllo",this.callLogHeader);
   this.commonService.saveDMSCallLog(this.callLogHeader).subscribe((resp: any) => {
    if (resp && resp.statusCode == 200) {
      this.commonService.error("Call log details has been saved successfully");
      this.KMChangeList=[];
    }
   });
    }
  }
  else{
    this.commonService.error("Please enter the one line item");
    return;
  }
}

  

  

}
validateSave(validateCode: number) {
  debugger;
  if (validateCode == 0) {
    this.errorMap = new MapService();
  }
  if (validateCode == 0 || validateCode == 1) {
    if (this.tm== ""||this.tm == null || this.tm == undefined) {
      this.errorMap.put("tmdrpdwn", '');

      this.commonService.error("Please select the TM");

    }
    else {
      this.errorMap.remove("tmdrpdwn");
     
    }
  }
  if (this.errorMap.isEmpty()) {
    return true;
  } else {
    return false;
  }

}
}
