import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ApproverLoginComponent } from './approver-login/approver-login.component';
import { AdminLayoutComponent } from './core/admin-layout/admin-layout.component';
import { CreateRequestComponent } from './create-request/create-request.component';
import { DealerQueryComponent } from './dealer-query/dealer-query.component';
import { DealerReportComponent } from './dealer-report/dealer-report.component';
import { DmsApprovalComponent } from './DMS_Call_Log_Workflow/dms-approval/dms-approval.component';
import { DMSCallLogCreationComponent } from './DMS_Call_Log_Workflow/dms-call-log-creation/dms-call-log-creation.component';
import { DMSDealerReportComponent } from './DMS_Call_Log_Workflow/dms-dealer-report/dms-dealer-report.component';
import { DmsMenuComponent } from './DMS_Call_Log_Workflow/dms-menu/dms-menu.component';
import { FrameCheckComponent } from './frame-check/frame-check.component';
import { HoComponent } from './hoScreen/ho/ho.component';
import { OrderReportComponent } from './order-report/order-report.component';
import { ApprovalComponent } from './tm_screen/approval/approval.component';
import { PendingApprovalComponent } from './tm_screen/pending-approval/pending-approval.component';
import { SuperInitiateComponent } from './tm_screen/super-initiate/super-initiate.component';
import { SuperPendingApprovalComponent } from './tm_screen/super-pending-approval/super-pending-approval.component';
import { SuperPendingQueryComponent } from './tm_screen/super-pending-query/super-pending-query.component';
import { SuperReportComponent } from './tm_screen/super-report/super-report.component';

export const routes: Routes = [
    { path: 'dealerScreen', component: CreateRequestComponent },
   // { path: 'dealerScreen/:dealerCode/:dealerName', component: CreateRequestComponent },
   // { path: 'approverScreen/:empno/:empname/:role', component: ApprovalComponent },
    { path: 'approverScreen', component: ApprovalComponent },
    { path: '', component: ApproverLoginComponent },
    { path: 'login', component: ApproverLoginComponent },
    { path: 'hoScreen', component: HoComponent },
    {path:'Super-initiative',component:SuperInitiateComponent},
    {path:'Super-approval',component:SuperPendingApprovalComponent},
    {path:'Super-query',component:SuperPendingQueryComponent},
    {path:'Super-report',component:SuperReportComponent},
    {path:'Approval',component:PendingApprovalComponent},
    {path:'dealerReport',component:DealerReportComponent},
    {path:'dealerquery',component:DealerQueryComponent},
    {path:'order-report',component:OrderReportComponent},
    {path:'admin',component:AdminLayoutComponent},
    {path:'DMS',component:DMSCallLogCreationComponent},
    {path:'DMS-report',component:DMSDealerReportComponent},
    {path:'DMS-approval',component:DmsApprovalComponent},
    {path:'DMS-Menu',component:DmsMenuComponent},
    {path:'Frame-check',component:FrameCheckComponent}
  ];

// export const routes: Routes = [
//   { path: 'dealerScreen', loadComponent: () => import('./create-request/create-request.component').then(m => m.CreateRequestComponent) },
//   { path: 'approverScreen', loadComponent: () => import('./tm_screen/approval/approval.component').then(m => m.ApprovalComponent) },
//   { path: '', loadComponent: () => import('./approver-login/approver-login.component').then(m => m.ApproverLoginComponent) },
//   { path: 'login', loadComponent: () => import('./approver-login/approver-login.component').then(m => m.ApproverLoginComponent) },
//   { path: 'hoScreen', loadComponent: () => import('./hoScreen/ho/ho.component').then(m => m.HoComponent) },
//   { path: 'Super-initiative', loadComponent: () => import('./tm_screen/super-initiate/super-initiate.component').then(m => m.SuperInitiateComponent) },
//   { path: 'Super-approval', loadComponent: () => import('./tm_screen/super-pending-approval/super-pending-approval.component').then(m => m.SuperPendingApprovalComponent) },
//   { path: 'Super-query', loadComponent: () => import('./tm_screen/super-pending-query/super-pending-query.component').then(m => m.SuperPendingQueryComponent) },
//   { path: 'Super-report', loadComponent: () => import('./tm_screen/super-report/super-report.component').then(m => m.SuperReportComponent) },
//   { path: 'Approval', loadComponent: () => import('./tm_screen/pending-approval/pending-approval.component').then(m => m.PendingApprovalComponent) },
//   { path: 'dealerReport', loadComponent: () => import('./dealer-report/dealer-report.component').then(m => m.DealerReportComponent) },
//   { path: 'dealerquery', loadComponent: () => import('./dealer-query/dealer-query.component').then(m => m.DealerQueryComponent) },
//   { path: 'order-report', loadComponent: () => import('./order-report/order-report.component').then(m => m.OrderReportComponent) },
//   { path: 'admin', loadComponent: () => import('./core/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent) },
//   { path: 'DMS', loadComponent: () => import('./DMS_Call_Log_Workflow/dms-call-log-creation/dms-call-log-creation.component').then(m => m.DMSCallLogCreationComponent) },
//   { path: 'DMS-report', loadComponent: () => import('./DMS_Call_Log_Workflow/dms-dealer-report/dms-dealer-report.component').then(m => m.DMSDealerReportComponent) },
//   { path: 'DMS-approval', loadComponent: () => import('./DMS_Call_Log_Workflow/dms-approval/dms-approval.component').then(m => m.DmsApprovalComponent) },
//   { path: 'DMS-Menu', loadComponent: () => import('./DMS_Call_Log_Workflow/dms-menu/dms-menu.component').then(m => m.DmsMenuComponent) },
//   { path: 'Frame-check', loadComponent: () => import('./frame-check/frame-check.component').then(m => m.FrameCheckComponent) }
// ];
