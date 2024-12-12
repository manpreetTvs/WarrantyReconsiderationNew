import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestService } from './request.service';
import { tap, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar'
// import { error } from '@angular/compiler/src/util';

@Injectable({
    providedIn: 'root'
  })
  export class CommonService {
    constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      console.log('Started http');
      const started = Date.now();
      return next.handle(req).pipe(tap(event => {
        const elapsed = Date.now() - started;
        console.log(`Request for running ${elapsed} ms.`);
      }, error => {
        console.error('NICE ERROR', error)
      })
      )
    }
    
 
     error(msg: any) {
      this.snackBar.open(msg,'',{duration:4000});
    }
    
    saveFiles(reqData:any)
    {
 
     var formData: any = new FormData();
 
     console.log(reqData);
    
         for(let i=0; i < reqData.length; i++){
             formData.append("file", reqData[i], reqData[i]['name']);
         }
     
      const resData=RequestService.postReq('/Creation/SaveFiles');
      return this.httpClient.post(resData.url,formData);
    }
    getDealerWiseMapping(params: string)
    {
      const resData = RequestService.getReq('/Creation/GetMapping?' + params);
      return this.httpClient.get(resData.url, {
        headers: resData.headers
      });
    }
    saveSuperApprovalRequest(request: any)
    {
      const resData=RequestService.postReq('/Creation/SaveSuperOrderCreation');
      return this.httpClient.post(resData.url,request,{
        headers:resData.headers
      });
  
    }

    getOrderDetails(params: string)
    {
      const resData = RequestService.getReq('/Creation/GetOrderApproval?' + params);
      return this.httpClient.get(resData.url, {
        headers: resData.headers
      });
    }
    getSuperOrderDetails(params: string)
    {
      const resData = RequestService.getReq('/Creation/GetSuperApproval?' + params);
      return this.httpClient.get(resData.url, {
        headers: resData.headers
      });
    }
    
    getPendingOrderApproval(params: string)
    {
      const resData = RequestService.getReq('/Creation/getPendingOrderApproval?' + params);
      return this.httpClient.get(resData.url, {
        headers: resData.headers
      });
    }
  
    getPendingSuperApproval(params: string)
    {
      const resData = RequestService.getReq('/Creation/getPendingSuperApproval?' + params);
      return this.httpClient.get(resData.url, {
        headers: resData.headers
      });
    }
    
    getSuperDetailsById(params: string)
    {
      const resData = RequestService.getReq('/Creation/GetSuperDetailsById?' + params);
      return this.httpClient.get(resData.url, {
        headers: resData.headers
      });
    }
    getOrderDetailsById(params: string)
    {
      const resData = RequestService.getReq('/Creation/GetOrderDetailsById?' + params);
      return this.httpClient.get(resData.url, {
        headers: resData.headers
      });
    }

    getHOMapping(params: string)
    {
      const resData = RequestService.getReq('/Creation/GetHOMapping?' + params);
      return this.httpClient.get(resData.url, {
        headers: resData.headers
      });
    }
    getQueryToList(params: string)
    {
      const resData = RequestService.getReq('/Creation/getQueryTOList?' + params);
      return this.httpClient.get(resData.url, {
        headers: resData.headers
      });
    }
    getSuperQueryToList(params: string)
    {
      const resData = RequestService.getReq('/Creation/getSuperQueryTOList?' + params);
      return this.httpClient.get(resData.url, {
        headers: resData.headers
      });
    }
    saveOrderAppProcess(request: any)
    {
      const resData=RequestService.postReq('/Creation/SaveOrderApproval');
      return this.httpClient.post(resData.url,request,{
        headers:resData.headers
      });
  
    }
    saveSuperAppProcess(request: any)
    {
      const resData=RequestService.postReq('/Creation/SaveSuperApproval');
      return this.httpClient.post(resData.url,request,{
        headers:resData.headers
      });
  
    }
    saveQueryProcess(request: any)
    {
      const resData=RequestService.postReq('/Creation/SaveQueryProcess');
      return this.httpClient.post(resData.url,request,{
        headers:resData.headers
      });
  
    }
    saveSuperQueryProcess(request: any)
    {
      const resData=RequestService.postReq('/Creation/SaveSuperQueryProcess');
      return this.httpClient.post(resData.url,request,{
        headers:resData.headers
      });
  
    }
    getSAPOrderDetails(params: string)
    {
      const resData = RequestService.getReq('/Creation/getSAPOrderDetails?' + params);
      return this.httpClient.get(resData.url, {
        headers: resData.headers
      });
    }
    saveOrderProcess(request: any)
    {
      const resData=RequestService.postReq('/Creation/SaveOrderCreation');
      return this.httpClient.post(resData.url,request,{
        headers:resData.headers
      });
  
    }
    getEmployeeDetails(params: string)
    {
      const resData = RequestService.getReq('/Creation/GetEmpDetails?' + params);
      return this.httpClient.get(resData.url, {
        headers: resData.headers
      });
    }
    token(request: any,url: any) {
      const resData = RequestService.tokenReq(url);
     return this.httpClient.post(resData.url, request, { headers: resData.headers });
  }
  getValidDealer(params: string)
    {
      const resData = RequestService.getDeaReq('/Creation/checkValidDealer?' + params);
      return this.httpClient.get(resData.url, {
        headers: resData.headers
      });
    }
    getValidEmployee(params: string)
    {
      const resData = RequestService.getDeaReq('/Creation/CheckValidEmployee?' + params);
      return this.httpClient.get(resData.url, {
        headers: resData.headers
      });
    }
    getMappingList(params: string)
    {
      const resData = RequestService.getDeaReq('/DMSCallLog/getMappingList?' + params);
      return this.httpClient.get(resData.url, {
        headers: resData.headers
      });
    }
    getCallLogType()
    {
      const resData = RequestService.getDeaReq('/DMSCallLog/getCallLogType?' );
      return this.httpClient.get(resData.url, {
        headers: resData.headers
      });
    }
    getJobcardDetails(params: string)
    {
      const resData = RequestService.getDeaReq('/DMSCallLog/getJobcardDetail?' + params);
      return this.httpClient.get(resData.url, {
        headers: resData.headers
      });
    }
    saveDMSCallLog(request: any)
    {
      const resData=RequestService.postDeaReq('/DMSCallLog/SaveDMSCallLog');
      return this.httpClient.post(resData.url,request,{
        headers:resData.headers
      });
  
    }
    getCallLogDetails(params: string)
    {
      const resData = RequestService.getDeaReq('/DMSCallLog/getCallLogDetails?' + params);
      return this.httpClient.get(resData.url, {
        headers: resData.headers
      });
    }
    getsaleDateDetails(params: string)
    {
      const resData = RequestService.getDeaReq('/DMSCallLog/getsaleDateDetails?' + params);
      return this.httpClient.get(resData.url, {
        headers: resData.headers
      });
    }
    getKMDetails(params: string)
    {
      const resData = RequestService.getDeaReq('/DMSCallLog/getKMDetails?' + params);
      return this.httpClient.get(resData.url, {
        headers: resData.headers
      });
    }
    getCallApprovalDetails(params: string)
    {
      const resData = RequestService.getDeaReq('/DMSCallLog/getCallLogApproval?' + params);
      return this.httpClient.get(resData.url, {
        headers: resData.headers
      });
    }
    SaveDMSCallLogApproval(request: any)
    {
      const resData=RequestService.postDeaReq('/DMSCallLog/SaveDMSCallLogApproval');
      return this.httpClient.post(resData.url,request,{
        headers:resData.headers
      });
  
    }
    saleDateValidation(request: any)
    {
      const resData=RequestService.postDeaReq('/DMSCallLog/SaleDateValidation');
      return this.httpClient.post(resData.url,request,{
        headers:resData.headers
      });
  
    }
    KMValidation(request: any)
    {
      const resData=RequestService.postDeaReq('/DMSCallLog/KMValidation');
      return this.httpClient.post(resData.url,request,{
        headers:resData.headers
      });
  
    }

       /**
     * Get Serviec History List
     * @param {Object} params
     * return Object
     */
        getServiceHistory(params: any) {
          const resData = RequestService.getReq('/DMSCallLog/SearchVehicleHistory');
          return this.httpClient.get(resData.url, { params: params, headers: resData.headers });
      }
}