import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { catchError } from 'rxjs/operators';
import { Employee } from './model/employee';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) {
  }

  getData() {
    return this.http.get('https://taskmanager-25b59.firebaseio.com/title.json');
      //.map((response: Response) => response.json());
  }

  /*sendData(user: any) {
    const body = '{"empid": ' + user.empid + ', "location": '
                  + user.location  + ', "emil": '
                  + user.email  + ', "mobile": ' + user.mobile + ', "name": '
                  + user.name + '}';//JSON.stringify(user);
    
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    console.log(body);
    return this.http.post('https://angularpro-d45b6.firebasei.com/title.json', body, {
      headers: headers
    })
     // .map((data: HttpResponse<any>) => data.status)
      .catch(this.handleError);
  }*/

  sendData(employee: Employee) {
    //const body = { user.empid , user.location  ,  user.email  , user.mobile ,user.name };
    
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<Employee>('https://angularpro-d45b6.firebaseio.com/title.json', employee, {
      headers: headers
    }).pipe(catchError(this.handleError));
  }

  getOwnData() {
    return this.http.get('https://angularpro-d45b6.firebaseio.com/title.json');
     // .map((response: Response) => response.json());
  }

  private handleError (error: any) {
    console.log(error);
    return Observable.throw(error.json());
  }
}
