import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
 
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Employee } from '../model/employee';
import { EmployeeRequest } from '../model/EmployeeRequest';
import { EmployeeService } from './employee.service';
import { Credit } from '../model/credit';
import { RegisteredUser } from '../model/registeredUser';

const cudOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class HttpClientEmployeeService extends EmployeeService {

  constructor(private http: HttpClient) {super();}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeesUrl + '/employees').pipe(
      catchError(this.handleError)
    );
  }
 
  // get by id - will 404 when id not found
  getEmployee(id: number): Observable<Employee> {
    const url = `${this.employeesUrl}/${id}`;
    return this.http.get<Employee>(url).pipe(
      catchError(this.handleError)
    );
  }
 
  addEmployee(name: string, location: string, email: string, mobile: string): Observable<Employee> {
    let emp : EmployeeRequest = new EmployeeRequest(name, location, email, mobile);
    return this.http.post<Employee>(this.employeesUrl + '/create', emp, cudOptions).pipe(
      catchError(this.handleError)
    );
  }

  deleteEmployee(id: number): Observable<Employee> {
    //const id = typeof e === 'number' ? e : e.empid;
    const url = `${this.employeesUrl}/delete/${id}`;
    return this.http.delete<Employee>(url, cudOptions).pipe(
      catchError(this.handleError)
    );
  }
 
  searchEmployee(term: string): Observable<Employee[]> {
    term = term.trim();
    const options = term ?
    { params: new HttpParams().set('name', term.toUpperCase())} : {};
    return this.http.get<Employee[]>(this.employeesUrl+'/search', options).pipe(
      catchError(this.handleError)
    );
  }
 
  updateEmployee(e: Employee): Observable<Employee> {
    const url = `${this.employeesUrl}/update/${e.id}`;
    return this.http.put<Employee>(url, e, cudOptions).pipe(
      catchError(this.handleError)
    );
  }

  checkEligibility(pan : string): Observable<Credit>{
    pan = pan.trim();console.log(pan);
    const options = pan ?
    { params: new HttpParams().set('pan', pan.toUpperCase())} : {};
    return this.http.get<Credit>(this.employeesUrl + '/check', options).pipe(
      catchError(this.handleError)
    );
  }
   
  private handleError(error: any) {
    console.error(error);
    return throwError(error);    
  }

}
