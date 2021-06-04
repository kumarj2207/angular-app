import { TestBed } from '@angular/core/testing';

import { HttpClientEmployeeService } from './http-client-employee.service';

describe('HttpClientEmployeeService', () => {
  let service: HttpClientEmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpClientEmployeeService);
  });

//  it('should be created', () => {
//    expect(service).toBeTruthy();
//  });
});
