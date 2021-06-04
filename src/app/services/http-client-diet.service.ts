import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
 
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Employee } from '../model/employee';
import { RegisteredUser } from '../model/registeredUser';
import { Applicant } from '../model/applicant';
import { AuthService } from './auth.service';

const cudOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class HttpClientDietService {

  #dietUrl = 'http://localhost:9090/assignment/diet';
  dietUrl = 'http://myolds.herokuapp.com/assignment/diet';
  constructor(private http: HttpClient,
    private authService: AuthService) {}

  register(regUser: RegisteredUser): Observable<RegisteredUser> {
        const url = `${this.dietUrl}/registration`;
        return this.http.post<RegisteredUser>(url, regUser, cudOptions).pipe(
          catchError(this.handleError)
        );
    }

  getNewRegistrations(): Observable<Applicant> {
    const headersWithJwt = { headers: new HttpHeaders(
      { 'Content-Type': 'application/json',
        'Authorization': this.authService.getToken(),
        "Access-Control-Allow-Origin": "*",
"Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
"Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
      }
    )};
    const url = `${this.dietUrl}/newregistrations`;
    return this.http.get<Applicant>(url, headersWithJwt).pipe(
      catchError(this.handleError)
    );
  }

  approveOrReject(approvalVO: any): Observable<void> {
    const headersWithJwt = { headers: new HttpHeaders(
      { 'Content-Type': 'application/json',
        'Authorization': this.authService.getToken(),
        "Access-Control-Allow-Origin": "*",
"Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
"Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
      }
    )};
    const url = `${this.dietUrl}/approval`;
    return this.http.post<void>(url, approvalVO ,headersWithJwt).pipe(
      catchError(this.handleError)
    );
  }

  getAllDietUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.dietUrl}/dietusers`,
      {
        headers:  new HttpHeaders(
          { 'Content-Type': 'application/json',
            'Authorization': this.authService.getToken(),
            "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
          }
        )
      }
    ).pipe(catchError(this.handleError));
  }

  getDietUserById(): Observable<any> {
    return this.http.get<any>(`${this.dietUrl}/dietuser/${this.authService.getReferralId()}`,
      {
        headers:  new HttpHeaders(
          { 'Content-Type': 'application/json',
            'Authorization': this.authService.getToken(),
            "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
          }
        )
      }
    ).pipe(catchError(this.handleError));
  }

  deleteDietUser(id: number): Observable<any> {
    return this.http.delete(`${this.dietUrl}/deletedietuser/${id}`,
    {
      headers:  new HttpHeaders(
        { 'Content-Type': 'application/json',
          'Authorization': this.authService.getToken(),
          "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
        }
      )
    }
    );
  }

  addMotivator(value: any): Observable<void> {
    return this.http.post<void>(
      `${this.dietUrl}/addmotivator`,
      value,
      { headers: new HttpHeaders(
        { 'Content-Type': 'application/json',
          'Authorization': this.authService.getToken(),
          "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
        }
      )}
    );
  }

  updateDietUser(body: any): Observable<void> {
    return this.http.put<void>(
      `${this.dietUrl}/updatedietuser/${this.authService.getReferralId()}`,
      body,
      { headers: new HttpHeaders(
        { 'Content-Type': 'application/json',
          'Authorization': this.authService.getToken(),
          "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
        }
      )}
    );
  }
   
  private handleError(error: any) {
    console.error(error);
    return throwError(error);    
  }
  // private handleError(error: HttpErrorResponse) {
  //   if (error.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong.
  //     console.error(
  //       `Backend returned code ${error.status}, ` +
  //       `body was: ${error.error}`);
  //   }
  //   // Return an observable with a user-facing error message.
  //   return throwError(
  //     'Something bad happened; please try again later.');
  // }
}
