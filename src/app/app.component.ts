import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { MatTableModule } from '@angular/material/table'
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {  } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CommonModule, DatePipe } from '@angular/common';
import { ApprovalComponent } from './tm_screen/approval/approval.component';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss', // This is a standalone component
  imports: [
    HttpClientModule,
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatTabsModule,
    MatIconModule, 
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatFormFieldModule,
    MatTabsModule,
    //TabsModule.forRoot(),
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    //SharedModule,
    NgxDatatableModule,
    ApprovalComponent,
    RouterOutlet,
    DatePipe,
    RouterModule
  ],
  providers: [
    DatePipe
  ]
})
export class AppComponent {
  title = 'WarrantyReconsideration';
}
