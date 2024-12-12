import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TmServiceService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  fetchPendingListUrl = environment.apiUrlIndex + "pendingList";
  fetchPendingListCountUrl = environment.apiUrlIndex + "pendingListCount";
  pendingListSearchUrl = environment.apiUrlIndex + "pendingListSearch"
  fetchOrderDetailsIdUrl = environment.apiUrlIndex + "fetchOrderDetailsId"
  approveRequestUrl = environment.apiUrlIndex + "requestApproval"
  queryDropdownListUrl = environment.apiUrlIndex + "queryDropdownList"
  sendQueryUrl = environment.apiUrlIndex + "sendQuery"
  escalationDetailsUrl = environment.apiUrlIndex + "escalationDetails"
  fetchOrderDetailsReportsUrl = environment.apiUrlIndex + "fetchOrderDetailsReports";
  insertSuperApprovalUrl = environment.apiUrlIndex + "insertSuperApprovalDetails"
  superPendingListUrl = environment.apiUrlIndex + "superPendingList";
  superApproveRequestUrl = environment.apiUrlIndex + "superApproval"
  superSendQueryUrl = environment.apiUrlIndex + "superSendQuery"
  fetchSuperReportUrl = environment.apiUrlIndex + "fetchSuperReport"
  fetchSuperQueryDetailsUrl = environment.apiUrlIndex + "fetchSuperQueryDetails"
  superQueryReplyToUrl = environment.apiUrlIndex + "superQueryReplyTo"
  amListUrl = environment.apiUrlApp + "amList";
  fetchEmpDetailsUrl = environment.apiUrlApp +  "empDetails";
  nsmListUrl = environment.apiUrlApp + "nsmList";
  gmsListUrl = environment.apiUrlApp + "gmsList";

  fetchPendingList(pendingListData: any) {
    return this.http.post(this.fetchPendingListUrl, pendingListData, this.httpOptions);
  }

  fetchPendingListCount(pendingListCount: any) {
    return this.http.post(this.fetchPendingListCountUrl, pendingListCount, this.httpOptions);
  }


  fetchPendingListSearch() {
    return this.http.post(this.pendingListSearchUrl, '');
  }

  fetchOrderDetailsId(reqInput: any) {
    return this.http.post(this.fetchOrderDetailsIdUrl, reqInput, this.httpOptions);
  }

  fetchAmList(empno: any) {
    return this.http.post(this.amListUrl, {'empno': empno}, this.httpOptions);
  }

  fetchNsmList() {
    return this.http.get(this.nsmListUrl);
  }

  fetchGmsList() {
    return this.http.get(this.gmsListUrl);
  }

  approveRequest(approvalData: any) {
    return this.http.post(this.approveRequestUrl, approvalData, this.httpOptions);
  }

  queryDropdownList (filterData: any) {
    return this.http.post(this.queryDropdownListUrl, filterData, this.httpOptions);
  }

  sendQuery(sendQueryFilterData: any) {
    return this.http.post(this.sendQueryUrl, sendQueryFilterData, this.httpOptions);
  }

  escalationDetails(id: any) {
    return this.http.post(this.escalationDetailsUrl, { 'ID': id}, this.httpOptions);
  }

  fetchOrderDetailsReports(flag: any) {
    return this.http.post(this.fetchOrderDetailsReportsUrl, {'flag':flag }, this.httpOptions);
  }

  fetchEmpDetails(empno: any) {
    return this.http.post(this.fetchEmpDetailsUrl, {'empno':empno }, this.httpOptions);
  }

  insertSuperApprovalData(superApprovalInputFields: any) {
    return this.http.post(this.insertSuperApprovalUrl, superApprovalInputFields, this.httpOptions);
  }

  fetchSuperPendingList(fetchSuperPendingListData: any) {
    return this.http.post(this.superPendingListUrl, fetchSuperPendingListData, this.httpOptions);
  }

  superApproveRequest(superApprovalData: any) {
    return this.http.post(this.superApproveRequestUrl, superApprovalData, this.httpOptions);
  }

  superSendQuery(sendQueryFilterData: any) {
    return this.http.post(this.superSendQueryUrl, sendQueryFilterData, this.httpOptions);
  }

  fetchSuperReport(fetchSuperReportData: any) {
    return this.http.post(this.fetchSuperReportUrl, fetchSuperReportData, this.httpOptions);
  }

  fetchSuperQueryDetails(id: any) {
    return this.http.post(this.fetchSuperQueryDetailsUrl, { 'ID': id}, this.httpOptions);
  }

  superQueryReplyToList(id: any) {
    return this.http.post(this.superQueryReplyToUrl, { 'reqNo': id }, this.httpOptions);
  }
}
