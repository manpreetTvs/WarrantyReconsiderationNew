import { DatePipe } from '@angular/common';
//import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ConnectableObservable } from 'rxjs/internal/observable/ConnectableObservable';
import { CommonService } from '../services/common.service';
import { DealerServiceService } from '../services/dealer-service.service';
import { EmailTriggerService } from '../services/email-trigger.service';
import { MapService } from '../services/map.service';
import { RequestService } from '../services/request.service';
import { TmServiceService } from '../services/tm-service.service';
import * as $ from 'jquery';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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


export class OrderDetailsDO {
  ID!: number;
  ORDER_NO!: string;
  ORDER_NUMBER!: string;
  CLAIM_SETTLED_DATE?: any;
  DAYS_LEFT_FOR_RECLAIMING!: string;
  PART_NUMBER!: string;
  PART_DESCRIPTION!: string;
  FRAME_NUMBER!: string;
  KMS!: string;
  SALES_DATE?: any;
  REPAIR_DATE?: any;
  MODEL!: string;
  NDP_RATE!: string;
  DEALER_CODE!: string;
  DEALER_NAME!: string;
  REASON_FOR_REJECTION!: string;
  JUSTIFICATION!: string;
  CITY!: string;
  vSTATUS!: string;
  CREATED_ON?: any;
  FILENAME!: string;
  PENDING_WITH!: string;
  TM!: string;
  TM_REMARKS!: string;
  AM!: string;
  AM_REMARKS!: string;
  CREDITED_DATE!: string;
  empno!: string;
  role!: string;
}

@Component({
  standalone: true,
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css'],
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
export class CreateRequestComponent implements OnInit {

  public isDisabled: boolean = true;
  public insertionData: any = {};
  public orderno!: string;
  public claimsettleddate?: any;
  public daysleft!: number;
  public partno!: string;
  public partdesc!: string;
  public frameno!: string;
  public kms!: string;
  public salesdate!: string;
  public repairdate!: string;
  public model!: string;
  public ndprate!: string;
  public dealercode!: string;
  public dealername!: string;
  public reasonforrejection!: string;
  public justification!: string;
  public city!: string;
  public fileName!: string;
  public popup: boolean = false;
  public tmList: any = [];
  public tmSelected!: string;
  public claimdate!: Date;
  public dateDiff!: number;
  public orderDetails: any;
  public selectedIndexOld: any = [];
  public selectedIndexNew: any = [];
  public popupMsg!: string;
  public emailData: any = {};
  public myDate!: Date;
  public dealerCode!: string;
  public OrderDetails:any=new OrderDetailsDO();
  public errorMap: any;

  @ViewChild('UploadFileInput', { static: false }) uploadFileInput!: ElementRef;
  fileUploadForm!: FormGroup;
  fileInputLabel!: string;
  pendingList: any;
  empno!: string;
  role!: string;

  constructor(private dealerService: DealerServiceService, private formBuilder: FormBuilder, 
    private emailService: EmailTriggerService, private tmService: TmServiceService, 
    private datePipe: DatePipe,private commonService:CommonService,
    public request:RequestService,private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params=>{
      console.log("params",params);
      this.empno=params['empno']; // manpreet
      this.role=params['role'];
      this.checkDealer();
      // this.OrderDetails.DEALER_CODE=params.empno;
      // this.getToken();
      // this.getEmployeeDetails();
     
   
    
    })
   
    // this.dealerService.fetchTmList(this.dealercode).subscribe((data)=> {
    //   // console.log(data);
    //   this.tmList = data['response']['recordset'];
    //   // console.log(this.tmList);
    // })
    this.fileUploadForm = this.formBuilder.group({
      uploadedImage: ['']
    });
    
  }
  // ngAfterViewInit(){
  //   $('.dropdown-content a').click(function(){
  //     $('.dropdown-content a').removeClass('active');
  //     //$(this).addClass('active');
  //     });
  // }
  getToken(){
    this.empno="12280";
    this.role="TM";
    let obj={
      "empno":this.empno,
      "role": this.role
      
}
console.log("obj",obj);

    this.commonService.token(obj,'Setting/tokenGeneration').subscribe((resp: any) => {
      if(resp){
        console.log("resp",resp);
        sessionStorage.setItem('authToken',resp.data);
        console.log("resp.access_token",resp.data);
      }
    });
  }
  selectTm(event: any) {
    this.tmSelected = event.target.value;
    // console.log(this.tmSelected.replace(/\s/g, ""));
  }
  checkDealer()
  {
    this.commonService.getValidDealer('empno=' + this.empno+"&&role="+this.role).
    subscribe((resp: any) => {
      if (resp && resp.statusCode == 200) {
        console.log("checkdealer",resp.data);
        if(resp.data.DEALER_ID>0)
        {
          this.OrderDetails.DEALER_CODE=resp.data.DEALER_ID;
          this.dealercode = "dealer";
          //this.empno="dealer"
          this.role="dealer";
          this.empno=resp.data.DEALER_ID;
          this.role=resp.data.role;
          localStorage.setItem('empno', this.empno);
          localStorage.setItem('role', this.role);
          this.getToken();
          this.getEmployeeDetails();
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
  close1()
  {

  }
close()
{
  //window.open('','_parent',''); 
  
  //window.open('','_self').close();

 // window.location.href="https://www.google.com";
}
  submitOrder() {
    console.log(this.orderno);
    // this.dealerService.fetchSapData().subscribe((data)=>{
    //   console.log("Inside API");
    //   console.log(data);
    // });
    this.dealerService.fetchSapOrderDetails(this.orderno).subscribe((data: any)=> {
      this.orderDetails = data;
      console.log(this.orderDetails);
      let currentDate = new Date();
      this.claimdate = new Date(data[0]['CLAIM_SETTLED_DATE']);
      this.dateDiff = Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(this.claimdate.getFullYear(), this.claimdate.getMonth(), this.claimdate.getDate()) ) /(1000 * 60 * 60 * 24));
      console.log(this.dateDiff);
      if(this.dateDiff > 30 ) {
        this.isDisabled = false;
        this.claimsettleddate = data[0]['CLAIM_SETTLED_DATE'];
        this.OrderDetails.DAYS_LEFT_FOR_RECLAIMING = this.dateDiff;
      }
    })
  }
  getSAPOrderDetails()
  {
   // this.clear();
   //this.OrderDetails.CLAIM_SETTLED_DATE="2021-09-30";
   if(this.validateSearch(0))
   {
    this.commonService.getSAPOrderDetails('orderno='+this.OrderDetails.ORDER_NO+"&&empno="+this.empno+"&&role="+this.role).
    subscribe((resp: any) => {
      if (resp && resp.statusCode == 200) {
       
        this.isDisabled = false;
        this.orderDetails = resp.data;
      //  this.OrderDetails=resp.data;
        if(this.OrderDetails.DEALER_CODE==resp.data[0].DEALER_CODE)
        {
          this.OrderDetails.CLAIM_SETTLED_DATE = resp.data[0].CLAIM_SETTLED_DATE;
          let string=resp.data[0].CLAIM_SETTLED_DATE;
          console.log("string",string);
         // this.OrderDetails.CLAIM_SETTLED_DATE  = string.toISOString().split('T')[0];
         // this.claimsettleddate= this.datePipe.transform( this.claimsettleddate,"dd-MM-yyyy");
          console.log(" this.orderDetails", this.OrderDetails);
          console.log(" this.claimdates",  this.orderDetails.CLAIM_SETTLED_DATE );
          console.log("drgr", this.datePipe.transform( this.claimsettleddate,"dd-MM-yyyy"));
          let currentDate = new Date();
          this.claimdate = new Date( this.OrderDetails.CLAIM_SETTLED_DATE);
          this.dateDiff = Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(this.claimdate.getFullYear(), this.claimdate.getMonth(), this.claimdate.getDate()) ) /(1000 * 60 * 60 * 24));
          this.datePipe.transform( this.claimsettleddate,"dd-MM-yyyy");
          this.OrderDetails.DAYS_LEFT_FOR_RECLAIMING = this.dateDiff;
          console.log(" this.OrderDetails.DAYS_LEFT_FOR_RECLAIMING ", this.OrderDetails.DAYS_LEFT_FOR_RECLAIMING );
          this.OrderDetails.ORDER_NO=resp.data[0].ORDER_NO;
          this.mappingList(this.OrderDetails.DEALER_CODE);
          if(this.dateDiff > 30 ) {
            this.isDisabled = false;
            this.OrderDetails.CLAIM_SETTLED_DATE = resp.data[0].CLAIM_SETTLED_DATE;
           // this.claimsettleddate = data[0]['CLAIM_SETTLED_DATE'];
            this.OrderDetails.DAYS_LEFT_FOR_RECLAIMING = this.dateDiff;
          }
        }
        else{
          Swal.fire({
            title: 'Order number not mapped against the dealer code',
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
               this.close1();
               
              //window.close();
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
          })
        }
       
      }
    });
   }
     
    
  }
  clear()
  {
    // this.claimsettleddate="";
    // this.frameno="";
    // this.partno="";
    // this.partdesc="";
    // this.kms="";
    // this.salesdate="";
    // this.repairdate="";
    // this.model="";
    // this.ndprate="";
    this.OrderDetails=new OrderDetailsDO();
  }

  validateFrameNo(e: any){
    this.selectedIndexNew = [];
    for (let i = 0; i < this.orderDetails.length; i++) {
      if(this.orderDetails[i]['FRAME_NO'] === e.target.value){
        this.selectedIndexNew.push(i);
      }
    }
    if(this.selectedIndexNew.length <= 0) {
      this.popup = true;
      this.popupMsg = "Frame Number not matching the rejected RSO line item";
      this.OrderDetails.FRAME_NUMBER="";
    }
    console.log(this.selectedIndexNew);
    this.selectedIndexOld = this.selectedIndexNew;
  }

  validatePartNo(e: { target: { value: any; }; }) {
    this.selectedIndexNew = [];
    for(let i of this.selectedIndexOld) {
      if(e.target.value === this.orderDetails[i]['MATERIAL_NO']) {
        this.selectedIndexNew.push(i);
        console.log(" this.selectedIndexNew", this.selectedIndexNew);
        this.OrderDetails.PART_DESCRIPTION=this.orderDetails[i].MATERIAL_DESC;
        this.OrderDetails.MODEL=this.orderDetails[i].MODEL;
        this.OrderDetails.NDP_RATE=this.orderDetails[i].NDP_RATE;
        this.OrderDetails.REASON_FOR_REJECTION=this.orderDetails[i].REJECTION_REASON;


      }
    }
    if(this.selectedIndexNew.length <= 0) {
      this.popup = true;
      this.popupMsg = "Part Number not matching the rejected RSO line item";
      this.OrderDetails.MATERIAL_NO="";
    }
    console.log(this.selectedIndexNew);
    this.selectedIndexOld = this.selectedIndexNew;
  }

  validate(e: Event, field: string): void {
    this.selectedIndexNew = [];
    const target = e.target as HTMLInputElement;
    for(let i of this.selectedIndexOld) {
      if(field === 'SALES_DATE' || field === 'REPAIR_DATE') {
        let input_date = this.datePipe.transform(target.value, 'yyyyMMdd');
        debugger;
        if(field === 'SALES_DATE') {
          if(this.OrderDetails.SALES_DATE == this.orderDetails[i][field]) {
            this.selectedIndexNew.push(i);
          }
        } else if(field === 'REPAIR_DATE') {
          if(this.OrderDetails.REPAIR_DATE == this.orderDetails[i][field]) {
            this.selectedIndexNew.push(i);
          }
        }
      } else {
        if(target.value == this.orderDetails[i][field]) {
          this.selectedIndexNew.push(i);
        }
        if(field === 'DEALER_CODE') {
          // Additional logic for DEALER_CODE if needed
        }
      }
    }
    if(this.selectedIndexNew.length <= 0) {
      this.popup = true;
      this.popupMsg = field + " not matching the rejected RSO line item";
      if(field === 'SALES_DATE') {
        this.OrderDetails.SALES_DATE = "";
      } else if(field === 'REPAIR_DATE') {
        this.OrderDetails.REPAIR_DATE = "";
      } else if(field === 'MODEL') {
        this.OrderDetails.MODEL = "";
      } else if(field === 'NDP_RATE') {
        this.OrderDetails.NDP_RATE = "";
      } else if(field === 'DEALER_CODE') {
        this.OrderDetails.DEALER_CODE = "";
      } else if(field === 'DEALER_NAME') {
        this.OrderDetails.DEALER_NAME = "";
      } else if(field === 'REJECTION_REASON') {
        this.OrderDetails.REJECTION_REASON = "";
      }
    }
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file: File = input.files[0];
      this.fileInputLabel = file.name;
      this.fileUploadForm.get('uploadedImage')?.setValue(file);
    }
  }
  saveorderDetails()
  {
    
    if(this.validateSave(0))
    
    {
      this.OrderDetails.STATUS="C";
      this.OrderDetails.ORDER_NUMBER= this.OrderDetails.ORDER_NO;
      this.OrderDetails.empno=this.empno;
      this.OrderDetails.role=this.role;
      console.log("this.OrderDetails",this.OrderDetails);
      this.commonService.saveOrderProcess(this.OrderDetails).subscribe((resp: any) => {
        if (resp && resp.statusCode == 200) {
         //  this.superpending = resp.data;
        
         //this.displayDetailSec = false;
         if(resp.data>0)
         {
          this.commonService.error("Request has been raised successfully.");
          this.clear();
         }
         else if(resp.data==-1)
         {
          {
            this.commonService.error("Order details already available in the portal.");
            this.clear();
           }
         }
        
         
        }
      });
    }
  }
  
  validateSave(validateCode: number) {
    debugger;
    if (validateCode == 0) {
      this.errorMap = new MapService();
    }
    if (validateCode == 0 || validateCode == 1) {
      if (this.OrderDetails.CLAIM_SETTLED_DATE == ""||this.OrderDetails.CLAIM_SETTLED_DATE == null || this.OrderDetails.CLAIM_SETTLED_DATE == undefined) {
        this.errorMap.put("claimsettleddate", '');

        this.commonService.error("Please select the Claim Setteled Date");

      }
      else {
        this.errorMap.remove("claimsettleddate");
        if (this.OrderDetails.FRAME_NUMBER == "" || this.OrderDetails.FRAME_NUMBER == null ||
         this.OrderDetails.FRAME_NUMBER == undefined) {
          this.errorMap.put("frameno", '');
          this.commonService.error("Please enter the Frame number");
        }
        else {
          this.errorMap.remove("frameno");
          if (this.OrderDetails.PART_NUMBER== "" || this.OrderDetails.PART_NUMBER == null 
          || this.OrderDetails.PART_NUMBER == undefined) {
            this.errorMap.put("partno", '');
            this.commonService.error("Please enter the partno");
          }
          else {
            this.errorMap.remove("partno");
           
            if (this.OrderDetails.PART_DESCRIPTION == "" || this.OrderDetails.PART_DESCRIPTION == null 
            || this.OrderDetails.PART_DESCRIPTION == undefined) {
              this.errorMap.put("partdesc", '');
              this.commonService.error("Please enter the partdesc");
            }
            else {
              this.errorMap.remove("partdesc");
              if (this.OrderDetails.KMS == "" || this.OrderDetails.KMS == null ||
               this.OrderDetails.KMS == undefined) {
                this.errorMap.put("kms", '');
                this.commonService.error("Please enter the kms");
              }
              else {
                this.errorMap.remove("kms");
                if (this.OrderDetails.SALES_DATE == "" || this.OrderDetails.SALES_DATE == null || 
                this.OrderDetails.SALES_DATE == undefined) {
                  this.errorMap.put("salesdate", '');
                  this.commonService.error("Please select the salesdate");
                }
                else {
                  this.errorMap.remove("salesdate");
                  if ( this.OrderDetails.REPAIR_DATE == null || this.OrderDetails.REPAIR_DATE == undefined||
                    this.OrderDetails.REPAIR_DATE == "") {

                    this.errorMap.put("repairdate", '');
                    this.commonService.error("Please select the repairdate");

                  }
                  else {
                    this.errorMap.remove("repairdate");
                    if ( this.OrderDetails.MODEL == null || this.OrderDetails.MODEL == undefined||
                      this.OrderDetails.MODEL == "") {
  
                      this.errorMap.put("model", '');
                      this.commonService.error("Please enter the model");
  
                    }
                    else {
                      this.errorMap.remove("model");
                      if ( this.OrderDetails.NDP_RATE == null || this.OrderDetails.NDP_RATE == undefined||
                        this.OrderDetails.NDP_RATE == "") {
    
                        this.errorMap.put("ndprate", '');
                        this.commonService.error("Please enter the ndprate");
    
                      }
                      else {
                        this.errorMap.remove("ndprate");
                        if ( this.OrderDetails.DEALER_CODE == null || this.OrderDetails.DEALER_CODE == undefined||
                          this.OrderDetails.DEALER_CODE == "") {
      
                          this.errorMap.put("dealercode", '');
                          this.commonService.error("Please enter the dealercode");
      
                        }
                        else {
                          this.errorMap.remove("dealercode");
                          if ( this.OrderDetails.DEALER_NAME == null || this.OrderDetails.DEALER_NAME == undefined||
                            this.OrderDetails.DEALER_NAME == "") {
        
                            this.errorMap.put("dealername", '');
                            this.commonService.error("Please enter the dealername");
        
                          }
                          else {
                            this.errorMap.remove("dealername");
                            if ( this.OrderDetails.TM == null || this.OrderDetails.TM == undefined||
                              this.OrderDetails.TM == "") {
          
                              this.errorMap.put("tmdrpdwn", '');
                              this.commonService.error("Please select the TM");
          
                            }
                            else {
                              this.errorMap.remove("tmdrpdwn");
                             
          
                            }
        
                          }
      
                        }
    
                      }
  
  
                    }

                  }
                }
              }
            }
          }
        }
      }
    }
    if (this.errorMap.isEmpty()) {
      return true;
    } else {
      return false;
    }

  }
  uploadFile(evt: any) {

    console.log(evt.target.files.length);
    this.OrderDetails.FILENAME = evt.target.files[0].name;
    console.log(evt.target.files.length);



    let fileArr: any = [];
    for (let i = 0; i <= evt.target.files.length - 1; i++) {
      fileArr.push(
        {
          DOCUMENT_NAME: evt.target.files[i].name
         

        }
      )
    }

    //this.file.push(fileArr);


    console.log("this.idea.DOCUMENT_NAME", this.fileName);
    let file = [];
    file = evt.target.files;
    this.commonService.saveFiles(file).subscribe((resp: any) => {
      if (resp && resp.statusCode == 200) {
        this.commonService.error("File uploded successfully.");
      }
    });
  }
  

  mappingList(dealercode: string): void {
    this.commonService.getDealerWiseMapping('dealer_id=' + dealercode + "&&catg=TM&&empno=" + this.empno + "&&role=" + this.role).subscribe((resp: any) => {
      if (resp && resp.statusCode == 200) {
        this.tmList = resp.data;
        console.log(" this.tmList", resp.data);
      }
    });
  }
  insertOrderDetails() {
    const formData = new FormData();
    this.myDate = new Date();
    const uploadedImage = this.fileUploadForm.get('uploadedImage')?.value;
    if (uploadedImage) {
      formData.append('uploadedImage', uploadedImage);
    }
    formData.append('agentId', '007');

    this.dealerService.uploadFile(formData).subscribe((response: any) => {
        // console.log(response);
        if (response['statusCode'] === 200) {
          // Reset the file input
          this.uploadFileInput.nativeElement.value = "";
          this.fileInputLabel = '';
          this.fileName = response['uploadedFile']['originalname'];
          // console.log(this.fileName);
          this.insertionData['ORDER_NUMBER'] = this.orderno;
          this.insertionData['CLAIM_SETTLED_DATE'] = this.claimsettleddate;
          this.insertionData['DAYS_LEFT_FOR_RECLAIMING'] = this.daysleft;
          this.insertionData['PART_NUMBER'] = this.partno;
          this.insertionData['PART_DESCRIPTION'] = this.partdesc;
          this.insertionData['FRAME_NUMBER'] = this.frameno;
          this.insertionData['KMS'] = this.kms;
          this.insertionData['SALES_DATE'] = this.salesdate;
          this.insertionData['REPAIR_DATE'] = this.repairdate;
          this.insertionData['MODEL'] = this.model;
          this.insertionData['NDP_RATE'] = this.ndprate;
          this.insertionData['DEALER_CODE'] = this.dealercode;
          this.insertionData['DEALER_NAME'] = this.dealername;
          this.insertionData['REASON_FOR_REJECTION'] = this.reasonforrejection;
          this.insertionData['JUSTIFICATION'] = this.justification;
          this.insertionData['CITY'] = this.city;
          // console.log("Here is the", this.fileName);
          this.insertionData['FILENAME'] = this.fileName;
          this.insertionData['TM'] = this.tmSelected;

          // console.log("Button is clicked to submit the data");
          // console.log(this.insertionData);
          // for(let item of this.orderDetails) {
          //   if(this.orderDetails['ORDER_NUMBER'] === this.orderno && this.orderDetails['PART_NUMBER'] === this.partno && this.orderDetails['PART_DESCRIPTION'] === this.partdesc && this.orderDetails['FRAME_NUMBER'] === this.frameno 
          //   && this.orderDetails['KMS'] === this.kms && this.orderDetails['SALES_DATE'] === this.salesdate && this.orderDetails['REPAIR_DATE'] === this.repairdate &&
          //   this.orderDetails['MODEL'] === this.model && this.orderDetails['NDP_RATE'] === this.ndprate && this.orderDetails['DEALER_CODE'] === this.dealercode &&
          //   this.orderDetails['DEALER_NAME'] === this.dealername) {
              this.dealerService.insertOrderDetails(this.insertionData)
              .subscribe((data) => {
                  this.popup = true;
                  this.popupMsg = "Your request is submitted successfully";
                  console.log("Data inserted successsfully");
                  this.tmService.fetchEmpDetails(this.tmSelected).subscribe((data: any)=> {
                    console.log(data.response.recordset[0]);
                    this.emailData['To'] = data['response']['recordset'][0]['email_id'];
                    this.emailData['DealerCode'] = this.dealercode;
                    this.emailData['DealerName'] = this.dealername;
                    this.emailData['Town'] = this.city;
                    this.emailData['CreatedOn'] = this.datePipe.transform(this.myDate, 'dd-MM-yyyy');
                    this.emailData['OrdreNo'] = this.orderno;
                    this.emailData['MaterialNo'] = this.partno;
                    this.emailData['MaterialDesc'] = this.partdesc;
                    this.emailData['FrameNo'] = this.frameno;
                    this.emailData['PendingWith']= 'TM';
                    this.emailData['Status'] = 'Pending for Approval';
                    this.emailData['PendingFrom'] = this.datePipe.transform(this.myDate, 'dd-MM-yyyy');
                    this.emailService.sendMail(this.emailData).subscribe((data)=> {
                      console.log("Mail Sent Successfully");
                    })
                  })
              });
          //   }
          //   else {
          //     console.log("validation Failed");
          //   }
          // }
        }
      }, er => {
        console.log(er);
        // alert(er.error.error);
      });

    
  }
  getEmployeeDetails()
  {
    this.commonService.getEmployeeDetails('empno=' + this.empno+"&&role="+this.role).
    subscribe((resp: any) => {
      if (resp && resp.statusCode == 200) {
        //this.pendingList = resp.data;
        console.log("Empdetails", this.empno);
        console.log("Empdetails", this.role);

        console.log("Empdetails",resp.data);
        if(resp.data!=null){}
        {
          localStorage.setItem('empno',resp.data.EMPNO.trim());
          localStorage.setItem('empname',resp.data.EMPNAME);
          localStorage.setItem('dept',resp.data.DEPT);
          localStorage.setItem('section',resp.data.SECT);
          localStorage.setItem('sect',resp.data.SECTIONDESC);
          localStorage.setItem('plant',resp.data.PLANT);
          localStorage.setItem('cccode',resp.data.CC_CODE);
          localStorage.setItem('email',resp.data.EMAIL_ID);
        
        }
       localStorage.setItem('role',"dealer");
       
      }
    });
  }

  validateSearch(validateCode: number) {
    debugger;
    if (validateCode == 0) {
      this.errorMap = new MapService();
    }
    if (validateCode == 0 || validateCode == 1) {
      if (this.OrderDetails.ORDER_NO == null || this.OrderDetails.ORDER_NO == undefined||this.OrderDetails.ORDER_NO == "") {
        this.errorMap.put("orderno", '');

        this.commonService.error("Please enter the Order Number");

      }
      else {
        this.errorMap.remove("orderno");
       
      }
    }
    if (this.errorMap.isEmpty()) {
      return true;
    } else {
      return false;
    }

  }

//   SAPOrder()
//   {
//  var http = require('http');
//  var express = require('express')
//  var request = require('request')
//  var app = express()
//  var cors = require('cors');
//  let base64 = require('base-64');
//  var url = "http://thshdevsrvr.hosur.tvsmotor.co.in:8000/sap/bc/zsd_war_rej_rec/war_rej_recon?sap-client=400";




// this.request.getSAPReq('/sapcall/:orderno', cors(), function (req, res, next) {
//   var orderno = req.params.orderno;
//     console.log(orderno);
//     var csrfToken;
//     var cookie;
    
//     request({
//               url:url, // or xml
//               headers:{
//                 'Authorization':'Basic ' + base64.encode('S.MANIVEL' + ":" + 'Manidev5%'),
//                 'Content-Type':'application/json',
//                 'x-csrf-token':'Fetch' // get CSRF Token for post or update
//               }
//     }, function (error, response, body) {
//       if (!error && response.statusCode == 200) {
          
//           // Get token
//           csrfToken = response.headers['x-csrf-token'];
//           cookie = response.headers['set-cookie'];
//           console.log("response.headers : ", response.headers);
//           console.log("csrfToken : ", csrfToken)
          
//           // New entity
//           var entity = {};
          
//           // Fill entity
//            entity.ORDER_NO = '63174335';
//           //entity.ORDER_NO = orderno;
//           console.log(entity);
          
//           // Do post
//           request({
//                   url:url,
//                   method: 'POST',
//                   headers:{
//                     'Authorization':'Basic ' + base64.encode('S.MANIVEL' + ":" + 'Manidev5%'),
//                     'Content-Type':'application/json',
//                     'x-csrf-token':csrfToken, // set CSRF Token for post or update
//                     'Cookie': cookie
//                   },
//                   json: entity
//           }, function(error, response, body){
//             console.error('error:', error); // Print the error if one occurred
//             console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//             console.log('body:', body);
//             res.send(response.body);
//               // handle response
              
//           });

//       }
//       console.log("Out")
//     });
    
// })


//   }


}
