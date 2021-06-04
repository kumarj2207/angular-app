import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
 
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChallengerService {

  #dietUrl = 'http://localhost:9090/assignment/diet';
  dietUrl = 'http://myolds.herokuapp.com/assignment/diet'
  constructor(private http: HttpClient,
    private authService: AuthService) {}



  upload(file: File): Observable<HttpEvent<any>> {
    //throw new Error('Method not implemented.');
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.dietUrl}/upload/`+this.authService.getReferralId(), formData, {
      headers: new HttpHeaders(
        { 
          'Authorization': this.authService.getToken(),
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
        }
      ),
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  download() {
    const url = `${this.dietUrl}/download`;
    //var body = {};
    return this.http.post(url, {}, { 
      headers: new HttpHeaders({ 
        "Content-Type": "application/json",
        "Authorization": this.authService.getToken(),
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
        }),
        responseType: 'blob'
    }).pipe(
      catchError(this.handleError)
    );
  }

  getMeasurement(): Observable<any>  {
    const url = `${this.dietUrl}/viewmeasurement/${this.authService.getReferralId()}`;
    
    return this.http.get<Observable<any>>(url, {
      headers: new HttpHeaders({ 
        "Content-Type": "application/json",
        "Authorization": this.authService.getToken(),
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
        })
    }).pipe(
      catchError(this.handleError)
    );
  }

  getChallengerMeasurement(referralId: number): Observable<any>  {
    const url = `${this.dietUrl}/viewmeasurement/${referralId}`;
    
    return this.http.get<Observable<any>>(url, {
      headers: new HttpHeaders({ 
        "Content-Type": "application/json",
        "Authorization": this.authService.getToken(),
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
        })
    }).pipe(
      catchError(this.handleError)
    );
  }

  addMeasurement(data: any): Observable<any> {
    const url = `${this.dietUrl}/postmeasurement/${this.authService.getReferralId()}`;
    return this.http.post(url, data, {
      headers: new HttpHeaders({ 
        "Content-Type": "application/json",
        "Authorization": this.authService.getToken(),
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
        })
    }).pipe(
      catchError(this.handleError)
    );
  }

  getChallengersByBatchId(batchId: number): Observable<any> {
    return this.http.get(
      `${this.dietUrl}/challengers/${batchId}`, {
      headers: new HttpHeaders({ 
        "Content-Type": "application/json",
        "Authorization": this.authService.getToken(),
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
        })
    }).pipe(
      catchError(this.handleError)
    );
  }

  getChallenger(referralId: number): Observable<any> {
    console.log(referralId);
    return this.http.get(
      `${this.dietUrl}/challenger/${referralId}`, {
      headers: new HttpHeaders({ 
        "Content-Type": "application/json",
        "Authorization": this.authService.getToken(),
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
        })
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error(error);
    return throwError(error);    
  }

}
