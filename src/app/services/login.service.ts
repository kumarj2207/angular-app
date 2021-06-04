import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
 
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../model/user';
import { Role } from '../model/role.enum';
import { ReturnedUser } from '../model/returnedUser';
import { AuthService } from './auth.service';

const cudOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  #loginUrl = 'http://localhost:9090/assignment';
  loginUrl = 'https://myolds.herokuapp.com/assignment';
  constructor(private http: HttpClient,
    private authService: AuthService) {}

  login(userName: string, password: string): Observable<ReturnedUser> {
    let data = { userName: userName, password: password };
    return this.http.post<ReturnedUser>(this.loginUrl + '/diet/login', data, cudOptions).pipe(
      catchError(this.handleError)
    );
  } 
  
  changePassword(body: string): Observable<any> {
    return this.http.put<any>(
      `${this.loginUrl}/diet/changepassword/${this.authService.getReferralId()}`, 
      body, {
        headers: new HttpHeaders({ 
          "Content-Type": "application/json",
          "Authorization": this.authService.getToken(),
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
          })
      }).pipe(catchError(this.handleError)
    );
  } 

  private handleError(error: any) {
    console.error(error);
    return throwError(error);    
  }
}
