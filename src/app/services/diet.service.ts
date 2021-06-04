import { Injectable } from '@angular/core';
import { Employee } from '../model/employee';
import { Observable } from 'rxjs';
import { Credit } from '../model/credit';
import { RegisteredUser } from '../model/registeredUser';
import { Applicant } from '../model/applicant';

@Injectable({
  providedIn: 'root'
})
export abstract class DietService {
  dietUrl = 'http://localhost:9090/assignment/diet';
  
  abstract searchEmployee(term: string): Observable<Employee[]>;
  abstract register(regUser: RegisteredUser): Observable<RegisteredUser>;
  abstract getNewRegistrations(jwtToken: string): Observable<Applicant>;
  abstract approveOrReject(approvalVO: any, jwtToken: string): Observable<void>;
  //abstract getAllBatch(jwtToken: string): Observable<any>;
  abstract getBatch(batchId: number, jwtToken: string): Observable<any>;
  abstract getAllParentBatch(jwtToken: string): Observable<any>;
  abstract getGroup(parentBatchId: number, jwtToken: string): Observable<any>;
  abstract addBatch(name: string, parentBatchId: string, jwtToken: string): Observable<any>;
}
