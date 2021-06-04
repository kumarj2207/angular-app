import { Injectable } from '@angular/core';
import { Employee } from '../model/employee';
import { Observable } from 'rxjs';
import { Credit } from '../model/credit';
import { RegisteredUser } from '../model/registeredUser';

@Injectable({
  providedIn: 'root'
})
export abstract class EmployeeService {
  employeesUrl = 'http://localhost:9090/assignment/employee';
  
  abstract getEmployees(): Observable<Employee[]>;
  abstract getEmployee(id: number): Observable<Employee>;
  abstract addEmployee(name: string, location: string, email: string, mobile: string): Observable<Employee>;
  abstract deleteEmployee(id: number): Observable<Employee>;
  abstract searchEmployee(term: string): Observable<Employee[]>;
  abstract updateEmployee(Employee: Employee): Observable<Employee>;
  abstract checkEligibility(pan : string): Observable<Credit>;
}
