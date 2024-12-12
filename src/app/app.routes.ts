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