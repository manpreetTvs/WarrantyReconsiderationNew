import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CommonService } from '../../services/common.service';
import { DealerServiceService } from '../../services/dealer-service.service';
import { MapService } from '../../services/map.service';
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

export class SuperQueryDO {
  ID: number = 0;
  SUPER_ID: number = 0;
  ROLE: string = '';
  FROM_EMPNO: string = '';
  FROM_EMPNAME: string = '';
  TO_EMPNO: string = '';
  TO_EMPNAME: string = '';
  REMARKS: string = '';
  CREATED_ON: Date | string = '';
}

export class SuperApprovalDO {
  ID: number = 0;
  DEALER_CODE: string = '';
  DEALER_NAME: string = '';
  TOWN: string = '';
  ORDER_NO: string = '';
  CLAIM_SETTLED_DATE: string = '';
  TOTAL_PARTS: string = '';
  REQUEST_LETTER_DEA_TM_ASM: string = '';
  REQUEST_LETTER_ASM_VP: string = '';
  ASM: string = '';
  ASM_REMARKS: string = '';
  NSM: string = '';
  NSM_REMARKS: string = '';
  GMS: string = '';
  GMS_REMARKS: string = '';
  HO_REMARKS: string = '';
  STATUS: string = '';
  CREATED_ON: any = '';
  ASM_APP_DATE: any = '';
  NSM_APP_DATE: any = '';
  GMS_APP_DATE: any = '';
  HO_APP_DATE: any = '';
  HO: string = '';
  superQuery: SuperQueryDO[] = [];
  FROM_DATE: any = '';
  TO_DATE: any = '';
  empno: string = '';
  role: string = '';
}


@Component({
  standalone: true,
  selector: 'app-super-initiate',
  templateUrl: './super-initiate.component.html',
  styleUrls: ['./super-initiate.component.css'],
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
export class SuperInitiateComponent implements OnInit {
  public dealercode: string = '';
  public dealername: string = '';
  public town: string = '';
  public orderno: string = '';
  public claimsettleddate: string = '';
  public totalparts: string = '';
  public remarks: string = '';
  public nsmSelected: string = '';
  public nsmList: any = [];
  public fileName: string = '';
  public fileName2: string = '';
  public superApprovalInputFields: any = {};
  public empno: string = '';
  public popup: boolean = false;
  public errorMap: any;
  public SuperApproval: any = new SuperApprovalDO();
  @ViewChild('UploadFileInput', { static: false }) uploadFileInput!: ElementRef;
  fileUploadForm!: FormGroup;
  fileInputLabel: string = '';
  fileInputLabel2: string = '';
  public role: string = '';

  constructor(private tmService: TmServiceService, private formBuilder: FormBuilder,
     private dealerService: DealerServiceService,private commonservice:CommonService) { }

  ngOnInit(): void {

    // this.empno = localStorage.getItem("empno") ?? '';
    // this.role = localStorage.getItem("role") ?? '';
   // this.empno = sessionStorage.getItem('empno');
   // this.tmService.fetchNsmList().subscribe((data)=> {
     // this.nsmList = data['response']['recordset'];
   // })
    this.fileUploadForm = this.formBuilder.group({
      uploadedImage: ['']
    });
  }
  ngAfterViewInit(){
    this.empno = localStorage.getItem("empno") ?? '';
    this.role = localStorage.getItem("role") ?? '';
  //   this.empno="12280";
  //  this.role="TM";
  }
  mappingList(dealercode: any)
  {
   this.commonservice.getDealerWiseMapping('dealer_id=' +dealercode+"&&catg=NSM&&empno="+this.empno+"&&role="+this.role).subscribe((resp: any) => {
    if (resp && resp.statusCode == 200) {
      this.nsmList=resp.data;
    }
   });
  }
  onFileSelect1(event: any) {
    const file = event.target.files[0];
    this.fileInputLabel = file.name;
    this.fileUploadForm.get('uploadedImage')?.setValue(file);
    // File Upload
    const formData = new FormData();
    const uploadedImage = this.fileUploadForm.get('uploadedImage')?.value;
    if (uploadedImage) {
      formData.append('uploadedImage', uploadedImage);
    }
    formData.append('agentId', '007');
    this.dealerService.uploadFile(formData).subscribe((response: any) => {
      console.log(response);
      if (response.statusCode === 200) {
      this.uploadFileInput.nativeElement.value = "";
      this.fileInputLabel = '';
      this.fileName = response.uploadedFile.originalname;
      console.log(this.fileName);
      }
    });
  }

  uploadFile(evt: any) {

    console.log(evt.target.files.length);
    this.SuperApproval.REQUEST_LETTER_DEA_TM_ASM = evt.target.files[0].name;
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
    this.commonservice.saveFiles(file).subscribe((resp: any) => {
      if (resp && resp.statusCode == 200) {
        this.commonservice.error("File uploded successfully.");
      }
    });
  }

  uploadFile1(evt: any) {

    console.log(evt.target.files.length);
    this.SuperApproval.REQUEST_LETTER_ASM_VP = evt.target.files[0].name;
    console.log("this.Kaizen.TMOSCheckSheet", this.fileName2);
    let file = [];
    file = evt.target.files;
    this.commonservice.saveFiles(file).subscribe((resp: any) => {
      if (resp && resp.statusCode == 200) {
        this.commonservice.error("TMOSCheckSheet File uploded successfully.");
      }
    });
  }
  onFileSelect2(event: any) {
    const file: File = event.target.files[0];
    this.fileInputLabel2 = file.name;
    this.fileUploadForm.get('uploadedImage')?.setValue(file);
    // File Upload
    const formData2: FormData = new FormData();
    formData2.append('uploadedImage', this.fileUploadForm.get('uploadedImage')?.value);
    formData2.append('agentId', '007');
    this.dealerService.uploadFile(formData2).subscribe((response: any) => {
      console.log(response);
      if (response['statusCode'] === 200) {
        this.uploadFileInput.nativeElement.value = "";
        this.fileInputLabel = '';
        this.fileName2 = response['uploadedFile']['originalname'];
        console.log(this.fileName2);
      }
    });
  }


  approveRequest() {
    if (this.validate(0)) {
      this.SuperApproval.ASM=localStorage.getItem("empno");
     //his.SuperApproval.empno="12280";
      this.SuperApproval.STATUS="C";
      this.SuperApproval.empno=this.empno;
      this.SuperApproval.role=this.role;
    this.commonservice.saveSuperApprovalRequest(this.SuperApproval).subscribe((resp: any) => {
      if (resp && resp.data && resp.statusCode == 200) {
        this.ngOnInit();
        this.commonservice.error("Request successfully saved.Your Request no is :" + resp.data);
       
        
      }
    });
  }
    
    // this.superApprovalInputFields['DEALER_CODE'] = this.dealercode;
    // this.superApprovalInputFields['DEALER_NAME'] = this.dealername;
    // this.superApprovalInputFields['TOWN'] = this.town;
    // this.superApprovalInputFields['ORDER_NO'] = this.orderno;
    // this.superApprovalInputFields['CLAIM_SETTLED_DATE'] = this.claimsettleddate;
    // this.superApprovalInputFields['TOTAL_PARTS'] = this.totalparts;
    // this.superApprovalInputFields['REQUEST_LETTER_DEA_TM_ASM'] = this.fileName;
    // this.superApprovalInputFields['REQUEST_LETTER_ASM_VP'] = this.fileName2;
    // this.superApprovalInputFields['ASM_REMARKS'] = this.remarks;
    // this.superApprovalInputFields['NSM'] = this.nsmSelected;
    // this.superApprovalInputFields['ASM'] = this.empno;
    // this.tmService.insertSuperApprovalData(this.superApprovalInputFields).subscribe((data)=>{
    //   console.log(data);
    //   if(data['status'] === 200){
    //     this.popup = true;
    //   }
    // });
  }

  selectNsm(event: any) {
    this.nsmSelected = event.target.value;
  }

  validate(validateCode: number) {
    debugger;
    if (validateCode == 0) {
      this.errorMap = new MapService();
    }
    if (validateCode == 0 || validateCode == 1) {
      if (this.SuperApproval.DEALER_CODE == null || this.SuperApproval.DEALER_CODE == undefined) {
        this.errorMap.put("dealercode", '');

        this.commonservice.error("Please enter the Dealer code");

      }
      else {
        this.errorMap.remove("dealercode");
        if (this.SuperApproval.DEALER_NAME == "" || this.SuperApproval.DEALER_NAME == null || this.SuperApproval.DEALER_NAME == undefined) {
          this.errorMap.put("dealername", '');
          this.commonservice.error("Please enter the Dealer Name");
        }
        else {
          this.errorMap.remove("dealername");
          if (this.SuperApproval.TOWN== "" || this.SuperApproval.TOWN == null || this.SuperApproval.TOWN == undefined) {
            this.errorMap.put("town", '');
            this.commonservice.error("Please enter the Town");
          }
          else {
            this.errorMap.remove("town");
           
            if (this.SuperApproval.ORDER_NO == "" || this.SuperApproval.ORDER_NO == null || this.SuperApproval.ORDER_NO == undefined) {
              this.errorMap.put("claimsettleddate", '');
              this.commonservice.error("Please select the claim settled date");
            }
            else {
              this.errorMap.remove("claimsettleddate");
              if (this.SuperApproval.TOTAL_PARTS == "" || this.SuperApproval.TOTAL_PARTS == null || this.SuperApproval.TOTAL_PARTS == undefined) {
                this.errorMap.put("totalparts", '');
                this.commonservice.error("Please enter the Total Parts");
              }
              else {
                this.errorMap.remove("totalparts");
                if (this.SuperApproval.ASM_REMARKS == "" || this.SuperApproval.ASM_REMARKS == null || this.SuperApproval.ASM_REMARKS == undefined) {
                  this.errorMap.put("remarks", '');
                  this.commonservice.error("Please enter the remarks");
                }
                else {
                  this.errorMap.remove("remarks");
                  if ( this.SuperApproval.NSM == null || this.SuperApproval.NSM == undefined||this.SuperApproval.NSM == "") {

                    this.errorMap.put("queryto", '');
                    this.commonservice.error("Please select the NSM");

                  }
                  else {
                    this.errorMap.remove("queryto");
                   

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

}
