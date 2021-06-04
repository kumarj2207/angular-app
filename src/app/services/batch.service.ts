import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
 
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

const cudOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class BatchService {

  dietUrl = 'http://localhost:9090/assignment/diet';

  constructor(private http: HttpClient,
    private authService: AuthService) {}

  getAllBatch(): Observable<any> {
    const headersWithJwt = { headers: new HttpHeaders(
      { 'Content-Type': 'application/json',
        'Authorization': this.authService.getToken(),
        "Access-Control-Allow-Origin": "*",
"Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
"Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
      }
    )};
    const url = `${this.dietUrl}/getallbatch`;
    return this.http.get<any>(url, headersWithJwt).pipe(
      catchError(this.handleError)
      //map(data =>{ console.log("1  " +jwtToken);})
    );
  }

  getAllParentBatch(): Observable<any> {
    const headersWithJwt = { headers: new HttpHeaders(
      { 'Content-Type': 'application/json',
        'Authorization': this.authService.getToken(),
        "Access-Control-Allow-Origin": "*",
"Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
"Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
      }
    )};
    const url = `${this.dietUrl}/getallparentbatch`;
    return this.http.get<any>(url, headersWithJwt).pipe(
      catchError(this.handleError),
      //map(data =>{ console.log("2  " +jwtToken);})
    );
  }

  getGroup(parentBatchId: number): Observable<any> {
    const headersWithJwt = { headers: new HttpHeaders(
      { 'Content-Type': 'application/json',
        'Authorization': this.authService.getToken(),
        "Access-Control-Allow-Origin": "*",
"Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
"Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
      }
    )};
    const url = `${this.dietUrl}/getgroup/${parentBatchId}`;
    return this.http.get<any>(url, headersWithJwt).pipe(
      catchError(this.handleError)
      //map(data =>{ console.log("3  " +jwtToken);} )
    );
  }  

  getBatch(batchId: number): Observable<any> {
    const headersWithJwt = { headers: new HttpHeaders(
      { 'Content-Type': 'application/json',
        'Authorization': this.authService.getToken(),
        "Access-Control-Allow-Origin": "*",
"Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
"Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
      }
    )};
    const url = `${this.dietUrl}/getbatch/${batchId}`;
    return this.http.get<any>(url, headersWithJwt).pipe(
      catchError(this.handleError)
      //map(data =>{ console.log("4  " +jwtToken);})
    );
  }

  addBatch(name: string, parentBatchId: string): Observable<any> {
    const url = `${this.dietUrl}/addbatch`;
    return this.http.post<void>(url, null, 
                {
                  headers: new HttpHeaders(
                    { 'Content-Type': 'application/json',
                      'Authorization': this.authService.getToken(),
                      "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
                    }
                  ),
                  params: new HttpParams().set('name', name).set('parentBatchId', parentBatchId)
            }).pipe(catchError(this.handleError)
                    //  map(data =>{ console.log("5  " +jwtToken);} )
    );
  }

  getMotivatorsByBatchId(batchId: number): Observable<any> {
    return this.http.get(
      `${this.dietUrl}/motivators/${batchId}`, {
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
  
  addMotivatorInBatch(batchId: number, referralId: number) {
    return this.http.get(
      `${this.dietUrl}/batmotiv/${batchId}/${referralId}`, {
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
   
  removeMotivatorFromBatch(batchId: number, referralId: number) {
    return this.http.delete(
      `${this.dietUrl}/batmotivremove/${batchId}/${referralId}`, {
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

  assignBatchToMotivator(referralId: number, batchIds: number[]): Observable<void> {
    return this.http.post<void>(`${this.dietUrl}/assignbatchtomotivator`, 
                {referralId: referralId, batchIds: batchIds}, 
                {
                  headers: new HttpHeaders(
                    { 'Content-Type': 'application/json',
                      'Authorization': this.authService.getToken(),
                      "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
                    }
                  )
            }).pipe(catchError(this.handleError)
                    //  map(data =>{ console.log("5  " +jwtToken);} )
    );
  }



  private handleError(error: any) {
    console.error(error);
    return throwError(error);    
  }
  
}
