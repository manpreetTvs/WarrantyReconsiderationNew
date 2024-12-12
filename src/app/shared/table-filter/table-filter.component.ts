import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {CommonService} from '../../services/common.service';
// import { moment } from 'ngx-bootstrap/chronos/test/chain';
import moment from 'moment';


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
  selector: 'app-filter-input',
  template: `
  <div style='display: flex;flex-direction: column;'>
            <div (click)='sort()'>
              <span class='datatable-header-cell-label'>{{name}}</span>
              <span class='sort-btn datatable-icon-up' *ngIf="sortType === 'desc'"></span>
              <span class='sort-btn datatable-icon-down' *ngIf="sortType === 'asc'"></span>
            </div>
            <input type='text' placeholder='search' [(ngModel)]='modelVal' [OnlyNumber]="numberOnly == true?true:false" (keyup)='filterByNames($any($event.target).value)'>
          </div>
  `,
  styles: [`@media (min-width: 1200px) {
    input{margin: 8px 0px;}
  }`],
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

export class FilterInputComponent implements OnInit {
  public lang: any;
  @Input() name: string | undefined; // manpreet
  @Input() modelVal: any;
  @Input() sortType: string | undefined;
  @Input() numberOnly: boolean | undefined;
  @Output() sortEvent = new EventEmitter<any>();
  @Output() changeEvent = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
    
  }
  sort() {
    this.sortEvent.emit();
  }
  filterByNames(value: Event) {
    this.changeEvent.emit(value);
  }
}

@Component({
  standalone: true,
  selector: 'app-filter-date',
  template: `
  <div style='display: flex;flex-direction: column;'>
            <div (click)='sort()'>
              <span class='datatable-header-cell-label'>{{name}}</span>
              <span class='sort-btn datatable-icon-up' *ngIf="sortType === 'desc'"></span>
              <span class='sort-btn datatable-icon-down' *ngIf="sortType === 'asc'"></span>
            </div>
            <div class='date'>
            <p-calendar showButtonBar='true' (onClearClick) = 'selectDate()' 
            (onSelect)='selectDate()' appendTo='body' class='searchDatepicker jc-search'
            [(ngModel)]='modelVal' readonlyInput='true'
            name='Date' [showIcon]='true' dateFormat='dd/mm/yy'
            placeholder='selectDate'
                        [monthNavigator]='true' [yearNavigator]='true' yearRange='2000:2030'>
            </p-calendar>
            </div>
          </div>
  `,
  styles: [`@media (min-width: 1200px) {p-calendar{    
    margin: 8px 0px;}.date{ position:relative;display:flex;  } 
  }`]
})
export class FilterDateComponent implements OnInit {
  public lang: any;
  @Input() name: string | undefined; // manpreet
  @Input() sortType: string = ''; // manpreet
  @Input() modelVal: string = '';
  @Output() sortEvent = new EventEmitter<any>();
  @Output() changeEvent = new EventEmitter<any>();
  public isShowClose = false;
  constructor() { }

  ngOnInit() {
  
  }
  sort() {
    this.sortEvent.emit();
  }
  selectDate() {
    if (this.modelVal) {
      this.changeEvent.emit(moment(this.modelVal).format('YYYY-MM-DD'));
    } else {
      this.changeEvent.emit('');
    }
  }
}

// import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-filter-select',
  template: `
  <div style='display: flex;flex-direction: column;'>
            <div (click)='sort()'>
              <span class='datatable-header-cell-label'>{{name}}</span>
              <span class='sort-btn datatable-icon-up' *ngIf="sortType === 'desc'"></span>
              <span class='sort-btn datatable-icon-down' *ngIf="sortType === 'asc'"></span>
            </div>
            <select class='form-control' [(ngModel)]='modelVal' (change)='changeSelect(modelVal)'>
            <option value=''>Select</option>
            <option *ngFor='let item of items' value='{{item.value}}'>{{item.name}}</option>
          </select>
          </div>
  `,
  styles: ['@media (min-width: 1200px) {select{    margin: 8px 0px;}}'],
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
export class FilterSelectComponent implements OnInit {

  @Input() name!: string;
  @Input() items: any = [];
  @Input() sortType!: string;
  @Input() modelVal: any;
  @Output() sortEvent = new EventEmitter<any>();
  @Output() changeEvent = new EventEmitter<any>();
  lang: any;
  constructor() { }

  ngOnInit() {
    
  }
  sort() {
    this.sortEvent.emit();
  }
  changeSelect(value: string) {
    if (value === 'Select') {
      this.changeEvent.emit('');
    } else {
      if(this.modelVal && isNaN(parseInt(this.modelVal))){
      this.changeEvent.emit(this.modelVal ? this.modelVal : '');
      }else{
        this.changeEvent.emit(this.modelVal ? parseInt(this.modelVal) : '');
      }
    }
  }
}
