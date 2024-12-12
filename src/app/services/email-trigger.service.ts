import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailTriggerService {

  sendMailUrl = environment.apiUrlIndex + "send_mail";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  public sendMail(emailData: { [x: string]: string; }) {
    console.log("emailData : ", emailData);
    var data: { [key: string]: string } = {};
    data['To'] = emailData['To'];
    data['Cc'] = emailData['Cc'];
    data['Body'] = `<div>
    <h5 style="color: #1c6ead; text-align: center;">TVS Motor Company Limited</h5>
    <h4 style="color: #1c6ead;text-align: center;">Reconsideration of Warranty Rejected Parts</h4>
    <h6 style="color: #1c6ead;text-align: center;">Reminder for you consent on the documents listed below</h6>
    <table border="1" style="font-size: 12px; width: 100%;">
      <thead style="background-color: #80bbe8;">
        <tr>
          <th>Dealer Name</th>
          <th>Dealer Code</th>
          <th>Town</th>
          <th>Created On</th>
          <th>Order Number</th>
          <th>Material Number</th>
          <th>Material Description</th>
          <th>Frame Number</th>
          <th>Pending With</th>
          <th>Status</th>
          <th>Pending From</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>`+emailData['DealerCode']+`</td>
          <td>`+emailData['DealerName']+`</td>
          <td>`+emailData['Town']+`</td>
          <td>`+emailData['CreatedOn']+`</td>
          <td>`+emailData['OrdreNo']+`</td>
          <td>`+emailData['MaterialNo']+`</td>
          <td>`+emailData['MaterialDesc']+`</td>
          <td>`+emailData['FrameNo']+`</td>
          <td>`+emailData['PendingWith']+`</td>
          <td>`+emailData['Status']+`</td>
          <td>`+emailData['PendingFrom']+`</td>
        </tr>
      </tbody>
    </table>
  </div>
  `;
    return this.http.post(this.sendMailUrl, data, this.httpOptions );
  }
}
